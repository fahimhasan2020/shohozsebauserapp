import React, { Component } from 'react'
import { View, Text,ScrollView,Image,Pressable,Share,Linking,FlatList } from 'react-native'
import { connect } from 'react-redux'
import MapView,{Marker} from 'react-native-maps';
import { mapdesign } from '../ui/mapdesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
class DonorListMap extends Component {
  state = {
    latitude:'',
    longitude:''
  }
  render() {
    const {subscribers,lat,lng,requestId} = this.props.route.params;
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapdesign}
>
<Marker coordinate={{  latitude: parseFloat(lat),
            longitude: parseFloat(lat)}}
            title="Home Address"
            />
</MapView>
<View style={{position:'absolute',left:0,width:'100%',height:200,bottom:50,}}>
  <FlatList keyExtractor={(item,index)=>index} horizontal={true} showsHorizontalScrollIndicator={false} data={subscribers} renderItem={({item,index})=>(<View style={{height:120,width:160,backgroundColor:'white',elevation:10,borderRadius:5,marginLeft:20,flexDirection:'row'}}>
    <View>
      <Image source={require('../assets/user.png')} style={{width:70,height:70,marginTop:20,marginLeft:10}} />
      <Text style={{fontSize:8,color:'#000',marginLeft:15,marginTop:10}}>{item.first_name} {item.last_name}</Text>
    </View>
    <View style={{alignItems:'flex-end',width:60,paddingTop:10}}>
      <Pressable
      onPress={()=>{
        Linking.openURL(`tel:${item.phone_number}`);
      }}
      style={{backgroundColor:'white',elevation:5,padding:5,borderRadius:10,marginBottom:5}}>
        <MaterialIcons name="local-phone" size={16} color={'blue'} />
      </Pressable>
      <Pressable
      onPress={()=>{
        const message = "Hello sir. Can you help us by donating blood? Please track us at: https://admin.shohozseba.com/user/get/bloodrequest/near/"+requestId;
        Linking.openURL(`sms:${item.phone_number}?body=${encodeURIComponent(message)}`);
      }}
      style={{backgroundColor:'white',elevation:5,padding:5,borderRadius:10,marginBottom:5}}>
        <MaterialIcons name="sms" size={16} color={'orange'} />
      </Pressable>
      <Pressable
      onPress={()=>{
        Share.share({
          message: '01676081282',
        });
      }}
      style={{backgroundColor:'white',elevation:5,padding:5,borderRadius:10,marginBottom:5}}>
        <MaterialIcons name="share" size={16} color={'grey'} />
      </Pressable>
    </View>
  </View>)} />
  
</View>
<View style={{position:'absolute',top:60,width:'70%',backgroundColor:'white',elevation:3,padding:10,alignSelf:'center',borderRadius:5,left:80}}>
  <Text style={{color:'#000',fontSize:8}}>We found some matches for requested blood group</Text>
</View>
<Pressable
onPress={()=>{
  this.props.navigation.navigate('HomeTab')
}}
style={{position:'absolute',top:60,left:20,padding:10,elevation:3,backgroundColor:'white',borderRadius:20}}>
  <MaterialIcons name="chevron-left" size={20} color="#000" />
</Pressable>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorListMap)

