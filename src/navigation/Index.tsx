import React, { Component,useState,useEffect } from 'react'
import { Text, StyleSheet, View,Linking,Image,ToastAndroid } from 'react-native'
import {NavigationContainer,useNavigation} from "@react-navigation/native"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import  Fontisto from 'react-native-vector-icons/Fontisto';
import IonIcons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"
import store from "../store/store"
import Loader from '../components/Loader'
import {Home,NearestDoctors,History,Cart,Medicine,BloodDonation,LocationSet,Doctors,BMI,DDC,IBW,PDT,Login,IntroSlider, Splash, DoctorCategories, NoItemAvailable, Profile, Search, SingleDoctorCategory, DoctorSingle, CallScreen, PaymentScreen, Prescriptions, CreateBloodRequest, Notification} from "./Src"
import { colors } from '../constants/colors'
import DonorListMap  from '../components/DonorListMap'
import BloodDonationDetails from '../screens/basic/BloodDonationDetails'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MedicineDetails from '../screens/basic/MedicineDetails'
import CheckOut from '../screens/basic/CheckOut'
import SuccessPayment from '../screens/basic/SuccessPayment'
import Settings from '../screens/account/Settings'
const StackLogin = createStackNavigator();
const Drawer = createDrawerNavigator();
const whatsapp = "+8801711432259"
const whatsappMsg = "Join shohozseba. Link https://shohozseba.com"
const currentState = store.getState();

const logoutAction = {
  type: 'LOGOUT',
  payload: {
    logged: false,
  },
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom header */}
      <View style={styles.header}>
        <Image source={require('../assets/bg.jpg')} style={styles.bgOverlay} />
        <Image source={require('../assets/user.png')} style={styles.userIcons} />
        <Text style={styles.headerText}>
        {currentState.auth.name !== null ? currentState.auth.name : ''}
        </Text>
      </View>
      {/* Your custom items */}
      <DrawerItem
        label="My Profile"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => props.navigation.navigate('Profile')}
        icon={() => <MaterialIcons name="account-box" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Prescriptions"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => props.navigation.navigate('Prescriptions',{ title: 'Prescription', })}
        icon={() => <AntDesign name="filetext1" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Test Reports"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => props.navigation.navigate('NoItemAvailable',{ title: 'Test report', })}
        icon={() => <FontAwesome name="file" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Find Ambulance"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {ToastAndroid.show("Service unavailable in this area",ToastAndroid.SHORT)}}
        icon={() => <FontAwesome name="ambulance" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Find Diagnostic"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {ToastAndroid.show("Service unavailable in this area",ToastAndroid.SHORT)}}
        icon={() => <Fontisto name="test-tube-alt" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Find Nurse"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {ToastAndroid.show("Service unavailable in this area",ToastAndroid.SHORT)}}
        icon={() => <Fontisto name="nurse" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Find Clinic"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {ToastAndroid.show("Service unavailable in this area",ToastAndroid.SHORT)}}
        icon={() => <FontAwesome name="hospital-o" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Support"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${whatsappMsg}`)}
        icon={() => <FontAwesome name="whatsapp" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => props.navigation.navigate('Settings')}
        icon={() => <FontAwesome name="gear" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Refer and Earn"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {ToastAndroid.show("Service unavailable",ToastAndroid.SHORT)}}
        icon={() => <MaterialIcons name="share" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Terms & Condition"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={() => {}}
        icon={() => <MaterialIcons name="file-copy" size={30} color={colors.theme} />}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: '#2b2a2a' }}
        onPress={async() => {await AsyncStorage.setItem('loggedIn', "false");store.dispatch(logoutAction);}}
        icon={() => <MaterialIcons name="logout" size={30} color={colors.theme} />}
      />
    </DrawerContentScrollView>
  );
};

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
  const [initialPage,setInitialPage] = useState("HomeTab");
  const [donationId,setDonationId] = useState(null);
  const [medicineId,setMedicineId] = useState(null);
  const navigation = useNavigation();
  useEffect(()=>{
    Linking.getInitialURL()
          .then((url) => {
            if (url) {
            const parts = url.split('/');
            const action = parts[parts.length - 2];
            const id = parts[parts.length - 1];
            switch (action) {
              case 'bloodrequest':
                navigation.navigate('BloodDonationDetails',{donationId:id});
                break;
              case 'medicinedetails':
                navigation.navigate('MedicineDetails',{medicineId:id});
                break;
              default:
                // this.props.navigation.navigate('Home');
              }
              
            }
          })
          .catch((error) => {
            console.error(error);
          });``
  },[])
  return (
    <StackLogin.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}>
        <StackLogin.Screen name="HomeTab" children={HomeTabs} />
        <StackLogin.Screen name="BMI" component={BMI} />
        <StackLogin.Screen name="Notification" component={Notification} />
        <StackLogin.Screen name="Settings" component={Settings} />
        <StackLogin.Screen name="DoctorCategories" component={DoctorCategories} />
        <StackLogin.Screen name="NearestDoctors" component={NearestDoctors} />
        <StackLogin.Screen name="IBW" component={IBW} />
        <StackLogin.Screen name="PDT" component={PDT} />
        <StackLogin.Screen name="DDC" component={DDC} />
        <StackLogin.Screen name="Cart" component={Cart} />
        <StackLogin.Screen name="NoItemAvailable" component={NoItemAvailable} />
        <StackLogin.Screen name="Profile" component={Profile} />
        <StackLogin.Screen name="Search" component={Search} />
        <StackLogin.Screen name="SingleDoctorCategory" component={SingleDoctorCategory} />
        <StackLogin.Screen name="DoctorSingle" component={DoctorSingle} />
        <StackLogin.Screen name="CallScreen" component={CallScreen} />
        <StackLogin.Screen name="LocationSet" component={LocationSet} />
        <StackLogin.Screen name="PaymentScreen" component={PaymentScreen} />
        <StackLogin.Screen name="Prescriptions" component={Prescriptions} />
        <StackLogin.Screen name="CreateBloodRequest" component={CreateBloodRequest} />
        <StackLogin.Screen name="DonorListMap" component={DonorListMap} />
        <StackLogin.Screen name="BloodDonationDetails"  initialParams={{ donationId }} component={BloodDonationDetails} />
        <StackLogin.Screen name="MedicineDetails"  initialParams={{ medicineId }} component={MedicineDetails} />
        <StackLogin.Screen name="CheckOut"  initialParams={{ medicineId }} component={CheckOut} />
        <StackLogin.Screen name="SuccessPayment"  initialParams={{ medicineId }} component={SuccessPayment} />
      </StackLogin.Navigator>)
    }


function HomeDrawer() {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerContentContainerStyle: { backgroundColor: '#fff' },
            drawerContentStyle: { backgroundColor: '#fff' },
            drawerItemStyle: { backgroundColor: 'white' },
            drawerStyle: {
              backgroundColor: '#fff'
            },
            drawerActiveBackgroundColor: '#fff',
            drawerActiveTintColor: '#fff',
            drawerLabelStyle: { color: 'white', fontSize: 25 }
          }}>
          <Drawer.Screen name="House" children={HomeNavigations} />
        </Drawer.Navigator>
      )
    }

    const HomeTab = createBottomTabNavigator();

    function HomeTabs() {
      const [notification,setNotification] = useState(0);
      useEffect(()=>{
        //setNotification(3);
      })
      return (
        <HomeTab.Navigator initialRouteName='Blood'  screenOptions={{ headerShown: false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:'#fff',elevation:0,height:60,position:'absolute',left:0,right:0,bottom:0},tabBarActiveTintColor:'#454647',tabBarInactiveTintColor:'#ccc' }}>
          <HomeTab.Screen options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
                    <Entypo name="home" size={20} color={color} />
                    <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase',marginTop:6}}>Home</Text>
                </View>)
          }} name="Home" component={Home} />
          <HomeTab.Screen options={{
             tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
             <Fontisto name="doctor" size={20} color={color} />
             <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase',marginTop:6}}>Doctors</Text>
         </View>)
          }} name="Services" component={Doctors} />
          <HomeTab.Screen options={{
             tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
             <Fontisto name="blood-drop" size={20} color={color} />
             <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase',marginTop:6}}>Blood</Text>
         </View>)
          }} name="Blood" component={BloodDonation} />
          <HomeTab.Screen 
          options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
            <MaterialIcons name="medical-services" size={20} color={color} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase',marginTop:6}}>Medicine</Text>
        </View>)
          }} name="Medicine" component={Medicine} />
          <HomeTab.Screen 
          options={{
            tabBarIcon : ({color,size})=>(<View style={{alignItems:'center',justifyContent:'center',top:5}}>
            <Fontisto name="player-settings" size={20} color={color} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase',marginTop:6}}>More</Text>
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
          {this.props.loadingR?<Loader />:null}
          <HomeDrawer />
        </NavigationContainer>)
        }else{
          return (
          <NavigationContainer>
            {this.props.loadingR?<Loader />:null}
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
          changeLoading : (value) => {dispatch({type:'LOADING',loading: value})},
      };
    
    };
    const mapStateToProps = state => {
      return {
          accessToken : state.auth.accessToken,
          host: state.auth.host,
          loggedIn:state.auth.loggedIn,
          loadingR:state.auth.loadingR
      }
    };
    export default connect(mapStateToProps,mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  userIcons:{
    width:120,
    height:120
  },
  header: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerStyle: {
    backgroundColor: '#ffffff',
    width: 240,
  },
  bgOverlay:{
    width:'100%',
    height:200,
    zIndex:0,
    position:'absolute',
    top:0,
    left:0
  }
})


