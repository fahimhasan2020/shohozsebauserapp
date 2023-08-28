import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions,Image,Pressable } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors'
import { shadows } from '../../ui/shadow'
import { typo } from '../../ui/typo'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
export default class BloodDonation extends Component {
  render(){
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={{flex:1,backgroundColor:'white'}}>
          <Text style={[typo.p,{marginLeft:20,marginBottom:20,marginTop:30}]}>Recent Blood requests</Text>
          <View style={{paddingLeft:20}}>

            <View style={[{width:230,height:280,backgroundColor:'#fff',borderRadius:15},shadows.smallShadow]}>
           
            <Image source={require('../../assets/demomap.png')} style={{width:'100%',alignSelf:'center',height:140,borderTopLeftRadius:15,borderTopRightRadius:15}} />
            <View style={{position:'absolute',top:0,left:0,width:'100%',height:140,zIndex:2,backgroundColor:'rgba(186, 71, 169,0.5)',borderTopLeftRadius:15,borderTopRightRadius:15}}></View>
            <Pressable style={{position:'absolute',right:17,top:110,padding:20,backgroundColor:colors.theme,elevation:10,borderRadius:30,zIndex:3}}>
              <Text style={{color:'white'}}>B+</Text>
            </Pressable>
            <View style={{padding:10}}>
              <Text style={{fontSize:10,width:150,fontWeight:'bold',textTransform:'uppercase'}}>Mohammodpur, bosila</Text>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="clockcircleo" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>3:26 am, friday, 26 th march, 2023</Text>
              </View>
              <View style={{marginTop:20,flexDirection:'row'}}>
                <AntDesign name="file1" size={20} style={{color:'#ccc'}} />
                <Text style={{width:110,fontSize:10,marginLeft:10}}>Baby delivery patient</Text>
              </View>
              <View style={{flexDirection:'row',position:'absolute',bottom:10,right:10}}>
                <FontAwesome name="phone-square" size={30} style={{color:colors.theme,marginRight:10}} />
                <AntDesign name="rightcircleo" size={30} style={{color:colors.theme}} />
              </View>
            </View>
            
            </View>

          </View>
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
