import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput,ToastAndroid,Pressable } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { ThemeButton } from '../../components/Buttons'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Entypo from "react-native-vector-icons/Entypo"
import SelectDropdown from "react-native-select-dropdown"
import ImagePicker from "react-native-image-crop-picker"
class Profile extends Component {
  state = {
    firstName:'',
    lastName:'',
    dp:'',
    blood_group:'',
    blood_groups:['+A','-A','+O','-O','+AB','-AB','+B','-B'],
    loading:false
  }
  updateProfile = async()=>{
    const accessTokens = await AsyncStorage.getItem("token");
    this.setState({loading:true});
    if(this.state.firstName === ''){
      this.setState({loading:false});
      return ToastAndroid.show("First name required",ToastAndroid.SHORT);
    }
    if(this.state.lastName === ''){
      this.setState({loading:false});
      return ToastAndroid.show("Last name required",ToastAndroid.SHORT);
    }
    if(this.state.blood_group === ''){
      this.setState({loading:false});
      return ToastAndroid.show("Last name required",ToastAndroid.SHORT);
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer "+accessTokens);
    var formdata = new FormData();
    formdata.append("first_name", this.state.firstName);
    formdata.append("last_name", this.state.lastName);
    formdata.append("blood_group",this.state.blood_group);
    formdata.append("userId", this.props.userId);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    console.log('body:',this.props.host);
    fetch(this.props.host+"update/profile", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);this.setState({loading:false});})
      .catch(error => {console.log('error', error);this.setState({loading:false})});
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.content}>
            <Image source={require('../../assets/user.png')} style={styles.iconSize} />
            <View style={styles.searchContainer}>
              <TextInput value={this.state.firstName} onChangeText={(value)=>{this.setState({firstName:value})}} style={styles.searchInput} placeholder='Enter first name' />
            </View>
            <View style={styles.searchContainer}>
              <TextInput value={this.state.lastName} onChangeText={(value)=>{this.setState({lastName:value})}} style={styles.searchInput} placeholder='Enter last name' />
            </View>
            <View style={styles.searchContainer}>
            <SelectDropdown
                buttonStyle={{backgroundColor:'#fff',borderWidth:1,borderColor:'#ccc',borderRadius:15,marginBottom:15,width:'100%'}}
                data={this.state.blood_groups}
                onSelect={(value, index) => this.setState({blood_group:value})}
                defaultButtonText="Select Blood Group"
                showsVerticalScrollIndicator={false}
                renderDropdownIcon={()=>(<Entypo name="chevron-down" size={20} color={'#000'} />)}
            />
            </View>
            </View>
            <ThemeButton title="Update Profile" onPress={()=>{
              this.updateProfile();
            }} loading={this.state.loading} />
        
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
      host: state.auth.host,
      userId: state.auth.id,
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

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
    },
    searchContainer:{
      paddingLeft:20,
      paddingRight:20,
      paddingTop:5,
      paddingBottom:5,
      width:'100%',
    },
    searchInput:{
      backgroundColor:colors.grey,
      marginLeft:5,
      marginRight:5,
      borderRadius:5,
      marginBottom:10,
      paddingLeft:10
    },
    content:{
        flex:1,
        alignItems:'center',
        width:'100%',
        justifContent:'center',
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
