import React, { Component } from 'react'
import { Text, StyleSheet, View,Pressable,StatusBar,Image,PermissionsAndroid,TextInput, Dimensions,ScrollView } from 'react-native'
import {connect} from "react-redux"
import Head from '../../components/Head'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { typo } from '../../ui/typo'
import { shadows } from '../../ui/shadow'
import { colors } from '../../constants/colors'
import {marginBottomMedium, marginLeftSmall, marginTopMedium, marginTopSmall, paddingBottomMedium, paddingLeftMedium, paddingMedium, paddingSmall, paddingTopMedium} from "../../ui/spacing"
import Entypo from "react-native-vector-icons/Entypo"
import { row } from '../../ui/row'
import Geolocation from '@react-native-community/geolocation';
import { MAPBOX_API_ENDPOINT,MAPBOX_ACCESS_TOKEN } from '../../constants/urls'
import Discounts from '../../components/Discounts'
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
        Geolocation.getCurrentPosition(
          async(pos) => {
            this.setState({position:pos});
            console.log(pos);
  
            // Make a request to the Mapbox Geocoding API with the latitude and longitude
            const { latitude, longitude } = pos.coords;
            this.props.changeLocation({latitude:latitude,longitude:longitude});
            const url = `${MAPBOX_API_ENDPOINT}/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
            const response = await fetch(url);
            const data = await response.json();
  
            // Extract the location name and other details from the response data
            const { features } = data;
            if (features && features.length > 0) {
              const { place_name, text, place_type, context } = features[0];
              console.log('Location:', text);
              this.setState({locationName:text});
              console.log('Details:', { text, place_type, context });
            }
          },
          (error) => console.log(error),
          { enableHighAccuracy: true }
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

        {/* <Pressable onPress={()=>{this.props.logout(false)}}><Text>Hi</Text></Pressable> */}
        <Pressable onPress={()=>{this.props.navigation.navigate('LocationSet')}} style={styles.location}>
          <Entypo name="location-pin" size={20} color={colors.theme} />
          <Text style={[typo.p,marginLeftSmall]}>{this.state.locationName}</Text>
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
      host: state.auth.host
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

  }
})
