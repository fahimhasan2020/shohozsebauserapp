import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
class PaymentScreen extends Component {
  componentDidMount(): void {
      this.props.changeLoading(true);
  }
  handleWebViewNavigationStateChange  = async(event) =>{
    const cartJson = JSON.stringify(this.props.cart);
    console.log('message found',event,'old datas',this.props.checkoutDetails,'And cart value',cartJson);
    if(event.url === 'https://app.shohozseba.com/terms-condition.html'){
      const userId = await AsyncStorage.getItem("id");
      const formData = new FormData();
      
      formData.append("user_name", this.props.checkoutDetails.userName);
      formData.append("email", this.props.checkoutDetails.email);
      formData.append("phone", this.props.checkoutDetails.phone);
      formData.append("address", this.props.checkoutDetails.address);
      formData.append("user_id", userId);
      formData.append("total", this.props.checkoutDetails.total);
      formData.append("vat", this.props.checkoutDetails.vat);
      formData.append("full_total", this.props.checkoutDetails.full_total);
      formData.append("cart", JSON.stringify(this.props.cart)); // Convert cart to JSON string
      
      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      
      fetch(this.props.host + "create/medicine/order", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.props.navigation.navigate('SuccessPayment');
        })
        .catch(error => console.log('error', error.slice(0,100)));
      
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView  onNavigationStateChange={this.handleWebViewNavigationStateChange} onLoad={()=>this.props.changeLoading(false)} source={{ uri: this.props.route.params.uri }} style={{ flex: 1 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    }
})

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      locationName:state.auth.locationName,
      propLat:state.auth.lat,
      propLng:state.auth.lng,
      cart:state.auth.cart,
      checkoutDetails:state.auth.checkoutDetails,

  }
};

const mapDispatchToProps = dispatch =>{
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
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
