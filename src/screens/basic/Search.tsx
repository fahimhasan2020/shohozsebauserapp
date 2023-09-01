import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput,FlatList,Pressable } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"
import DoctorList from '../../components/DoctorList'
class Search extends Component {
  state ={
    search:'',
    results:[]
  }
  search = (text:String) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://admin.shohozseba.com/user/search/doctor/"+text, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);this.setState({results:result})})
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <View style={styles.searchContainer}>
          <TextInput onFocus={()=>{this.props.navigation.navigate('Search')}} value={this.state.search} onChangeText={(value)=>{this.setState({search:value});if(value.length>2){this.search(value);}}} style={styles.searchInput} placeholder='Enter service code or doctor name' />
        </View>
        <DoctorList doctors={this.state.results} />
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
      changeLoading : (value) => {dispatch({type:'CHANGE_Loading',loading: value})},
  };
};


const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    searchContainer:{
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
      },
      searchInput:{
        backgroundColor:colors.grey,
        marginLeft:5,
        marginRight:5,
        borderRadius:5,
        marginBottom:10,
        paddingLeft:10
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
        backgroundColor:'#fff',
    },
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase',
        color:colors.theme,
        opacity:0.2
    }
})
