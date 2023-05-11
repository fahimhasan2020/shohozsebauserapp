import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Modal,Pressable
} from 'react-native';

import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ClientRole,
  ChannelProfile,
} from 'react-native-agora';



import requestCameraAndAudioPermission from '../../components/Permission';
import styles from '../../components/Style';

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
 const token="007eJxTYPh+S9pT+GdxYbOk29uim7VB9sfv6K5/wS+mIfndJil63RcFBgtTSxMTU1PDlOTkZBPLRDMLcyMDs8TUJCA/LdncLPmxSUBKQyAjQ8yXE0yMDBAI4rMx5GbmZSRWMTAAAKrdITM=";
 const appId = '85944551dccc49a687206aebdccfc76c';
 const channelName = 'minhaz';
export  class CallScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isHost: true,
      joinSucceed: false,
      peerIds: [],
      rating:3,
      comments:'',
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount = async()=> {
    await this.init();
    setTimeout(()=>{this.startCall();},5000);
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    console.log('1');
    this._engine = await RtcEngine.create(appId);
    console.log('2');
    await this._engine.enableVideo();
    console.log('4');
    await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine?.setClientRole(
      this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
    );
    console.log('5');

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name toggleRoll
   * @description Function to toggle the roll between broadcaster and audience
   */
  toggleRoll = async () => {
    // Join Channel using null token and channel name
    this.setState(
      {
        isHost: !this.state.isHost,
      },
      async () => {
        await this._engine?.setClientRole(
          this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
        );
      }
    );
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(token, channelName, null, 2882341273);
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    setTimeout(()=>{
       this.setState({ peerIds: [], joinSucceed: false });
       this.props.navigation.navigate('Home');
    },3000)
  };

  render() {
    return(
      <View style={styles.max}>
          <View style={styles.max}>
          <TouchableOpacity
                      onPress={()=>{
                        //this.setState({modalVisible:true});
                        this.endCall()
                      }}
                      style={styles.buttonClone}>
                        <MaterialIcons name="phone-missed" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.buttonCloneChat}>
                        <MaterialIcons name="chat" size={24} color="black" />
                  </TouchableOpacity>
              {this._renderVideos()}
          </View>
      </View>
  );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        {this.state.isHost ? (
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          <></>
        )}
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={styles.remoteContainerContent}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}

const mapDispatchToProps = dispatch => {
  return{
      changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
      changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
  };

};
const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      userId: state.auth.userId,
      email:state.auth.email,
      agoraToken:state.auth.agoraToken
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(CallScreen);


