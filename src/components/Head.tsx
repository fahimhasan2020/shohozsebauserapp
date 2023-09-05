import React, { Component } from 'react'
import { Text, StyleSheet, View,Pressable,Image } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import { colors } from '../constants/colors'
import { shadows } from '../ui/shadow'
import { connect } from 'react-redux'
class Head extends Component {
  render() {
    const {navigation,cart} = this.props;
    return (
      <View style={[styles.container,shadows.largeShadow]}>
        <Pressable onPress={()=>{navigation.openDrawer()}}><Feather name='menu' size={30} color={colors.themeDeep} /></Pressable>
        <Image source={require('../assets/croppedlogo.png')} style={styles.centralLogo} />
        <Pressable onPress={()=>navigation.navigate('Cart')}>
          
          <Feather name='shopping-cart' size={30} color={colors.themeDeep} />
          {cart.length>0?<View style={{padding:5,backgroundColor:'red',elevation:3,position:'absolute',top:0,left:0,borderRadius:10}}><Text style={{color:'white',fontSize:6}}>{cart.length}</Text></View>:null}
          
        </Pressable>
      </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(Head);

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        paddingLeft:20,
        paddingRight:30
    },
    centralLogo:{
        height:40,
        width:40
    }
})
