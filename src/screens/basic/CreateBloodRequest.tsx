import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,TextInput,ScrollView,Pressable,FlatList,ActivityIndicator,ToastAndroid } from 'react-native'
import StackHeader from '../../components/StackHeader'
import { colors } from '../../constants/colors'
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from "react-native-vector-icons/Entypo"
import { sizes } from '../../constants/sizes';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
class CreateBloodRequest extends Component {
    state = {
        userName:'',
        lat:'',
        show:false,
        showDate:false,
        lng:'',
        userId:'',
        mode:'date',
        group:'',
        bloodGroups:['A+','A-','o+','o-','AB+','AB-','B+','B-'],
        phone:'',
        dateValue:'',
        timeValue:'',
        donation_time:'',
        details:'',
        location_details:'',
        newDate:new Date(),
        locations:[]
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log('time',currentDate);
        const dateObject = new Date(currentDate);
        const hours = dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes();
        let formattedHours = hours % 12;
        if (formattedHours === 0) {
        formattedHours = 12;
        }
        const ampm = hours < 12 ? "AM" : "PM";
        const timeString = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
        console.log(timeString);
        this.setState({show:false,donation_time:timeString,showDate:true});
      };
    onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log('date',currentDate);
        const dateObject = new Date(selectedDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        this.setState({showDate:false,donation_time:this.state.donation_time+', '+formattedDate});
      };
    
    getLocationName = async(lat = '23.8102668', lng = '90.4313219', apiKey = 'AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg') => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.status === 'OK' && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            console.log(address);
          } else {
            throw new Error('Unable to retrieve location name.');
          }
        } catch (error) {
          console.error('Error fetching location name:', error);
          return null;
        }
      }
    setNewCoordinate = async (placeId) => {
        const GOOGLE_APIKEY = 'AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg';
        let URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_APIKEY}&place_id=${placeId}`;
        try {
          const resp = await fetch(URL);
          const jsonData = await resp.json();
          const { lat, lng } = jsonData.result.geometry.location;
          console.log(jsonData.result.formatted_address);
          this.setState({lat:lat,lng:lng,location_details:jsonData.result.formatted_address});
        } catch (error) {
          console.error('Error fetching location details:', error);
        }
      }
    autocomplete = async (text) => {
        const GOOGLE_APIKEY = 'AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg';
        let URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=' + GOOGLE_APIKEY +
          '&input=' + text + '&radius=1000';
        const resp = await fetch(URL);
        const jsonData = await resp.json();
        this.setState({locations:jsonData.predictions});
      }
    
    showMode = (currentMode:String) => {
        this.setState({mode:currentMode,show:true});
      };
    createBlood = async()=>{
        this.props.changeLoading(true);
        if(this.state.userName === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Name required",ToastAndroid.SHORT);
        }
        if(this.state.phone === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Phone number required",ToastAndroid.SHORT);
        }
        if(this.state.location_details === '' && this.state.lat === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Invalid address",ToastAndroid.SHORT);
        }
        if(this.state.details === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Set proper reason for blood request",ToastAndroid.SHORT);
        }
        if(this.state.group === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Blood group required",ToastAndroid.SHORT);
        }
        if(this.state.donation_time === ''){
            this.props.changeLoading(false);
            return ToastAndroid.show("Donation time required",ToastAndroid.SHORT);
        }
        const userId = await AsyncStorage.getItem("id");
        var requestOptions = {
        method: 'POST',
        headers: {"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({
            userId:parseInt(userId),
            group:this.state.group,
            phone:this.state.phone,
            lat:this.state.lat,
            lng:this.state.lng,
            donation_time:this.state.donation_time,
            userName:this.state.userName,
            details:this.state.details,
            location_details:this.state.location_details
        }),
        };
        fetch(this.props.host+"blood/request", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            this.props.changeLoading(false);
            ToastAndroid.show("Blood request created successfully",ToastAndroid.SHORT);
            if(result.subscribers.length>0){
                this.props.navigation.navigate('DonorListMap',{subscribers:result.subscribers,lat:this.state.lat,lng:this.state.lng})
            }else{
                this.props.navigation.goBack();
            }
        })
        .catch(error => {console.log('error', error);this.props.changeLoading(false);ToastAndroid.show("Failed to create blood request",ToastAndroid.SHORT)});
    }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StackHeader navigation={this.props.navigation}  />
        <Text style={styles.title}>Create Blood request</Text>
        {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.newDate}
          mode={'time'}
          is24Hour={false}
          onChange={this.onChange}
        />
      )}
        {this.state.showDate && (
        <DateTimePicker
          testID="dateTimePickers"
          value={this.state.newDate}
          mode={'date'}
          is24Hour={false}
          onChange={this.onChangeDate}
        />
      )}
        <View style={styles.content}>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000',fontSize:10,marginBottom:15}}>Enter patients full name</Text>
                <TextInput placeholderTextColor={'#adadad'} value={this.state.userName} placeholder='Enter patients name' onChangeText={(value)=>this.setState({userName:value})} style={styles.inputCommon} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000',fontSize:10,marginBottom:15}}>Enter patients phone number</Text>
                <TextInput placeholderTextColor={'#adadad'} value={this.state.phone} placeholder='Enter patients phone number' keyboardType='numeric' onChangeText={(value)=>this.setState({phone:value})} style={styles.inputCommon} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000',fontSize:10,marginBottom:15}}>Enter address</Text>
                <TextInput placeholderTextColor={'#adadad'} value={this.state.location_details} placeholder='Enter address' keyboardType='default' onChangeText={(value)=>{this.setState({location_details:value});this.autocomplete(value)}} style={styles.inputCommon} />
                <FlatList
          contentContainerStyle={{paddingTop:20,paddingBottom:10}}
          data={this.state.locations}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => (<Pressable onPress={() => { this.setNewCoordinate(item.place_id);this.setState({locations:[]}); }} style={{ width: '80%', alignSelf: 'flex-start', borderRadius: 10, height: 60, backgroundColor: 'white', padding: 10, elevation: 10, justifyContent: 'center', marginBottom: 10 }}>
            <Text style={{color:'black'}}>{item.description}</Text>
          </Pressable>)}
        />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000',fontSize:10,marginBottom:15}}>Blood request reason</Text>
                <TextInput multiline={true} placeholderTextColor={'#adadad'} value={this.state.details} placeholder='Explain blood request reason' keyboardType='default' onChangeText={(value)=>this.setState({details:value})} style={[styles.inputCommon,{height:200,flexWrap:'wrap'}]} textAlignVertical='top' />
            </View>
            <View style={styles.inputContainer}>
                <SelectDropdown
                    buttonStyle={{backgroundColor:'#fff',borderWidth:1,borderColor:'#ccc',borderRadius:15,marginBottom:15,width:'90%'}}
                    data={this.state.bloodGroups}
                    onSelect={(value, index) => this.setState({group:value})}
                    defaultButtonText="Blood group"
                    showsVerticalScrollIndicator={false}
                    renderDropdownIcon={()=>(<Entypo name="chevron-down" size={20} color={'#000'} />)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000',fontSize:10,marginBottom:15}}>Set blood donation time</Text>
                <Pressable onPress={async()=>{
                    await this.setState({donation_time:''});
                    await this.showMode('datetime');
                }} style={{width:'90%',backgroundColor:'white',borderRadius:10,elevation:3,height:50,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#ccc'}}>{this.state.donation_time === ''?'EG: 9:23 PM, 26 Aug, 2023':this.state.donation_time}</Text></Pressable>
            </View>
            <Pressable onPress={()=>{this.createBlood()}} style={{width:'85%',marginTop:20,marginLeft:20,padding:10,backgroundColor:'blueviolet',elevation:3,alignItems:'center',justifyContent:'center',borderRadius:10}}><Text style={{color:'white'}}>Request for blood</Text></Pressable>
        </View>
      </ScrollView>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CreateBloodRequest);

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        minHeight:sizes.fullHeight,
        paddingBottom:100
    },
    inputCommon:{
        width:'90%',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:10,
        paddingLeft:15,
        color:'#000'
    },
    inputContainer:{
        marginLeft:20,
        marginTop:20
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
