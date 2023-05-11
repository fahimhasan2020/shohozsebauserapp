import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'

export default class NoItemAvailable extends Component {
  render() {
    const {title} = this.props.route.params;
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
            <Image source={require('../../assets/notavailable.jpg')} style={styles.iconSize} />
            <Text style={styles.textStyle}> No item available </Text>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
        textTransform:'uppercase'
    },
    iconSize:{
        height:150,
        width:150,
        margin:20,
        opacity:0.6
    },
    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase',
        color:colors.theme,
        opacity:0.2
    }
})
