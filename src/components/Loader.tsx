import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Animated,Easing } from 'react-native'

export default class Loader extends Component {
  state = {
    spinValue:new Animated.Value(0),
  }
  componentDidMount(): void {
    Animated.loop(
        Animated.timing(
          this.state.spinValue,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear, 
            useNativeDriver: true
          }
        )
      ).start();
  }
  spin = this.state.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image source={require('../assets/logo.png')} style={{width:120,height:120,transform:[{rotateY: this.spin}]}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:300,
        left:Dimensions.get('window').width/4,
        zIndex:100,
        borderRadius:15,
        backgroundColor:'white',
        width:150,
        height:150,
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    }
})
