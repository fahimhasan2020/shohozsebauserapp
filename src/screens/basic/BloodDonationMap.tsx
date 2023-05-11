import React, { Component } from 'react'
import { Text, View,StatusBar,Image } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import MapView,{Marker} from 'react-native-maps';
import { sizes } from '../../constants/sizes';
import { mapdesign, randomCoordinates } from '../../ui/mapdesign';
export default class BloodDonationMap extends Component {
  componentDidMount(): void {
    RNBootSplash.hide(); 
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'green'}}>
        <StatusBar  translucent={true} backgroundColor={'transparent'}/>
        <MapView
          style={{height:sizes.windowHeight+40,width:sizes.windowWidth}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapdesign}
>
{randomCoordinates.map((marker, index) => (<Marker
  coordinate={marker}
  key={index}
  title={"Sujon"}
  >
       <Image source={require('../../assets/donor.png')} style={{height:30,width:30}} />
    </Marker>))}

</MapView>
      </View>
    )
  }
}
