import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput,FlatList,Pressable } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"
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
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <View style={styles.searchContainer}>
          <TextInput onFocus={()=>{this.props.navigation.navigate('Search')}} value={this.state.search} onChangeText={(value)=>{this.setState({search:value})}} style={styles.searchInput} placeholder='Enter service code or doctor name' />
        </View>
        <View style={{width:'90%',alignSelf:'center',padding:10,height:230,backgroundColor:'white',borderRadius:5,elevation:3,flexDirection:'row'}}>
          <View>
            <Image source={{uri:'https://admin.shohozseba.com/public/images/64eea9be1a385_portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg'}} style={{height:50,width:50,borderRadius:5}} />
            <Text style={{fontSize:9,color:'#adadad',fontWeight:'bold',marginTop:5}}>7+ years </Text>
            <Text style={{fontSize:8,color:'#000',fontWeight:'bold'}}>Experience</Text>
          </View>
          <View style={{paddingLeft:20,width:'90%'}}>
            <View style={{backgroundColor:'blueviolet',padding:3,width:30,borderRadius:5,position:'absolute',right:15,top:0}}>
              <Text style={{color:'white',fontSize:8}}>Online</Text>
            </View>
          <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>Dr. Safwanur rahman</Text>
          <Text style={{fontSize:11,color:'#000',fontWeight:'bold'}}>MBBS,FCPS</Text>
          
          <Text style={{fontSize:12,color:'blueviolet',opacity:0.5,marginTop:20}}>Darmatology, Generel physic</Text>
          <Text style={{fontSize:11,color:'#000',opacity:0.5,marginTop:30}}>Work in</Text>
          <Text style={{fontSize:11,color:'#000',opacity:0.5}}>Dhaka medical college, Cariac unit</Text>
          <Pressable style={{marginTop:20,flexDirection:'row'}}>
            <AntDesign name="videocamera" size={14} color={'blueviolet'} />
            <Text style={{fontSize:11,color:'blueviolet',opacity:0.5,marginLeft:10}}>Call for video consultation</Text>
          </Pressable>
          
          </View>
        </View>
        {/* <View style={styles.content}>
            <Image source={require('../../assets/notavailable.jpg')} style={styles.iconSize} />
            <Text style={styles.textStyle}> No item available </Text>
        </View> */}
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
