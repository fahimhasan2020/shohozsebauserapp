import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {Provider} from "react-redux"
import RNBootSplash from "react-native-bootsplash";
import Index from "./src/navigation/Index"
import store from "./src/store/store"

export default class App extends Component {
  componentDidMount =()=>{
    RNBootSplash.hide({ fade: true });
  }
  render() {
    return (
      <Provider store={store}> 
          <Index />
      </Provider>
    )
  }
}