import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, ScrollView,Pressable,Share,ToastAndroid } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
import Entypo from "react-native-vector-icons/Entypo"
class MedicineDetails extends Component {
  state = {
    medicineData:null
  }
  componentDidMount =()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(this.props.host+"medicine/"+this.props.route.params.medicineId, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
        if(!result.hasOwnProperty('sorry')){
          this.setState({medicineData:result});
        }
      })
      .catch(error => console.log('error', error));
  }
  addToCart = async() =>{
    const itemToAdd = {
      "medicine_id": this.state.medicineData.id,
      "medicine_name": this.state.medicineData.name,
      "total_unit": this.state.medicineData.unit_value,
      "quantity": 1,
      "total_unit_price":this.state.medicineData.unit_price,
      "thumb": this.state.medicineData.picture
    };
    const { cart } = this.props;
    const isItemAlreadyAdded = cart.some((cartItem) => cartItem.medicine_id === itemToAdd.medicine_id);
    if (!isItemAlreadyAdded) {
      const updatedCart = [...cart, itemToAdd];
      await this.props.changeCart(updatedCart);
      console.log(this.props.cart);
      ToastAndroid.show("Item added to cart", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Item already added to cart", ToastAndroid.SHORT);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        {this.state.medicineData? <View style={styles.content}>
            <Image source={{uri:this.state.medicineData.picture}} style={{width:'100%',height:300}} />
            <View style={{width:300,backgroundColor:'white',padding:10,height:70,elevation:10,alignSelf:'center',borderRadius:15,justifyContent:'space-between',flexDirection:'row'}}>
              <Pressable onPress={()=>{this.addToCart()}} style={{padding:10,backgroundColor:'blueviolet',borderRadius:30,width:50,height:50,alignItems:'center',justifyContent:'center'}}>
                <Entypo name="shopping-cart" size={20} color={'white'} />
              </Pressable>
              <Pressable onPress={()=>{
                Share.share({
                  message: 'Find this mediciin available here: https://admin.shohozseba.com/user/get/medicine/details/share/'+this.state.medicineData.id,
                });
              }} style={{padding:10,backgroundColor:'blueviolet',borderRadius:30,width:50,height:50,alignItems:'center',justifyContent:'center'}}>
                <Entypo name="share" size={20} color={'white'} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{marginTop:20,alignItems:'center',width:'100%',paddingBottom:100}}>
              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold'}}>{this.state.medicineData.name}</Text>
              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold'}}>Price: {this.state.medicineData.unit_price} BDT per unit</Text>
              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold'}}>Stock: {this.state.medicineData.stock}</Text>
              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold'}}>Minimum unit: 1</Text>
              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold'}}>Piece per unit: {this.state.medicineData.unit_value}</Text>

              <Text style={{marginTop:10,color:'#000',fontSize:15,fontWeight:'bold',opacity:0.5,width:300,alignItems:'center'}}>{this.state.medicineData.description}</Text>

            </ScrollView>
        </View>:null}
       
      </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(MedicineDetails);

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