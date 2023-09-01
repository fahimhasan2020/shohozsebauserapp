import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,Dimensions,Pressable } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { CardHalfWidthNp } from '../../components/Cards'
import { typo } from '../../ui/typo'
import { marginTopMedium } from '../../ui/spacing'
import AntDesign from "react-native-vector-icons/AntDesign"
import { row } from '../../ui/row'
import {connect} from "react-redux"
import DoctorList from '../../components/DoctorList'
class SingleDoctorCategory extends Component {
  state ={
    results:[]
  }
  componentDidMount =()=> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(this.props.host+"doctor/get/department/"+this.props.route.params.categoryId, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);this.setState({results:result})})
      .catch(error => console.log('error', error));
  }
  render() {
    const {title,categoryId} = this.props.route.params;
    return (
      <View style={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <Image source={require('../../assets/bgoverlay.png')} style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get("window").width,position:'absolute',top:0,left:0,opacity:0.2}} />
        <Text style={styles.title}>{title}</Text>
        <DoctorList doctors={this.state.results} />
        {/* {title === 'eye'?<View>
            <CardHalfWidthNp bgColor={'white'}>
                <Pressable onPress={()=>{this.props.navigation.navigate('DoctorSingle')}}><Image source={require('../../assets/mydoctor.jpeg')} style={{height:160,width:160,borderTopLeftRadius:10,borderTopRightRadius:10}} />
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
        </View>:<View style={styles.content}>
            <Image source={require('../../assets/notavailable.jpg')} style={styles.iconSize} />
            <Text style={styles.textStyle}> No Doctor available </Text>
        </View>} */}
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
  
export default connect(mapStateToProps,mapDispatchToProps)(SingleDoctorCategory);

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
        opacity:0.6
    },
    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase',
        color:colors.theme,
        opacity:0.2
    }
})
