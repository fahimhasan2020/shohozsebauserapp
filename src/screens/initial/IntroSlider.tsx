import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Text, View,StyleSheet,Image, Dimensions,TouchableOpacity,StatusBar } from 'react-native'
import {hide} from "react-native-bootsplash"
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const slides = [
  {
    key: 'one',
    title: 'Get Appointment',
    text: 'Get instant or schedule for doctor appointment.',
    image: require('../../assets/introslider1.png'),
    backgroundColor: '#ccc',
  },
  {
    key: 'two',
    title: 'Find Blood Donor',
    text: 'You can find your nearest available blood donor',
    image: require('../../assets/introslider2.png'),
    backgroundColor: '#ccc',
  },
  {
    key: 'three',
    title: 'Buy Medicine',
    text: 'You can buy medicine from our medicine shop',
    image: require('../../assets/introslider3.png'),
    backgroundColor: '#ccc',
  },
  {
    key: 'four',
    title: 'Find Ambulance',
    text: 'You can call for nearest ambulance service',
    image: require('../../assets/introslider4.png'),
    backgroundColor: '#ccc',
  },
  {
    key: 'five',
    title: 'Get Nursing service',
    text: 'You can find nursing service',
    image: require('../../assets/introslider5.png'),
    backgroundColor: '#ccc',
  },
];
export default class IntroSlider extends Component {
  state = {
    showRealApp: false,
    showStatusBar:false
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = async() => {
    console.log('don clicked');
    const setFirstTime = await AsyncStorage.setItem("firstTime","false");
    this.props.navigation.navigate("Login");
    this.setState({ showRealApp: true });
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="arrowright"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="arrowleft"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderSkipvButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{color:"rgba(255, 255, 255, .9)"}}>Skip</Text>
      </View>
    );
  };
  componentDidMount(): void {
      hide();
      setTimeout(()=>{
        this.setState({showStatusBar:true});
      },2000);
  }
  render() {
    return (<View style={{flex:1}}>{this.state.showStatusBar?<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />:null}<AppIntroSlider 
      renderPrevButton={this._renderPrevButton}
      renderNextButton={this._renderNextButton}
      renderDoneButton={this._renderDoneButton}
      renderSkipButton={this._renderSkipvButton}
      renderItem={this._renderItem} 
      data={slides} 
      showPrevButton
      showSkipButton
      onDone={this._onDone} /></View>
     
    )
  }
}

const styles = StyleSheet.create({
  slide:{flex:1,alignItems:'center',justifyContent:'center'},
  title:{fontSize:20,color:colors.theme,fontWeight:'bold',textTransform:'uppercase'},
  text:{fontSize:16,fontWeight:'bold',color:'#4c4f4d',width:300,alignSelf:'center',alignItems:'center',textAlign:'center',marginTop:20},
  image:{
    width:200,
    height:300
  },
  nextButton:{
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    margin:5,
    backgroundColor:colors.orange,
    elevation:5
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
