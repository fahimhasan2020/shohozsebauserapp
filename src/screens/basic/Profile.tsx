import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput,ToastAndroid } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { ThemeButton } from '../../components/Buttons'

export default class Profile extends Component {
  state = {
    firstName:'',
    lastName:'',
    loading:false
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
            </View>
            <ThemeButton title="Update Profile" onPress={()=>{
              this.setState({loading:true});
              setTimeout(()=>{
                ToastAndroid.show("Server error",ToastAndroid.SHORT);
                this.setState({loading:false});
              },3000)
            }} loading={this.state.loading} />
        
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
