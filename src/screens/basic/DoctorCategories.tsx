import React, { Component } from 'react'
import { Text, View ,StyleSheet,Pressable,Image,ScrollView,Dimensions} from 'react-native'
import { row } from '../../ui/row'
import { shadows } from '../../ui/shadow'
import { typo } from '../../ui/typo'
import { colors } from '../../constants/colors'
import {marginTopSmall} from "../../ui/spacing"
import {connect} from "react-redux"
import { baseUri } from '../../constants/urls'
import StackHeader from '../../components/StackHeader'
class DoctorCategories extends Component {
  state = {
    categories:[]
  }
  componentDidMount(): void {
      fetch(this.props.host+'doctordepartments').then((response)=>response.json()).then((responseJson)=>{
        console.log('categoriesos',responseJson);
        this.setState({categories:responseJson});
        this.props.changeLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  render() {
    return (
      <View style={{flex:1,position:'relative',backgroundColor:'#fff'}}>
        <Image source={require('../../assets/bgoverlay.png')} style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get("window").width,position:'absolute',top:0,left:0,opacity:0.2}} />
        <ScrollView contentContainerStyle={styles.container}>
        <StackHeader navigation={this.props.navigation} />
        <View style={{marginBottom:40,marginTop:20}}>
            <Text style={typo.h1}>Select Your Category</Text>
        </View>
         <View style={[row,{ flexWrap: 'wrap', padding: 5 }]}>
          {this.state.categories.map((item,index)=>(<Pressable onPress={()=>{
            this.props.navigation.navigate('SingleDoctorCategory',{title:item.name,categoryId:item.id});
          }} style={[styles.card,shadows.smallShadow]}>
            <Image source={{uri:baseUri+'images/departments/'+item.imagepath}} style={styles.cardImage} />
            <Text style={[typo.p,{width:80,alignItems:'center',textAlign:'center',alignSelf:'center',color:colors.theme},marginTopSmall]}>{item.name}</Text>
          </Pressable> ))}
        </View>
      </ScrollView>
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
        changeLoading : (value) => {dispatch({type:'LOADING',loading: value})},
    };
};
  
const mapStateToProps = state => {
    return {
        accessToken : state.auth.accessToken,
        host: state.auth.host
    }
};
  
export default connect(mapStateToProps,mapDispatchToProps)(DoctorCategories);

const styles = StyleSheet.create({
    container:{

    },
    card:{
        height:200,
        width:130,
        backgroundColor:'white',
        borderRadius:5,
        marginBottom:25
      },
      cardImage:{
        width:130,
        height:130,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
      }
})
