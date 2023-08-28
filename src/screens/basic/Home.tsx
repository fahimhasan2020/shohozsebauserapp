import React, { Component } from 'react'
import { Text, StyleSheet, View,Pressable,StatusBar,Image,PermissionsAndroid,TextInput, Dimensions,ScrollView,Alert,Modal, } from 'react-native'
import {connect} from "react-redux"
import Head from '../../components/Head'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { typo } from '../../ui/typo'
import { shadows } from '../../ui/shadow'
import { colors } from '../../constants/colors'
import {marginBottomMedium, marginLeftSmall, marginTopMedium, marginTopSmall, paddingBottomMedium, paddingLeftMedium, paddingTopMedium} from "../../ui/spacing"
import Entypo from "react-native-vector-icons/Entypo"
import { row } from '../../ui/row'
import Geolocation from '@react-native-community/geolocation';
import Discounts from '../../components/Discounts'
import Geocoder from 'react-native-geocoding';
class Home extends Component {
  state = {
    position:null,
    locationName:'Loading',
    search:''
  }
  componentDidMount = async(): void => {
     await this.getCurrentPosition();
  }


  getCurrentPosition = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'This app needs location permission to get the nearest medical services.',
          buttonPositive: 'Accept',
          buttonNegative: 'Decline',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
       await Geolocation.getCurrentPosition(
          async(pos) => {
            this.setState({position:pos});
            console.log(pos);
            const { latitude, longitude } = pos.coords;
            
            Geocoder.init('AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg');
            Geocoder.from(latitude, longitude)
              .then((json) => {
                console.log(json);
                const addressComponent = json.results[0].address_components;
                const formattedAddress = json.results[0].formatted_address;
                this.props.changeLocation({latitude:latitude,longitude:longitude,locationName:formattedAddress});
                let locationDetails = {
                  formattedAddress,
                  neighborhood: '',
                  city: '',
                  postalCode: '',
                  country: '',
                };
  
                // Iterate over address components to find the desired information
                for (let i = 0; i < addressComponent.length; i++) {
                  const componentTypes = addressComponent[i].types;
  
                  if (componentTypes.includes('neighborhood')) {
                    locationDetails.neighborhood = addressComponent[i].long_name;
                  } else if (componentTypes.includes('locality')) {
                    locationDetails.city = addressComponent[i].long_name;
                  } else if (componentTypes.includes('postal_code')) {
                    locationDetails.postalCode = addressComponent[i].long_name;
                  } else if (componentTypes.includes('country')) {
                    locationDetails.country = addressComponent[i].long_name;
                  }
                }
  
                console.log('Location Details:', locationDetails);
                const shotAddress = locationDetails.formattedAddress.slice(0,40);
                this.setState({locationName:shotAddress});
              })
              .catch((error) => console.warn(error));
          },
          (error) => console.log(error),
          { enableHighAccuracy: true,timeout:30000  }
        );
      } else {
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <Head navigation={this.props.navigation} />

        <Pressable onPress={()=>{this.props.changeLoading(true);this.props.navigation.navigate('LocationSet')}} style={styles.location}>
          <Entypo name="location-pin" size={20} color={colors.theme} />
          <Text style={[typo.p,marginLeftSmall]}>{this.props.locationName}</Text>
        </Pressable>
        <View style={styles.searchContainer}>
          <TextInput onFocus={()=>{this.props.navigation.navigate('Search')}} value={this.state.search} onChangeText={(value)=>{this.setState({search:value})}} style={styles.searchInput} placeholder='Enter service code or doctor name' />
        </View>
        <Image source={require('../../assets/banner.png')} style={styles.banner} />
        <View style={row}>
          <Pressable onPress={()=>{
            this.props.changeLoading(true);
            this.props.navigation.navigate('DoctorCategories');
          }} style={[styles.card,shadows.smallShadow]}>
            <Image source={require('../../assets/doctor.jpg')} style={styles.cardImage} />
            <Text style={[typo.p,{width:80,alignItems:'center',textAlign:'center',alignSelf:'center',color:colors.theme},marginTopSmall]}>Instant video consultation</Text>
          </Pressable>
          <Pressable onPress={()=>{
            this.props.changeLoading(true);
            this.props.navigation.navigate('NearestDoctors');
          }} style={[styles.card,shadows.smallShadow]}>
            <Image source={require('../../assets/doctor2.jpg')} style={styles.cardImage} />
            <Text style={[typo.p,{width:80,alignItems:'center',textAlign:'center',alignSelf:'center',color:colors.theme},marginTopSmall]}>Find doctor near you</Text>
          </Pressable>
          
        </View>
        <View style={[{backgroundColor:colors.theme},paddingLeftMedium,paddingTopMedium,paddingBottomMedium,marginTopMedium,marginBottomMedium]}>
          <Discounts />
        </View>
      </ScrollView>
    )
  }
}

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
      locationName:state.auth.locationName
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  card:{
    height:200,
    width:130,
    backgroundColor:'white',
    borderRadius:5
  },
  cardImage:{
    width:130,
    height:130,
    borderTopLeftRadius:5,
    borderTopRightRadius:5
  },
  location:{
    paddingLeft:25,
    paddingTop:20,
    paddingBottom:10,
    flexDirection:'row'
  },
  searchContainer:{
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom:5
  },
  searchInput:{
    backgroundColor:colors.grey,
    marginLeft:5,
    marginRight:5,
    borderRadius:5,
    marginBottom:10,
    paddingLeft:10
  },
  banner:{
    width:Dimensions.get('window').width/1.15,
    height:Dimensions.get('window').height/8.5,
    borderRadius:5,
    marginBottom:20,
    marginLeft:25,
    marginRight:25,

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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
