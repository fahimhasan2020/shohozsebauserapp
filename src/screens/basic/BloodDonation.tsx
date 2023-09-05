import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions,Image,Pressable,FlatList,Linking } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors'
import { shadows } from '../../ui/shadow'
import { typo } from '../../ui/typo'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { sizes } from '../../constants/sizes'
import Lottie from "lottie-react-native";
class BloodDonation extends Component {
  state = {
    requests:[],
    myRequests:[]
  }
  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', this.initialize);
  }
  componentWillUnmount = () => {
    this.unsubscribe();
  }
  initialize = async()=>{
    const userId = await AsyncStorage.getItem('id');
    console.log('mine',userId)
    var requestOptions = {
      method: 'POST',
      headers: {"Content-Type":"application/json","Accept":"application/json"},
      body: JSON.stringify({
        'lat':this.props.propLat,
        'lng':this.props.propLng,
      }),
      redirect: 'follow'
    };
    var requestOptiona = {
      method: 'GET',
      headers: {"Content-Type":"application/json","Accept":"application/json"},
      redirect: 'follow'
    };
    console.log(this.props.propLat,this.props.propLng)
    fetch(this.props.host+"nearer/blood/request", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result.bloodRequest);this.setState({requests:result.bloodRequest});})
      .catch(error => {console.log('error', error);});
      
    fetch(this.props.host+"get/blood/request/"+userId, requestOptiona)
        .then(responsa => responsa.json())
        .then(resulta => {console.log('my results',resulta);this.setState({myRequests:resulta});})
        .catch(error => console.log('error', error));
  }
  deleteRequest = (id)=>{
    this.props.changeLoading(true);
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };
    fetch(this.props.host+"update/blood/request/"+id,requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);this.initialize();this.props.changeLoading(false);})
      .catch(error => console.log('error', error));
  }
  render(){
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={{flex:1,backgroundColor:'white'}}>
          <Pressable onPress={()=>this.props.navigation.navigate('CreateBloodRequest')} style={{marginLeft:20,marginBottom:20,marginTop:30,width:250,alignItems:'center',borderRadius:20,elevation:3}}>
            <Image source={require('../../assets/blooddonatebg.jpg')} style={{height:120,width:250,borderRadius:20}} />
            <View style={{height:120,width:250,position:'absolute',top:0,left:0,backgroundColor:'rgba(0,0,0,0.3)',borderRadius:20}}></View>
            <Text style={{color:'white',position:'absolute',top:40,left:50,fontSize:20}}>Request for blood</Text>
          </Pressable>
          <Text style={[typo.p,{marginLeft:20,marginBottom:20,marginTop:30}]}>Blood request near you</Text>
          {this.state.requests.length>0?<FlatList
          horizontal={true}
          data={this.state.requests}
          style={{width:sizes.fullWidth,height:300}}
          contentContainerStyle={{paddingBottom:180,paddingRight:50}}
          keyExtractor={(item,index)=>index}
          renderItem={({item,index})=>(<View style={{paddingLeft:20,marginBottom:15}}>
            <View style={[{width:230,height:280,backgroundColor:'#fff',borderRadius:15},shadows.smallShadow]}>
            <Image source={require('../../assets/demomap.png')} style={{width:'100%',alignSelf:'center',height:140,borderTopLeftRadius:15,borderTopRightRadius:15}} />
            <View style={{position:'absolute',top:0,left:0,width:'100%',height:140,zIndex:2,backgroundColor:'rgba(186, 71, 169,0.5)',borderTopLeftRadius:15,borderTopRightRadius:15}}></View>
            <Pressable style={{position:'absolute',right:17,top:110,padding:20,backgroundColor:colors.theme,elevation:10,borderRadius:30,zIndex:3}}>
              <Text style={{color:'white'}}>{item.group}</Text>
            </Pressable>
            <View style={{padding:10}}>
              <Text style={{fontSize:10,width:150,fontWeight:'bold',textTransform:'uppercase'}}>{item.location_details}</Text>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="clockcircleo" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>{item.donation_time}</Text>
              </View>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="file1" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>{item.details.slice(0,20)}</Text>
              </View>
              <View style={{flexDirection:'row',position:'absolute',bottom:10,right:10}}>
                <Pressable onPress={()=>{
                  Linking.openURL(`tel:${item.phone}`);
                }}>
                  <FontAwesome name="phone-square" size={30} style={{color:colors.theme,marginRight:10}} />
                </Pressable>
                <Pressable onPress={()=>{
                  this.props.navigation.navigate('BloodDonationDetails',{donationId:item.id});
                }}>
                  <AntDesign name="rightcircleo" size={30} style={{color:colors.theme}} />
                </Pressable>
              </View>
            </View>
            </View>
          </View>)}
          />:<Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:200,zIndex:10,margin:10}} autoPlay loop />}
          <Text style={[typo.p,{marginLeft:20,marginBottom:20,marginTop:30}]}>My Blood Requests</Text>
          {this.state.myRequests.length>0?<FlatList
          horizontal={true}
          data={this.state.myRequests}
          style={{width:sizes.fullWidth}}
          contentContainerStyle={{paddingBottom:180,paddingRight:50}}
          keyExtractor={(item,index)=>index}
          renderItem={({item,index})=>(<View style={{paddingLeft:20,marginBottom:15}}>
            <View style={[{width:230,height:280,backgroundColor:'#fff',borderRadius:15},shadows.smallShadow]}>
            <Image source={require('../../assets/demomap.png')} style={{width:'100%',alignSelf:'center',height:140,borderTopLeftRadius:15,borderTopRightRadius:15}} />
            <View style={{position:'absolute',top:0,left:0,width:'100%',height:140,zIndex:2,backgroundColor:'rgba(186, 71, 169,0.5)',borderTopLeftRadius:15,borderTopRightRadius:15}}></View>
            <Pressable style={{position:'absolute',right:17,top:110,padding:20,backgroundColor:colors.theme,elevation:10,borderRadius:30,zIndex:3}}>
              <Text style={{color:'white'}}>{item.group}</Text>
            </Pressable>
            <View style={{padding:10}}>
              <Text style={{fontSize:10,width:150,fontWeight:'bold',textTransform:'uppercase'}}>{item.location_details}</Text>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="clockcircleo" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>{item.donation_time}</Text>
              </View>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="file1" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>{item.details.slice(0,20)}</Text>
              </View>
              <View style={{flexDirection:'row',position:'absolute',bottom:10,right:10}}>
                <Pressable onPress={()=>{
                  this.deleteRequest(item.id);
                }}>
                  <Entypo name="trash" size={30} style={{color:colors.red,marginRight:10}} />
                </Pressable>
                <Pressable onPress={()=>{
                  Linking.openURL(`tel:${item.phone}`);
                }}>
                  <FontAwesome name="phone-square" size={30} style={{color:colors.theme,marginRight:10}} />
                </Pressable>
                <Pressable onPress={()=>{
                  this.props.navigation.navigate('BloodDonationDetails',{donationId:item.id,myRequest:true});
                }}>
                  <AntDesign name="rightcircleo" size={30} style={{color:colors.theme}} />
                </Pressable>
              </View>
            </View>
            </View>
          </View>)}
          />:<Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:200,zIndex:10,margin:10}} autoPlay loop />}
          
          
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
  };
};

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      locationName:state.auth.locationName,
      propLat:state.auth.lat,
      propLng:state.auth.lng,

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(BloodDonation);

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width,
  }
})
