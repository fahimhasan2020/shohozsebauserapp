import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

export class CallScreen extends Component {
  static propTypes = {
    prop: PropTypes
  }

  getRandomArbitrary =(min, max) => {
    const value =  Math.ceil(Math.random() * (max - min) + min);
    return value.toString();
  }

  render() {
    return (
      <View style={styles.container}>
       <ZegoUIKitPrebuiltCall
                appID={1776363018}
                appSign={'3a4c2e166fc1f7d0dca40e76b8777fa2df07d8fa8237e58f2c11c72d07470646'}
                userID={this.getRandomArbitrary(11111,99999)} 
                userName={'Abul'}
                callID={'112256'} 
                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { this.props.navigation.navigate('Home') },
                    onHangUp: () => { this.props.navigation.navigate('Home') },
                }}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    }
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CallScreen)
