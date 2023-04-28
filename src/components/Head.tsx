import React, { Component } from 'react'
import { Text, StyleSheet, View,Pressable,Image } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import { colors } from '../constants/colors'
import { shadows } from '../ui/shadow'
export default class Head extends Component {
  render() {
    return (
      <View style={[styles.container,shadows.largeShadow]}>
        <Pressable><Feather name='menu' size={30} color={colors.themeDeep} /></Pressable>
        <Image source={require('../assets/croppedlogo.png')} style={styles.centralLogo} />
        <Pressable><Feather name='shopping-cart' size={30} color={colors.themeDeep} /></Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
    },
    centralLogo:{
        height:40,
        width:40
    }
})
