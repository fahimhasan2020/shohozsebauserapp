import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView } from 'react-native'
import { typo } from '../ui/typo'
import { marginBottomBig, marginBottomMedium, marginBottomSmall } from '../ui/spacing'
const discounts = [
    {id:1,title:'Get 30% discounts on all medicines',details:'use promo code Bijoy52'},
    {id:2,title:'Get 10% discounts on all appointment',details:'use promo code Dhaka10'},
    {id:3,title:'Get 0% discounts on ambulance service',details:'use promo code Dhaka52'},
];
export default class Discounts extends Component {
  render() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {discounts.map((item,index)=>(<View key={item.id} style={styles.container}>
             <Text style={[typo.h4,marginBottomMedium,{textAlign:'center'}]}>{item.title}</Text>
             <Text style={[typo.p,{width:130,alignSelf:'center',textAlign:'center'}]}>{item.details}</Text>
        </View>))}
        
       
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        padding:10,
        paddingTop:15,
        width:180,
        height:120,
        borderRadius:5,
        elevation:5,
        marginBottom:5,
        marginRight:10
    }
})
