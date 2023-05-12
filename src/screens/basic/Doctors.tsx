import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions,TextInput,Pressable,Image,PermissionsAndroid,ToastAndroid } from 'react-native'
import Head from '../../components/Head'
import { colors } from '../../constants/colors';
import { typo } from '../../ui/typo';
import { paddingBig, paddingSmall } from '../../ui/spacing';
import { CardHalfWidthNp } from '../../components/Cards'
import { marginTopMedium } from '../../ui/spacing'
import AntDesign from "react-native-vector-icons/AntDesign"
import { row } from '../../ui/row'

export default class Doctors extends Component {
  state= {
    search:''
  }
  onScreenFocus = () => {
    console.log('Screen focused');
    // Call your function here
  }

  goTODoctorScreen =() =>{
    this.props.navigation.navigate('DoctorSingle');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={styles.searchContainer}>
          <TextInput value={this.state.search} onChangeText={(value)=>{this.setState({search:value})}} style={styles.searchInput} placeholder='Enter service code or doctor name' />
        </View>
        <View style={[paddingBig]}>
          <Text style={typo.p}>Online now</Text>
          <CardHalfWidthNp bgColor={'white'}>
                <Pressable onPress={()=>{this.goTODoctorScreen()}}><Image source={require('../../assets/mydoctor.jpeg')} style={{height:160,width:160,borderTopLeftRadius:10,borderTopRightRadius:10}} />
                <View>
                    <Text style={[typo.h4r,marginTopMedium]}>Eye Specialist (MBBS)</Text>
                    <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
                        <Text>Rating 3.5</Text>
                        <AntDesign name="star" color={colors.orange} size={20} />
                        
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5,marginBottom:20}}>
                        <AntDesign name="videocamera" color={colors.theme} size={20} />
                        <Text>500 BDT</Text>
                    </View>
                    
                </View></Pressable>
               
            </CardHalfWidthNp>
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
