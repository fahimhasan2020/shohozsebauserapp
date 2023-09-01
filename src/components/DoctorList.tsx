import React, { Component } from 'react'
import { View, Text,FlatList,Pressable,Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"

export class DoctorList extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { doctors } = this.props;
    return (
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width:'100%',paddingBottom:20}}
        data={doctors}
        renderItem={({item,index})=>(<View style={{width:'90%',alignSelf:'center',padding:10,height:230,backgroundColor:'white',borderRadius:5,elevation:3,flexDirection:'row'}}>
          <View>
            <Image source={{uri:item.profile_picture}} style={{height:50,width:50,borderRadius:5}} />
            <Text style={{fontSize:9,color:'#adadad',fontWeight:'bold',marginTop:5}}>{item.experience}  + years </Text>
            <Text style={{fontSize:8,color:'#000',fontWeight:'bold'}}>Experience</Text>
          </View>
          <View style={{paddingLeft:20,width:'90%'}}>
            <View style={{backgroundColor:item.online === "1"?"blueviolet":"grey",padding:3,width:30,borderRadius:5,position:'absolute',right:15,top:0}}>
              <Text style={{color:'white',fontSize:8}}>{item.online === "1"?"Online":"Offline"}</Text>
            </View>
          <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>Dr. {item.first_name} {item.last_name}</Text>
          <Text style={{fontSize:11,color:'#000',fontWeight:'bold'}}>{item.degrees}</Text>
          
          <Text style={{fontSize:12,color:'blueviolet',opacity:0.5,marginTop:20}}>{item.department_name}</Text>
          <Text style={{fontSize:11,color:'#000',opacity:0.5,marginTop:30}}>Details</Text>
          <Text style={{fontSize:11,color:'#000',opacity:0.5}}>{item.description.slice(0,100)}</Text>
          <Pressable style={{marginTop:20,flexDirection:'row',backgroundColor:'blueviolet',elevation:10,width:170,padding:8,borderRadius:10}}>
            <AntDesign name="videocamera" size={14} color={'white'} style={{opacity:0.5}} />
            <Text style={{fontSize:11,color:'white',opacity:0.5,marginLeft:10}}>Call for video consultation</Text>
          </Pressable>
          
          </View>
        </View>)}
        keyExtractor={(item,index)=>index.toString()}
        />
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
