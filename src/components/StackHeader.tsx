import React, { Component } from 'react'
import { Text, View,StyleSheet,StatusBar,Pressable } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../constants/colors'
export default class StackHeader extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Pressable onPress={()=>navigation.goBack()} style={{backgroundColor:colors.theme,width:60,alignItems:'center',justifyContent:'center',height:40,borderTopRightRadius:15,borderBottomRightRadius:15,elevation:10}}>
            <AntDesign name="arrowleft" size={30} color={'#ccc'} />
        </Pressable>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        marginTop:StatusBar.currentHeight
    }
})
