import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'

export default class Search extends Component {
  state ={
    search:''
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <View style={styles.searchContainer}>
          <TextInput onFocus={()=>{this.props.navigation.navigate('Search')}} value={this.state.search} onChangeText={(value)=>{this.setState({search:value})}} style={styles.searchInput} placeholder='Enter service code or doctor name' />
        </View>
        <View style={styles.content}>
            <Image source={require('../../assets/notavailable.jpg')} style={styles.iconSize} />
            <Text style={styles.textStyle}> No item available </Text>
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
    searchContainer:{
        paddingLeft:20,
        paddingRight:20,
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
