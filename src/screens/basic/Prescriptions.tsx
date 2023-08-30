import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,Modal,Pressable,Linking,FlatList,Animated, Easing  } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Lottie from "lottie-react-native";
const AnimatedLottieView = Animated.createAnimatedComponent(Lottie);

interface Props {}

interface State {
  animationProgress: Animated.Value;
}
export class Prescriptions extends Component {
    constructor(props: Props) {
        super(props);
            this.state = {
            animationProgress: new Animated.Value(0),
            showModal:false,
            prescriptionImage:'',
            prescriptions:[],
            lState:0
    };
      }
    playAnimation = () => {
        Animated.timing(this.state.animationProgress, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          this.state.animationProgress.setValue(0);
          this.playAnimation();
        });
      }

  componentDidMount =async()=> {
    this.playAnimation();
    const userId = await AsyncStorage.getItem("id");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer "+this.props.accessToken);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log('userid is',userId);
    fetch(this.props.host+"prescription/byuserid/"+userId, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.length>0){
            this.setState({prescriptions:result,lState:1})
        }else{
            this.setState({lState:2})
        }
    })
        
      .catch(error => console.log('error', error));
  }
  convertDate =(dateString:String)=>{
    const inputDate = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  render() {
    const {title} = this.props.route.params;
    return (
        <View style={styles.container}>
        <Modal animationType="slide"
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={() => {
          this.setState({showModal:false});
        }}>
            <View style={{backgroundColor:'#000',flex:1}}>
                <View style={{width:'100%',height:60,elevation:10,shadowColor:'#ccc',shadowOffset:3,backgroundColor:'grey',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:20}}>Prescription</Text>
                </View>
                <Image source={{uri:this.state.prescriptionImage}} style={{flex:1}} resizeMode='contain' />
                <Pressable onPress={()=>{Linking.openURL(this.state.prescriptionImage)}} style={{position:'absolute',bottom:50,width:300,alignItems:'center',justifyContent:'center',padding:10,backgroundColor:'grey',alignSelf:'center',borderRadius:5}}>
                    <Text style={{color:'white',fontSize:16}}>Download</Text>
                </Pressable>
            </View>
        </Modal>
        <StackHeader navigation={this.props.navigation} />
        <Text style={styles.title}>{title}</Text>
        {this.state.lState === 1?<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            <FlatList
            numColumns={2} 
            data={this.state.prescriptions}
            renderItem={({item,index})=>(<Pressable style={{height:200,width:120,margin:20,borderRadius:5,backgroundColor:'#fff',elevation:3}} onPress={()=>{this.setState({showModal:true,prescriptionImage:item.prescription})}}>
                <Image source={{uri:item.prescription}} style={{height:200,width:120,backgroundColor:'#fff',borderRadius:5}} />
                <View style={{position:'absolute',bottom:0,padding:10,left:0,width:'100%',height:80,backgroundColor:'rgba(0,0,0,0.6)',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{color:'white',fontSize:8}}>{this.convertDate(item.created_at)}</Text>
                </View>
            </Pressable>)}
            />
        </View>:this.state.lState ===0?<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /><Lottie source={require("../../assets/animation_llx30a9y.json")} style={{height:200,width:120,zIndex:10,margin:10}} autoPlay loop /></View>:<View style={styles.content}>
            <Image source={require('../../assets/notavailable.jpg')} style={styles.iconSize} />
            <Text style={styles.textStyle}> No item available </Text>
        </View>}
        
        
        
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


export default connect(mapStateToProps, mapDispatchToProps)(Prescriptions)
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