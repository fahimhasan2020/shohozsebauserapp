import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions,Image,Pressable,FlatList,Modal,useWindowDimensions } from 'react-native'
import Head from '../../components/Head'
import { CardHalfWidth,CardHalfWidthNp } from '../../components/Cards'
import { row } from '../../ui/row'
import { paddingSmall } from '../../ui/spacing'
import { typo } from '../../ui/typo'
import { blog } from '../../constants/urls'
import { colors } from '../../constants/colors'
import {connect} from "react-redux"
import { BasicModal,CardModal } from '../../components/Modals';
import AntDesign from "react-native-vector-icons/AntDesign"
import RenderHtml from 'react-native-render-html';




class History extends Component {
  state = {
    posts:[],
    singlePost:false,
    postTitle:'',
    postDetails:'',
    postImage:''
  }
  limitTitle = (title) => {
    if (title.length > 60) {
      title = title.substring(0, 60) + "...";
    }
    return title;
  }
  onScreenFocus = () => {
    this.geBlogData();
  }

  handleModalClose = () =>{
    this.setState({singlePost:false});
  }

  geBlogData = () =>{
    this.props.changeLoading(true);
    fetch(blog).then((response)=>response.json()).then((responseJson)=>{
        this.setState({posts:responseJson});
        this.props.changeLoading(false);
      }).catch((error)=>{
        this.props.changeLoading(false);
      })
  }
  componentDidMount() {
    this.geBlogData();
    this.unsubscribe = this.props.navigation.addListener('focus', this.onScreenFocus);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Head navigation={this.props.navigation} />
        <View style={[row,paddingSmall]}>
          <CardHalfWidth bgColor={'white'} >
            <Pressable onPress={()=>{this.props.navigation.navigate("BMI")}}>
              <Image source={require('../../assets/bmi.png')} style={styles.cardImageSize} />
              <Text style={[typo.h4r]}>Calculate BMI</Text>
            </Pressable>
          </CardHalfWidth>
          <CardHalfWidth bgColor={'white'} >
            <Pressable onPress={()=>{this.props.navigation.navigate("IBW")}}><Image source={require('../../assets/ibw.png')} style={styles.cardImageSize} />
            <Text style={[typo.h4r]}>Calculate IBW</Text></Pressable>
            
          </CardHalfWidth>
        </View>
        <View style={[row,paddingSmall]}>
          <CardHalfWidth bgColor={'white'} >
            <Pressable onPress={()=>{
              this.props.navigation.navigate("PDT");
              }}>
              <Image source={require('../../assets/period.png')} style={styles.cardImageSize} />
            <Text style={[typo.h4r]}>Period Tracker</Text>
            </Pressable>
          </CardHalfWidth>
          <CardHalfWidth bgColor={'white'} >
            <Pressable onPress={()=>{
              this.props.navigation.navigate("DDC")}}>
              <Image source={require('../../assets/pregnancytracker.png')} style={styles.cardImageSize} />
            <Text style={[typo.h4r]}>Pregnancy tracker</Text>
            </Pressable>
          </CardHalfWidth>
        </View>
        <View style={{width:Dimensions.get("window").width,height:250,backgroundColor:colors.theme}}>
        {this.state.posts.length>0?<FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CardHalfWidthNp bgColor={'white'}>
              <Pressable 
              onPress={()=>{
                this.setState({postTitle:item.title.rendered,postDetails:{html:"<p style='text-align: justify !important;width:350px'>"+item.content.rendered+"</p>"},postImage:item._embedded['wp:featuredmedia'][0].source_url});
                this.setState({singlePost:true});
              }}
              style={{height:220,width:180}}>
                {/* <Image source={{uri:item._embedded['wp:featuredmedia'][0].source_url}} style={styles.blogImageSize} /> */}
                {item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0] ? (
      // Display the featured image
      <Image source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }} style={styles.blogImageSize} />
    ) : (
      // Display the default image
      <Image source={{uri:'https://app.shohozseba.com/icons/favicon-128x128.png'}} style={styles.blogImageSize} />
    )}
                <Text style={[typo.h4r, { width: 100 }]}>{this.limitTitle(item.title.rendered)}</Text>
              </Pressable>
            </CardHalfWidthNp>
          )}
        />
:null}


         <CardModal title={this.state.postTitle} closeTitle={'Close'} visibility={this.state.singlePost} modalClose={this.handleModalClose}>
         <Pressable onPress={this.handleModalClose} style={{backgroundColor:colors.white,width:60,alignItems:'center',justifyContent:'center',height:40,borderTopRightRadius:15,borderBottomRightRadius:15,elevation:10,position:'absolute',top:10,left:0,zIndex:3}}>
            <AntDesign name="arrowleft" size={30} color={'#ccc'} />
        </Pressable>
          <Image source={{uri:this.state.postImage}} style={styles.fullImage} />
          <View style={[styles.fullImage,{backgroundColor:'rgba(0,0,0,0.3)',zIndex:2,position:'absolute',top:0,left:0,right:0}]}></View>
          <Text style={[typo.h1,{position:'absolute',top:150,left:20,color:'#fff',zIndex:200,marginRight:30}]}>{this.state.postTitle}</Text>
          <View style={{padding:10}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:Dimensions.get("window").height,paddingBottom: 500,}}>
            <RenderHtml
      contentWidth={400}
      source={this.state.postDetails}
    />
            </ScrollView>
          </View>
         </CardModal>
        </View>
        
      </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(History);

const styles = StyleSheet.create({
  fullImage:{
    width:'100%',
    height:300,
    marginBottom:20
  },
  container:{
    backgroundColor:'#fff',
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width,
  },
  cardImageSize:{
    height:60,
    width:60,
    alignSelf:'center',
    marginBottom:10
  },
  blogImageSize:{
    height:120,
    width:180,
    alignSelf:'center',
    marginBottom:10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
})
