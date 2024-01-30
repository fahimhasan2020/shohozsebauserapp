import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput, Dimensions,Pressable,ToastAndroid,ScrollView } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
import SSLCommerzPayment  from "sslcommerz-lts"
const store_id = 'shoho645e0f532529a'
const store_passwd = 'shoho645e0f532529a@ssl'
const is_live = false
class CheckOut extends Component {
  state = {
    userName:'',
    email:'',
    phone:'',
    address:'',
    total:'',
    vat:'',
    full_total:'',
  }
  checkoutNow = async() =>{
    if(this.state.userName === '' || this.state.email === '' || this.state.phone === '' || this.state.address === ''){
       return ToastAndroid.show('Please complete required fields',ToastAndroid.SHORT);
    }
    await this.setState({total:this.calculateTotalPrice(),vat:this.calculateVat(),full_total:this.calculateMainTotal()});
    await this.props.changeCheckout(this.state);
    const data = {
        total_amount: parseInt(this.state.full_total),
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: 'https://app.shohozseba.com/terms-condition.html',
        fail_url: 'https://app.shohozseba.com/register.html',
        cancel_url: 'https://app.shohozseba.com/register.html',
        ipn_url: 'https://app.shohozseba.com',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: this.state.userName,
        cus_email: this.state.email,
        cus_add1: this.state.address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: this.state.phone,
        cus_fax: '01711111111',
        ship_name: this.state.userName,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        this.props.navigation.navigate('PaymentScreen',{uri:GatewayPageURL});
        // Linking.openURL(GatewayPageURL)
        // console.log('Redirecting to:', GatewayPageURL);
    });
  }
  calculateTotalPrice = () => {
    return this.props.cart.reduce((total, item) => total + parseFloat(item.total_unit_price), 0).toFixed(2);
  };
  calculateVat = () => {
    const vat = this.props.cart.reduce((total, item) => total + parseFloat(item.total_unit_price), 0).toFixed(2);
    return vat/10;
  }
  calculateMainTotal = () => {
    const vat = this.props.cart.reduce((total, item) => total + parseFloat(item.total_unit_price), 0).toFixed(2);
    const count = vat/10;
    return Math.ceil(count+parseInt(vat)+50);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{paddingBottom:200}} style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <View style={styles.content}>
           <Text style={{fontSize:23,fontWeight:'bold',alignSelf:'center'}}>Enter your shipping details</Text>
           <TextInput placeholder='Enter your name' value={this.state.userName} onChangeText={(value)=>this.setState({userName:value})} style={styles.generelInput} />
           <TextInput placeholder='Enter Email' value={this.state.email} onChangeText={(value)=>this.setState({email:value})} style={styles.generelInput} />
           <TextInput placeholder='Enter phone number' value={this.state.phone} onChangeText={(value)=>this.setState({phone:value})} style={styles.generelInput} />
           <View style={{margin:10,alignSelf:'center',padding:15,backgroundColor:'#fff',elevation:10,width:'80%',borderRadius:10,marginTop:30}}>
            <View style={{width:'100%',flexDirection:'row',marginBottom:10,justifyContent:'space-between'}}>
                <Text style={{color:'#000'}}>Total:</Text>
                <Text style={{color:'#000'}}>{this.calculateTotalPrice()} BDT</Text>
            </View>
            <View style={{width:'100%',flexDirection:'row',marginBottom:10,justifyContent:'space-between'}}>
                <Text style={{color:'#000'}}>Vat (10%):</Text>
                <Text style={{color:'#000'}}>{this.calculateVat()} BDT</Text>
            </View>
            <View style={{width:'100%',flexDirection:'row',marginBottom:10,justifyContent:'space-between'}}>
                <Text style={{color:'#000'}}>Delivery charge:</Text>
                <Text style={{color:'#000'}}>50 BDT</Text>
            </View>
            <View style={{width:'100%',flexDirection:'row',marginBottom:10,justifyContent:'space-between'}}>
                <Text style={{color:'#000'}}>Full Total (vat incld):</Text>
                <Text style={{color:'#000'}}>{this.calculateMainTotal()} BDT</Text>
            </View>
            
           </View>
           <TextInput placeholder='Enter Address' multiline={true} value={this.state.address} onChangeText={(value)=>this.setState({address:value})} style={[styles.generelInput,{borderWidth:1,height:150,flexWrap:'wrap'}]} textAlignVertical='top' />
           <Image source={require('../../assets/payment.png')} style={{width:Dimensions.get('window').width -150,height:180,marginTop:10}} />
           <Pressable onPress={()=>this.checkoutNow()} style={{marginTop:20,backgroundColor:colors.theme,padding:10,alignItems:'center',justifyContent:'center',borderRadius:10,elevation:10}}><Text style={{color:'#fff'}}>Checkout Now</Text></Pressable>
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
        changeCart : (value) => {dispatch({type:'UPDATECART',payload: value})},
        changeCheckout : (value) => {dispatch({type:'CHECKOUTDETAILS',payload: value})},
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    generelInput:{
        width:Dimensions.get('window').width - 50, padding:7,alignSelf:'center',borderBottomWidth:1,borderColor:'#ccc',
        marginTop:15
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
        padding:20,
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