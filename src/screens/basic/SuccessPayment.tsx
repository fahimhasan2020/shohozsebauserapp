import React, { Component } from 'react'
import { View, Text,Pressable } from 'react-native'
import { connect } from 'react-redux'
import Entypo from "react-native-vector-icons/Entypo"
import { colors } from '../../constants/colors'
export class SuccessPayment extends Component {
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
        <Entypo name={'shopping-cart'} size={60} color={'gree'} style={{marginBottom:20}} />
        <Text style={{fontSize:24,fontWeight:'bold',color:'#000',marginBottom:15}}>Thank You</Text>
        <Text style={{fontSize:14,fontWeight:'bold',color:'#000',opacity:0.5}}>Payment Completed. Your order is processing</Text>
        <Pressable onPress={()=>{
            this.props.navigation.navigate('HomeTab');
        }} style={{backgroundColor:colors.themeDeep,padding:10,elevation:10,margin:10,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
            <Text style={{fontSize:15,color:'white'}}>Home</Text>
        </Pressable>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPayment)
