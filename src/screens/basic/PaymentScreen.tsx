import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

class PaymentScreen extends Component {
  componentDidMount(): void {
      this.props.changeLoading(true);
  }
  handleWebViewNavigationStateChange  = (event) =>{
    console.log('message found',event);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView  onNavigationStateChange={this.handleWebViewNavigationStateChange} onLoad={()=>this.props.changeLoading(false)} source={{ uri: this.props.route.params.uri }} style={{ flex: 1 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    }
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch =>{
  return{
    changeLoading : (value) => {dispatch({type:'Loading',loading: value})},
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
