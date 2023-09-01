import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MapView,{Marker} from 'react-native-maps';
import StackHeaderFixed from './StackHeaderFixed';
import { sizes } from '../constants/sizes';
import { mapdesign } from '../ui/mapdesign';
export class DonorListMap extends Component {
  state = {
    latitude:'',
    longitude:''
  }
  render() {
    const {donorList,lat,lng} = this.props.route.params;
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <MapView
          style={{height:sizes.fullHeight+40,width:sizes.fullWidth}}
          initialRegion={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapdesign}
>
{/* <Marker coordinate={{  latitude: this.props.lat,
            longitude: this.props.lng, }}
            title="Home Address"
            /> */}
</MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorListMap)
