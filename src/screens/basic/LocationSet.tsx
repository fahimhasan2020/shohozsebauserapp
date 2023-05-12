import React, { Component } from 'react'
import { View, Text,StyleSheet,TouchableHighlight,Linking } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SSLCommerzPayment  from "sslcommerz-lts"
const store_id = 'shoho645e0f532529a'
const store_passwd = 'shoho645e0f532529a@ssl'
const is_live = false
export class LocationSet extends Component {
  static propTypes = {
    prop: PropTypes
  }

  sslCommerzBegin = () =>{
    console.log('api-begin');
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'com.shohozseba.userapp://Home',
        fail_url: 'com.shohozseba.userapp://Home',
        cancel_url: 'com.shohozseba.userapp://Home',
        ipn_url: 'com.shohozseba.userapp://Home',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL
        Linking.openURL(GatewayPageURL)
        console.log('Redirecting to:', GatewayPageURL)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.sslCommerzBegin} style={styles.button}>
            <Text style={styles.buttonText}> Init Deep line </Text>
        </TouchableHighlight>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    button:{
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        backgroundColor:'green',
        elevation:10
    },
    buttonText:{
        color:'white'
    }
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch =>{
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSet);
