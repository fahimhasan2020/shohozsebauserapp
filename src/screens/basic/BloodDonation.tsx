import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors'

export default class BloodDonation extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
           <Text style={{fontSize:14,fontWeight:'bold',color:colors.grey,textTransform:'uppercase'}}> Service unavailable </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width,
  }
})
