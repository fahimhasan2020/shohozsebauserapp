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

export default class BMI extends Component<Props,State> {
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
      
      const heightInMeters = this.state.height / 100;
      const weightInKg = this.state.weight;
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      this.setState({ result: bmi.toFixed(2) });
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
        <Text style={[typo.h1,{marginTop:40,marginBottom:40}]}>BMI CALCULATOR</Text>
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
        <View style={row}>
          <CardHalfWidth bgColor={colors.white}>
          <Text style={typo.h4r}>Weight</Text>
          <View style={rowClose}>
          <Text style={typo.titler}>{this.state.weight}</Text><Text style={typo.h4r}>kg</Text>
        </View>
        <View style={row}>
        <PlusButton onPress={()=>{this.setState({weight:this.state.weight+1})}} />
          <MinusButton onPress={()=>{this.setState({weight:this.state.weight-1})}} />
        </View>
          </CardHalfWidth>
          <CardHalfWidth bgColor={colors.white}>
          <Text style={typo.h4r}>Age</Text>
          <View style={rowClose}>
          <Text style={typo.titler}>{this.state.age}</Text><Text style={typo.h4r}>years</Text>
        </View>
        <View style={row}>
          <PlusButton onPress={()=>{this.setState({age:this.state.age+1})}} />
          <MinusButton onPress={()=>{this.setState({age:this.state.age-1})}} />
        </View>
          </CardHalfWidth>
        </View>
        <View style={styles.footerButton}>
          <ThemeButton title='CALCULATE BMI' onPress={this.handlePress} loading={this.state.loading}  />
        </View>  
        <BasicModal title="Result" closeTitle={'Recalculate BMI'} visibility={this.state.modalVisible} modalClose={this.handleModalClose}>
        <CardFullWidth bgColor={colors.white}>
        
        {this.state.result > 25 ? <Text style={typo.h4r}>High</Text> :
  this.state.result > 18 ? <Text style={typo.h4r}>Normal</Text> :
  <Text style={typo.h4r}>Low</Text>}
        <View style={rowClose}>
          <Text style={typo.titler}>{this.state.result}</Text>
        </View>
        {this.state.result > 25 ? <Text style={typo.h4r}>Your BMI is high.There are few side effects.</Text> :
  this.state.result > 18 ? <Text style={typo.h4r}>Your BMI is regular. Kepp up good health.</Text> :
  <Text style={typo.h4r}>Your BMI is low. There are few side effects.</Text>}
        
        {this.state.result > 25 ? <FlatList
      data={highBmi}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 10 }}>•</Text>
          <Text>{item.data}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    /> :
  this.state.result > 18 ? null :
  <FlatList
  data={lowBmit}
  renderItem={({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginRight: 10 }}>•</Text>
      <Text>{item.data}</Text>
    </View>
  )}
  keyExtractor={item => item.id}
/>}
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
