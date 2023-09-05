import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,TextInput,Pressable,Image,FlatList } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors';
import { typo } from '../../ui/typo';
import { paddingBig, paddingSmall } from '../../ui/spacing';
import { CardHalfWidthNp } from '../../components/Cards'
import { marginTopMedium } from '../../ui/spacing'
import AntDesign from "react-native-vector-icons/AntDesign"
import { row } from '../../ui/row'
import { connect } from 'react-redux';
class Medicine extends Component {
  state= {
    search:'',
    medicines:[]
  }
  onScreenFocus = () => {
    console.log('Screen focused');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(this.props.host+"get/random/medicine", requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log('drogba',result);
        await this.setState({medicines:result});
        console.log('dada',this.state.medicines.length);
      })
      .catch(error => console.log('error', error));
      
  }

  addToCard = () =>{

  }

  searchFunction = (value)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(this.props.host+"search/medicine/"+value, requestOptions)
      .then(response => response.json())
      .then(result => {console.log('grasp',result);
        if(result.length>0){
           this.setState({medicines:result})
        }
       })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={styles.searchContainer}>
          <TextInput value={this.state.search} onChangeText={(value)=>{this.setState({search:value});this.searchFunction(value)}} style={styles.searchInput} placeholder='Enter medicine name' />
        </View>
        <View style={{flex:1,marginTop:50,paddingLeft:10,paddingRight:10}}>
          <FlatList
            style={{width:'80%'}}
            numColumns={2}
            data={this.state.medicines}
            contentContainerStyle={{width:'100%',paddingRight:20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=>(<Pressable onPress={()=>{
              this.props.navigation.navigate('MedicineDetails',{medicineId:item.id})
            }} key={index} style={{width:100,height:140,backgroundColor:'white',borderRadius:5,elevation:3,marginLeft:30,marginBottom:10}}>
              <Image source={{uri:item.picture}} style={{width:100,borderTopLeftRadius:5,borderTopRightRadius:5,height:60,borderBottomWidth:1,borderColor:'#000000'}} />
              <Text style={{color:'#000',marginTop:30,alignSelf:'center'}}>{item.name}</Text>
            </Pressable>)}
          />
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', this.onScreenFocus);
  }

  componentWillUnmount() {
    this.unsubscribe();
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
      changeCart : (value) => {dispatch({type:'CHANGE_LOCATION',payload: value})},
  };
};

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      locationName:state.auth.locationName,
      propLat:state.auth.lat,
      propLng:state.auth.lng,
      cart:state.auth.cart,

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Medicine);


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width,
  },
  searchContainer:{
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom:5,
    marginTop:20
  },
  searchInput:{
    backgroundColor:colors.grey,
    marginLeft:5,
    marginRight:5,
    borderRadius:5,
    marginBottom:10,
    paddingLeft:10
  },
})
