import React, { Component } from 'react'

import { View, Text,StyleSheet,TextInput,Animated,ActivityIndicator,FlatList,Pressable,Modal } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import { connect } from 'react-redux'
import StackHeaderFixed from '../../components/StackHeaderFixed';
import Entypo from "react-native-vector-icons/Entypo"

import { sizes } from '../../constants/sizes';
import { mapdesign } from '../../ui/mapdesign';
export class LocationSet extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  state = {
    locationName:'',
    barHeight:new Animated.Value(-200),
    suggestions:[],
    placeName:false
  }

  handleSettingNewLocation = (data:any) =>{
    console.log('First time pressed');
        Animated.timing(
      this.state.barHeight,
    {
      toValue: -300,
      duration: 500,
      useNativeDriver: false
    }
  ).start();
  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.place_id}&key=AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'OK') {
        const result = data.result;
        const suggestion = {
          name: result.name,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        };
       console.log(suggestion);
       this.props.changeLocation({latitude:suggestion.latitude,longitude:suggestion.longitude,locationName:suggestion.name});
       setTimeout(()=>{
        this.setState({placeName:true});
       },2000);
      } else {
        throw new Error('Unable to fetch location details.');
      }
    });
  }

  fetchLocationSuggestions = (input) => {
    if (input.length >= 4) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'OK') {
            const suggestions = data.predictions.map((prediction) => prediction);
            this.setState({ suggestions });
            console.log(suggestions);
          } else {
            throw new Error('Unable to fetch location suggestions.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.setState({ suggestions: [] }); // Clear suggestions if input length is less than 4
    }
  };
  handleInputChange = (value) => {
    this.setState({ locationName: value });
    this.fetchLocationSuggestions(value);
  };
  componentDidMount(): void {
    setTimeout(()=>{
        this.props.changeLoading(false);
    },500);
    Animated.timing(
      this.state.barHeight,
    {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }
  ).start()
  }

  render() {
    const { barHeight } = this.state;

    // Apply the animated style to your component
    const animatedStyle = {
      bottom: barHeight,
    };
    return (
      <View style={styles.container}>
        <StackHeaderFixed navigation={this.props.navigation} />
        <MapView
          style={{height:sizes.windowHeight+40,width:sizes.windowWidth}}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapdesign}
>
<Marker coordinate={{  latitude: this.props.lat,
            longitude: this.props.lng, }}
            title="Home Address"
            />
</MapView>
<Animated.View style={[styles.bottomBar,animatedStyle]} >
<TextInput  ref={this.textInputRef} value={this.state.locationName} style={styles.locationInput}  onChangeText={this.handleInputChange} placeholder='Enter location name' />
{this.state.suggestions.length>0?<FlatList showsVerticalScrollIndicator={false} data={this.state.suggestions} renderItem={({item,index})=><Pressable onPress={()=>this.handleSettingNewLocation(item)} >
  <View style={styles.addressBox}>
    <Entypo style={{color:'orange'}} name="location" size={20} />
<Text style={styles.textStrings}>{item.description.slice(0,30)}</Text>
  </View>
</Pressable>}  keyExtractor={(item, index) => index.toString()} />:<View style={{marginTop:20,alignItems:'center'}}><ActivityIndicator size={'large'} color={'blueviolet'} /></View>}

</Animated.View>
<Modal
          animationType="slide"
          transparent={true}
          visible={this.state.placeName}
          onRequestClose={() => {
            this.setState({placeName: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Save location</Text>
              <View style={{flexDirection:'row',padding:10}}>
                <Pressable
                onPressIn={()=>{ this.setState({placeName:false});this.props.navigation.goBack()}}
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({placeName:false})}>
                <Entypo name="home" style={styles.textStyle} size={30} />
                <Text style={styles.textStyle}>Home</Text>
              </Pressable>
              <Pressable
                onPressIn={()=>{ this.setState({placeName:false});this.props.navigation.goBack()}}
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({placeName:false})}>
                <Entypo name="network" style={styles.textStyle} size={30} />
                <Text style={styles.textStyle}>Work</Text>
              </Pressable>
              </View>
              
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    textStrings:{
      color:'#000',
      marginLeft:20,
    },
    addressBox:{
      flexDirection:'row',
      padding:10,
      width:'100%',
      overflow:'hidden',
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:'#ccc'
    },
    bottomBar:{
      position:'absolute',
      left:0,
      height:300,
      backgroundColor:'#fff',
      elevation:10,
      zIndex:10,
      width:'100%',
      padding:10,
      borderTopLeftRadius:30,
      borderTopRightRadius:30
    },
    locationInput:{
      width:'95%',
      alignSelf:'center',
      margin:10,
      borderWidth:0.5,
      borderColor:'#ccc',
      paddingLeft:10,
      borderRadius:10
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      height:60,
      width:60,
      alignItems:'center',
      justifyContent:'center',
      elevation: 2,
      margin:10
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
})

const mapDispatchToProps = dispatch => {
  return{
      changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
      changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
      logout : (value) => {dispatch({type:'LOGOUT',logged: value})},
      changeProfile : (value) => {dispatch({type:'PROFILE_CHANGE',user: value})},
      changeActivity : (value) => {dispatch({type:'CHANGE_ACTIVITY',stata: value})},
      changeLoading : (value) => {dispatch({type:'LOADING',loading: value})},
      changeLocation : (value) => {dispatch({type:'CHANGE_LOCATION',logged: value})},
  };
};

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      lat:state.auth.lat,
      lng:state.auth.lng,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSet);
