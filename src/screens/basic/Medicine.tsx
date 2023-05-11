import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions,TextInput,Pressable,Image } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors';
import { typo } from '../../ui/typo';
import { paddingBig, paddingSmall } from '../../ui/spacing';
import { CardHalfWidthNp } from '../../components/Cards'
import { marginTopMedium } from '../../ui/spacing'
import AntDesign from "react-native-vector-icons/AntDesign"
import { row } from '../../ui/row'

export default class Medicine extends Component {
  state= {
    search:''
  }
  onScreenFocus = () => {
    console.log('Screen focused');
    // Call your function here
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={styles.searchContainer}>
          <TextInput value={this.state.search} onChangeText={(value)=>{this.setState({search:value})}} style={styles.searchInput} placeholder='Enter medicine name' />
        </View>
        
      </ScrollView>
    )
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', this.onScreenFocus);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width,
  },
  searchContainer:{
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom:5,
    marginTop:20
  },
  searchInput:{
    backgroundColor:colors.grey,
    marginLeft:5,
    marginRight:5,
    borderRadius:5,
    marginBottom:10,
    paddingLeft:10
  },
})
