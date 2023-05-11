import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar,FlatList,Image,Dimensions} from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import {ThemeButton,PlusButton,MinusButton} from "../../components/Buttons"
import { colors } from '../../constants/colors';
import { sizes } from '../../constants/sizes';
import {IconOnlyCardButton} from "../../components/CardButtonIcons"
import { row,rowClose } from '../../ui/row';
import { typo } from '../../ui/typo';
import { BasicModal } from '../../components/Modals';
import {CardFullWidth,CardHalfWidth} from "../../components/Cards"
import Slider from "react-native-a11y-slider";
import StackHeader from '../../components/StackHeader';
interface Props {

}

const highBmi = [
  {id:1,data:'High blood pressure'},
  {id:2,data:'High cholesterol'},
  {id:3,data:'Dayabetes'},
  {id:4,data:'Heart problem'},
  {id:5,data:'Increase of stroke probability'},
  {id:6,data:'Golblader stone'},
  {id:7,data:'Psychological problems'},
];

const lowBmit = [
  {id:1,data:'Reduction of immunity system'},
  {id:2,data:'Respiratory problem'},
  {id:3,data:'Digestive system problem'},
  {id:4,data:'Cancer'},
  {id:5,data:'Bone loss problem'},
];

interface State {
  loading:Boolean;
  maleCardBg:String;
  feMaleCardBg:String;
  maleCardTextBg:String;
  feMaleCardTextBg:String;
  min:Number,
  max:Number,
  height:Number,
  weight:Number,
  age:Number,
  modalVisible:Boolean,
  gender:String;
  result:Number;
}

export default class IBW extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      maleCardBg:colors.white,
      feMaleCardBg:colors.white,
      maleCardTextBg:colors.greyDeep,
      feMaleCardTextBg:colors.greyDeep,
      min:50,
      max:250,
      height:80,
      age:20,
      weight:40,
      modalVisible:false,
      gender:'',
      result:0
    };
  }
  componentDidMount(): void {
      RNBootSplash.hide(); 
  }

  handlePress = () =>{
    this.setState({loading:true});
    setTimeout(()=>{
      const { gender, height } = this.state;
      let ibw = 0;
      if (gender === 'male') {
        ibw = 50 + 0.91 * (height - 152);
      } else if (gender === 'female') {
        ibw = 45.5 + 0.91 * (height - 152);
      }
      this.setState({ result: ibw });
      this.setState({loading:false,modalVisible:true});
    },3000);
  }
  handleModalClose = () =>{
    this.setState({modalVisible:false});
  }
  handlePressCard = (gender) =>{
  gender === 'male'?this.setState({gender:'male',maleCardTextBg:colors.white,feMaleCardTextBg:colors.greyDeep,maleCardBg:colors.theme,feMaleCardBg:colors.white}):this.setState({gender:'female',maleCardTextBg:colors.greyDeep,feMaleCardTextBg:colors.white,maleCardBg:colors.white,feMaleCardBg:colors.theme});
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} translucent={false} backgroundColor={colors.white} />
        <Image source={require('../../assets/bgoverlay.png')} style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get("window").width,position:'absolute',top:0,left:0,opacity:0.2}} />
        <StackHeader navigation={this.props.navigation} />
        <Text style={[typo.h1,{marginTop:40,marginBottom:40}]}>IBW CALCULATOR</Text>
        <View style={[row]}>
          <IconOnlyCardButton fgColor={this.state.maleCardTextBg} bgColor={this.state.maleCardBg} title="Male" onPress={()=>{this.handlePressCard('male')}} name="male" />
          <IconOnlyCardButton fgColor={this.state.feMaleCardTextBg} bgColor={this.state.feMaleCardBg} title="Female" onPress={()=>{this.handlePressCard('female')}} name="female" />
        </View>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.h4r}>Height</Text>
        <View style={rowClose}>
          <Text style={typo.titler}>{this.state.height}</Text><Text style={typo.h4r}>cm</Text>
        </View>
        <Slider markerColor={colors.theme} selectedTrackStyle={styles.sliderTrack} trackStyle={styles.sliderTrack} min={this.state.min} showLabel={false} max={this.state.max} values={this.state.height} onChange={(value:Number)=>{this.setState({height:value})}} />
        </CardFullWidth>
        <View style={styles.footerButton}>
          <ThemeButton title='CALCULATE IBW' onPress={this.handlePress} loading={this.state.loading}  />
        </View>  
        <BasicModal title="Result" closeTitle={'Recalculate IBW'} visibility={this.state.modalVisible} modalClose={this.handleModalClose}>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.h4r}>Your IBW</Text>
        <View style={rowClose}>
          <Text style={typo.titler}>{Math.ceil(this.state.result)} Kg</Text>
        </View>     
        </CardFullWidth>
          </BasicModal>      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  footerButton:{
    position:'absolute',
    width:sizes.fullWidth,
    bottom:0,
    left:0
  },
  sliderTrack:{
    backgroundColor:colors.theme,
    height:6,
    borderColor:colors.theme,
    margin:0,
    padding:0
  }
})
