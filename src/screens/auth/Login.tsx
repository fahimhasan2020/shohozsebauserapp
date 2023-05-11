import { Text, StyleSheet, View,StatusBar,Image,ActivityIndicator,Dimensions,TextInput,TouchableOpacity,Linking,ToastAndroid,Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from "react-native-vector-icons/Fontisto"
import {
  getHash,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import React, { Component } from 'react'
import {connect} from "react-redux"
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { LoginManager,Profile } from "react-native-fbsdk-next";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { row } from '../../ui/row';
import { marginTopBig, marginTopMedium, marginTopSmall } from '../../ui/spacing';
import { GoogleSignin,statusCodes,GoogleSigninButton   } from '@react-native-google-signin/google-signin';



export class Login extends Component {
  state ={
    phoneNumber:'',
    otp:false,
    finalOtp:'',
    otpInput:'',
    serverOtp:'',
    requesting:false,
    otpRequesting:false,
    userinfo:{},
    currentUser:{}
  }

  loginWithFacebook = () =>{
    console.log('called auto');
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result)=> {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          const currentProfile = Profile.getCurrentProfile().then(
            (currentProfile)=> {
              if (currentProfile) {
                console.log(currentProfile);
                fetch(this.props.host+'social/login',{
                  method:"POST",
                  headers:{"Content-type":"application/json","Accept":"application/json"},
                  body:JSON.stringify({
                    email:'fb'+currentProfile.userID,
                    first_name:currentProfile.firstName,
                    last_name:currentProfile.lastName,
                    profile_picture:'https://i.pinimg.com/736x/15/ca/0c/15ca0c352322cb9101e20e423ec34554.jpg'
                  })
                }).then((response)=>response.json()).then((responseJson)=>{
                  console.log(responseJson);
                  if(responseJson.hasOwnProperty("token")){
                    this.props.changeAccessToken(responseJson.token);
                    this.props.changeProfile(responseJson.user);
                    this.props.changeLogged(true);
                  }
                })
              }
            }
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }


  loginWithGoogle = async() =>{
    try {
      await GoogleSignin.configure({
        webClientId: '129996174650-etl3rai21fql983dpmm5f761evlm05bl.apps.googleusercontent.com',
        forceCodeForRefreshToken: true,
       });
     
      await GoogleSignin.hasPlayServices();
      
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      if(userInfo.hasOwnProperty('idToken')){
          console.log(userInfo);
          fetch(this.props.host+'social/login',{
            method:"POST",
            headers:{"Content-type":"application/json","Accept":"application/json"},
            body:JSON.stringify({
              email:'gl'+userInfo.user.id,
              first_name:userInfo.user.givenName,
              last_name:userInfo.user.familyName,
              profile_picture:'https://i.pinimg.com/736x/15/ca/0c/15ca0c352322cb9101e20e423ec34554.jpg'
            })
          }).then((response)=>response.json()).then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.hasOwnProperty("token")){
              this.props.changeAccessToken(responseJson.token);
              this.props.changeProfile(responseJson.user);
              this.props.changeLogged(true);
            }
          })
        
      }
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error service unavailable');
      } else {
        console.log(error);
      }
    }

  }

  



  login=()=>{
    this.setState({requesting:true});
    console.log('called auto');
    fetch(this.props.host+'login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phoneNumber: this.state.phoneNumber})
    }).then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson);
      if(responseJson.hasOwnProperty("errors")){
        this.setState({requesting:false});
        if(responseJson.errors.hasOwnProperty("phone_number")){
           return  ToastAndroid.showWithGravity(
        responseJson.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
        }else{
          return  ToastAndroid.showWithGravity(
            responseJson.errors.phone[0],
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          
        }
      
      }else{
        this.setState({otp:true,serverOtp:responseJson.otp,requesting:false});
        ToastAndroid.show("Otp has been send to your number.",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        startOtpListener(message => {
          console.log(message);
          const otp = /(\d{4})/g.exec(message)[1];
          this.setState({finalOtp:otp,otpInput:otp});
          setTimeout(()=>{
            this.verifyOtp();
          },1000);
        });
      }
    }).catch(e=>{
      this.setState({requesting:false});
    });
  }

  verifyOtp = async()=>{
    if(this.state.finalOtp == this.state.serverOtp){
       fetch(this.props.host+'otp/verify',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({phoneNumber: this.state.phoneNumber})
       }).then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.hasOwnProperty('token')){
          this.props.changeAccessToken(responseJson.token);
          this.props.changeProfile(responseJson.user);
          this.props.changeLogged(true);
          this.setState({otp:false});
          }else{
            this.setState({otp:false});
          }
        
         })
    }else{
      ToastAndroid.showWithGravity(
        "Wrong Otp",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      await AsyncStorage.setItem('loggedIn', "false");
    }
  }

  
  componentDidMount = () =>{
    getHash().then(hash => {
    //console.log(hash);
    }).catch(console.log);
  }



  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor="#87419a" />
        <View style={{backgroundColor:'white',width:120,height:120,alignSelf:'center',justifyContent:'center',borderRadius:10,marginTop:windowHeight*0.2}}>
          <Image source={require('../../assets/logo.png')} style={{height:100,width:100,alignSelf:'center'}} />
        </View>
        <Text style={{fontSize:20,color:'white',fontWeight:'bold',alignSelf:'center',marginTop:20}}>SHOHOZ SEBA</Text>
        <Text style={{fontSize:15,color:'white',alignSelf:'center',marginTop:4,letterSpacing:2}}>Sign in to continue</Text>
        <View style={styles.cardView}>
          {!this.state.otp?<View>
            <Text style={{fontSize:15,fontWeight:'bold',marginBottom:20}}>Enter phone number</Text>
            <TextInput value={this.state.phoneNumber} onChangeText={(value)=>{this.setState({phoneNumber:value})}} placeholder='+880-1XXXXXXXXXX' style={styles.inputNumber} onSubmitEditing={()=>{this.login()}} keyboardType='numeric'/>
            <TouchableOpacity
            onPress={()=>{
            this.login();
            }}
            style={{width:'90%',elevation:10,padding:10,marginTop:10,alignItems:'center',borderRadius:10,backgroundColor:'#87419a'}}>
            {!this.state.requesting?<Text style={{color:'white'}}>Join With Phone</Text>:<ActivityIndicator color={'white'} size={'small'} />}
            </TouchableOpacity>
            </View>:<View>
            <Text style={{fontSize:15,fontWeight:'bold',marginBottom:20}}>Enter OTP</Text>
            <OTPInputView
            style={{width: '80%', height: 80}}
            pinCount={4}
            autoFocusOnLoad={false}
            code={this.state.otpInput} 
            onCodeChanged = {(code) => { this.setState({otpInput:code})}}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(code) => {
            this.setState({finalOtp:code});
            setTimeout(()=>{
               this.verifyOtp();
            },500);
            }}
          /></View>}
          <View style={[row,marginTopBig,{width:300}]}><Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Social Login</Text></View>
          <View style={[styles.socialArea,marginTopMedium]}>
            <Pressable onPress={this.loginWithFacebook} style={styles.socialButton}><Fontisto name="facebook" size={30} color={'#ffffff'} /></Pressable>
            <Pressable onPress={this.loginWithGoogle} style={styles.socialButtonGoogle}><Fontisto name="google" size={30} color={'red'} /></Pressable>
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
      changeProfile : (value) => {dispatch({type:'PROFILE_CHANGE',user: value})},
      changeActivity : (value) => {dispatch({type:'CHANGE_ACTIVITY',stata: value})},
  };
};

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#87419a'},
  cardView:{position:'absolute',bottom:0,left:0,right:0,width:'100%',height:windowHeight*0.5,backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20,elevation:10,paddingLeft:30,paddingTop:40},
  inputNumber:{width:'90%',padding:5,borderWidth:2,borderColor:'#ccc',borderRadius:10},
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 2,
    backgroundColor:'#87419a',
    color:'white'
    // borderBottomWidth: 2,
  },
  socialArea:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    width:300,
  },

  underlineStyleHighLighted: {
    borderColor: "#282829",
  },
  socialButton:{
    height:50,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3b5998',
    borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginRight:10
  },
  socialButtonGoogle:{
    height:50,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  }
})