import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, Pressable,FlatList } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
class Cart extends Component {
 // Function to increase quantity for an item
increaseQuantity = (index) => {
  
  const updatedCart = [...this.props.cart];
  const item = updatedCart[index];
  console.log('called',item);
  if (item && item.total_unit_price) {
    updatedCart[index].quantity += 1;
    const ultimate = updatedCart[index].quantity*parseInt(updatedCart[index].unit_price);
    updatedCart[index].total_unit_price = ultimate.toString();
    this.props.changeCart(updatedCart);
  }
};

// Function to decrease quantity for an item
decreaseQuantity = (index) => {
  const updatedCart = [...this.props.cart];
  if (updatedCart[index].quantity > 1) {
    const item = updatedCart[index];

    if (item && item.total_unit_price) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].total_unit_price = updatedCart[index].quantity*parseInt(updatedCart[index].unit_price);
      this.props.changeCart(updatedCart);
    }
  }
};

  
  calculateTotalPrice = () => {
    return this.props.cart.reduce((total, item) => total + parseFloat(item.total_unit_price), 0).toFixed(2);
  };

  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <View style={styles.content}>
          <FlatList
          data={this.props.cart}
          renderItem={({item,index})=>(<View style={{alignSelf:'center',backgroundColor:'white',elevation:10,margin:10,padding:5,width:'90%',height:80,borderRadius:10,flexDirection:'row',justifyContent:'space-between'}}>
            <Image source={{uri:item.thumb}} style={{height:50,width:50,marginTop:10}} />
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:20,color:"black",fontWeight:'bold'}}>{item.medicine_name}</Text>
              <Text style={{fontSize:10,fontWeight:'bold',opacity:0.5}}>{item.total_unit_price} BDT</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Pressable onPress={() => this.increaseQuantity(index)} style={{padding:5,backgroundColor:'grey',elevation:3,alignItems:'center',justifyContent:'center',margin:5,height:30,width:30,borderRadius:15}}><Text style={{fontSize:14,color:'white'}}>+</Text></Pressable>
              <Text style={{fontSize:20,fontWeight:'bold',opacity:0.5}}>{item.quantity}</Text>
              <Pressable onPress={() => this.decreaseQuantity(index)} style={{padding:5,backgroundColor:'grey',elevation:3,alignItems:'center',justifyContent:'center',margin:5,height:30,width:30,borderRadius:15}}><Text style={{fontSize:14,color:'white'}}>-</Text></Pressable>
            </View>
           </View>)}
          />
           <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',alignSelf:'center',padding:10,backgroundColor:'white',position:'absolute',bottom:50,height:60,elevation:10,borderRadius:10,alignItems:'center'}}>
            <Text style={{color:'black'}}>Total {this.calculateTotalPrice()} BDT</Text>
            <Pressable style={{padding:10,backgroundColor:colors.theme,width:80,borderRadius:10}}>
            <Text style={{color:'white'}}>Ceckout</Text>
           </Pressable>
           </View>
           
        </View>
        
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

export default connect(mapStateToProps,mapDispatchToProps)(Cart);

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
        padding:10,
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