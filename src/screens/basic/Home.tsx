import React, { Component } from 'react'
import { Text, StyleSheet, View,Pressable,StatusBar } from 'react-native'
import {connect} from "react-redux"
import Head from '../../components/Head'
import AsyncStorage from '@react-native-async-storage/async-storage'
class Home extends Component {
  componentDidMount = async(): void => {
      const data = await AsyncStorage.getItem("loggedIn");
      console.log(data);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <Head />
        <Text> textInComponent </Text>
        <Pressable onPress={()=>{this.props.logout(false)}}><Text>Hi</Text></Pressable>
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
  };
};

const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  }
})
