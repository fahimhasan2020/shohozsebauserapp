import React, { Component } from 'react'
import { Text, View,StatusBar,Image,ToastAndroid } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import { sizes } from '../../constants/sizes';
import { mapdesign, randomCoordinates } from '../../ui/mapdesign';
import StackHeaderFixed from '../../components/StackHeaderFixed';
import {connect} from "react-redux"
class NearestDoctors extends Component {
  componentDidMount(): void {
    setTimeout(()=>{
        this.props.changeLoading(false);
        ToastAndroid.show("No doctors available in this area",ToastAndroid.SHORT);
    },2000)
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'green'}}>
        <StatusBar backgroundColor={'transparent'}/>
        <StackHeaderFixed navigation={this.props.navigation} />
        <MapView
          style={{height:sizes.windowHeight+40,width:sizes.windowWidth}}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapdesign}
/>
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
        host: state.auth.host,
        lat:state.auth.lat,
        lng:state.auth.lng,
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(NearestDoctors);
