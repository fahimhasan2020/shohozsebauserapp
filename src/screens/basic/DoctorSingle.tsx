import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,Dimensions,ToastAndroid,PermissionsAndroid } from 'react-native'
import StackHeaderFixed from '../../components/StackHeaderFixed'
import { colors } from '../../constants/colors'
import { CardHalfWidthNp } from '../../components/Cards'
import { typo } from '../../ui/typo'
import { marginTopMedium } from '../../ui/spacing'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { ThemeButton } from '../../components/Buttons'
import { row } from '../../ui/row'
import { CardFullWidth } from '../../components/Cards'

export default class DoctorSingle extends Component {
    state={
        loading:''
    }
  render() {
    return (
      <View style={styles.container}>
        <StackHeaderFixed navigation={this.props.navigation}  />
        <Image source={require('../../assets/bgoverlay.png')} style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get("window").width,position:'absolute',top:0,left:0,opacity:0.2}} />
        <View>
        <Image source={require('../../assets/mydoctor.jpeg')} style={{height:350,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}} />
        <View>
                    <Text style={[typo.h1,marginTopMedium]}>MINHAJUL ABEDIN</Text>
                    <Text style={[typo.h4r,marginTopMedium]}>Eye Specialist (MBBS)</Text>
                    <View style={{padding:20}}>
                         <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
                         <AntDesign name="star" color={colors.orange} size={20} />
                          <Text style={{marginLeft:20}}> 3.5 (10 reviews)</Text>
                        
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
                        <AntDesign name="videocamera" color={colors.theme} size={20} />
                        <Text style={{marginLeft:20}}>500 BDT</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
                    <Entypo name="stopwatch" color={colors.theme} size={20} />
                        <Text style={{marginLeft:20}}>7 years experienced</Text>
                    </View>
                    </View>
        </View>       
        </View>
        <View style={{position:'absolute',bottom:20,left:0,width:'100%'}}>
            <ThemeButton title="Call Now" onPress={async()=>{
                        this.setState({loading:true});
                        try {
                            const permissions = [
                              PermissionsAndroid.PERMISSIONS.CAMERA,
                              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                            ];
                            const granted = await PermissionsAndroid.requestMultiple(permissions,{
                              title: 'Permission Request',
                              message: 'This app needs access to your camera, microphone, and storage.',
                              buttonPositive: 'Ok',
                              buttonNegative: 'Cancel',
                            });
                        
                            if (
                              granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
                              granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED &&
                              granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
                            ) {
                                setTimeout(()=>{
                                    
                                    this.setState({loading:false});
                                    this.props.navigation.navigate('CallScreen');
                                },3000);
                            } else {
                              console.log('Some permissions denied');
                              ToastAndroid.show("Permission denied",ToastAndroid.CENTER);
                            }
                          } catch (err) {
                            console.warn(err);
                          }
                        
                       
                        }} loading={this.state.loading} />
        </View>
       
      </View>
    )
  }
}

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
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase',
        color:colors.theme,
        opacity:0.2
    }
})
