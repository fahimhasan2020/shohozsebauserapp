import React, { Component } from 'react'
import { Text, View,StatusBar,Image,StyleSheet,Pressable,Linking,Share,ScrollView } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import { sizes } from '../../constants/sizes';
import { mapdesign, randomCoordinates } from '../../ui/mapdesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { connect } from 'react-redux';
class BloodDonationDetails extends Component {
  state = {
    detailsRequest:null
  }
  componentDidMount = () => {
     console.log(this.props.route.params.donationId);
     var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(this.props.host+"bloodrequest/data/"+this.props.route.params.donationId, requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result);this.setState({detailsRequest:result})})
        .catch(error => console.log('error', error));
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'green'}}>
        <StatusBar  translucent={true} backgroundColor={'transparent'}/>
        <MapView
          style={{height:sizes.windowHeight+40,width:sizes.windowWidth}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={this.state.detailsRequest !== null?{latitude:parseFloat(this.state.detailsRequest.lat),longitude:parseFloat(this.state.detailsRequest.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}:{latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,}}
          customMapStyle={mapdesign}
>
  {this.state.detailsRequest !== null?<Marker
  coordinate={{latitude:parseFloat(this.state.detailsRequest.lat),longitude:parseFloat(this.state.detailsRequest.lng)}}
  title={this.state.detailsRequest.userName}
  ><Image source={require('../../assets/donor.png')} style={{height:30,width:30}} />
    </Marker>:null}
</MapView>
<View style={{position:'absolute',bottom:0,left:0,width:sizes.fullWidth,height:300,backgroundColor:'#fff',elevation:3}}>
<Image source={require('../../assets/user.png')} style={{height:100,width:100,alignSelf:'center',marginTop:-50,backgroundColor:'white',borderRadius:50}} />
{this.state.detailsRequest !==null?<ScrollView contentContainerStyle={{paddingBottom:100}} style={{padding:10,paddingTop:50,paddingLeft:30}}>
    <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialIcons name="supervised-user-circle" size={20} color={'green'} style={{marginRight:20}} />
        <Text style={styles.sampleText}>{this.state.detailsRequest.userName}</Text>
    </View>
    <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialCommunityIcons name="blood-bag" size={20} color={'red'} style={{marginRight:20}} />
<Text style={styles.sampleText}>{this.state.detailsRequest.group}</Text></View>
<View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialIcons name="file-copy" size={20} color={'orange'} style={{marginRight:20}} />
<Text style={styles.sampleText}>{this.state.detailsRequest.details}</Text></View>
<View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialIcons name="access-time" size={20} color={'blue'} style={{marginRight:20}} />
<Text style={styles.sampleText}>{this.state.detailsRequest.donation_time}</Text></View>
<Pressable onPress={()=>{
                  Linking.openURL(`tel:${this.state.detailsRequest.phone}`);
                }} style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialIcons name="local-phone" size={20} color={'black'} style={{marginRight:20}} />
<Text style={styles.sampleText}>{this.state.detailsRequest.phone}</Text></Pressable>
<View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
        <MaterialIcons name="add-location" size={20} color={'blue'} style={{marginRight:20}} />
<Text style={styles.sampleText}>{this.state.detailsRequest.location_details}</Text></View>
</ScrollView>:null}


</View>
{this.state.detailsRequest !==null?<Pressable onPress={async()=>{
  const result = await Share.share({
    message: 'Geetings in advance. We need urgently blood group O+ blood near you. Track the details from here: https://admin.shohozseba.com/user/get/bloodrequest/near/'+this.state.detailsRequest.id,
  });
}} style={{position:'absolute',elevation:3,top:50,right:100,backgroundColor:'white',padding:10,borderRadius:20}}>
<AntDesign name="sharealt" size={20} color={'grey'}  />
</Pressable>:null}
{this.state.detailsRequest !==null?<Pressable onPress={()=>{
                  Linking.openURL(`tel:${this.state.detailsRequest.phone}`);
                }} style={{position:'absolute',elevation:3,top:50,right:50,backgroundColor:'white',padding:10,borderRadius:20}}>
<MaterialIcons name="local-phone" size={20} color={'grey'}  />
</Pressable>:null}
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

export default connect(mapStateToProps,mapDispatchToProps)(BloodDonationDetails);

const styles = StyleSheet.create({
    sampleText:{
        fontSize:16,fontWeight:'bold',color:'#ccc'
    }
})