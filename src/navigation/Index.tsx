import React, { Component,useState,useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Entypo from 'react-native-vector-icons/Entypo';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from "react-redux"
import {Home,History,Cart,Medicine,BloodDonation,Doctors,BMI,DDC,IBW,PDT,Login,IntroSlider, Splash} from "./Src"
const StackLogin = createStackNavigator();
function LoginNavigation() {
  return (
    <StackLogin.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}> 
      <StackLogin.Screen name="Splash" component={Splash} />
      <StackLogin.Screen name="IntroSlider" component={IntroSlider} />
      <StackLogin.Screen name="Login" component={Login} />
    </StackLogin.Navigator>
  );
}

function HomeNavigations() {
  return (
    <StackLogin.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}>
        <StackLogin.Screen name="HomeTab" children={HomeTabs} />
        <StackLogin.Screen name="BMI" component={BMI} />
        <StackLogin.Screen name="IBW" component={IBW} />
        <StackLogin.Screen name="PDT" component={PDT} />
        <StackLogin.Screen name="DDC" component={DDC} />
        <StackLogin.Screen name="Cart" component={Cart} />
      </StackLogin.Navigator>)
    }

    const HomeTab = createBottomTabNavigator();

    function HomeTabs() {
      const [notification,setNotification] = useState(0);
      useEffect(()=>{
        //setNotification(3);
      })
      return (
        <HomeTab.Navigator  screenOptions={{ headerShown: false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:'rgba(0,0,0,0.8)',elevation:0,height:60,position:'absolute',left:0,right:0,bottom:0},tabBarActiveTintColor:'#CCC',tabBarInactiveTintColor:'#FFF' }}>
          <HomeTab.Screen options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
                    <Entypo name="home" size={size} color={color} />
                    <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Home</Text>
                </View>)
          }} name="Home" component={Home} />
          <HomeTab.Screen options={{
             tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
             <Fontisto name="doctor" size={size} color={color} />
             <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Doctors</Text>
         </View>)
          }} name="Services" component={Doctors} />
          <HomeTab.Screen options={{
             tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
             <Fontisto name="blood-drop" size={size} color={color} />
             <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Blood</Text>
         </View>)
          }} name="Blood" component={BloodDonation} />
          <HomeTab.Screen 
          options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
            <MaterialIcons name="medical-services" size={size} color={color} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Medicine</Text>
        </View>)
          }} name="Medicine" component={Medicine} />
          <HomeTab.Screen 
          options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
            <Fontisto name="history" size={size} color={color} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>History</Text>
        </View>)
          }} name="History" component={History} />
        </HomeTab.Navigator>
      );
    }


    export  class Index extends Component {
      render() {
        if(this.props.loggedIn){
          return(
        <NavigationContainer>
          <HomeNavigations />
        </NavigationContainer>)
        }else{
          return (
          <NavigationContainer>
            <LoginNavigation />
          </NavigationContainer>
        )
        }
        
      }
    }
    
    const mapDispatchToProps = dispatch => {
      return{
          changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
          changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
      };
    
    };
    const mapStateToProps = state => {
      return {
          accessToken : state.auth.accessToken,
          host: state.auth.host,
          loggedIn:state.auth.loggedIn
      }
    };
    export default connect(mapStateToProps,mapDispatchToProps)(Index);

const styles = StyleSheet.create({

})
