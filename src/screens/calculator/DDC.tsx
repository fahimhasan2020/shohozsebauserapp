import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar,FlatList,ScrollView,Dimensions,Image} from 'react-native'
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

import {Calendar, LocaleConfig} from 'react-native-calendars';
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
  result:String;
  selected:String;
}

export default class DDC extends Component<Props,State> {
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
      result:'',
      selected:''
    };
  }
  componentDidMount(): void {
      RNBootSplash.hide(); 
  }

  handlePress = () =>{
    this.setState({loading:true});
    setTimeout(()=>{
      const lastPeriodDate = new Date(this.state.selected);
      const lastPeriodEndDate = new Date(lastPeriodDate.getTime() + (this.state.weight - 1) * 86400000);
      const deliveryDate = new Date(lastPeriodEndDate.getTime() + 280 * 86400000);
      const formattedDeliveryDate = deliveryDate.toISOString().substring(0, 10);
      this.setState({result:formattedDeliveryDate});
      console.log(this.state.result);
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
      <View style={styles.mainContainer}>
        
        <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle={'dark-content'} translucent={false} backgroundColor={colors.white} />
        <Image source={require('../../assets/bgoverlay.png')} style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get("window").width,position:'absolute',top:0,left:0,opacity:0.2}} />
        <StackHeader navigation={this.props.navigation} />
        <Text style={[typo.h1,{marginTop:40,marginBottom:10}]}>DELIVERY DATE CALCULATOR</Text>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.h4r}>Select first day at your last period cycle</Text>
        <Calendar
            theme={{
              monthTextColor:colors.white,
              arrowColor: colors.white,
              backgroundColor: colors.themeDeep,
              calendarBackground: colors.themeDeep,
              textSectionTitleColor: colors.white,
              selectedDayBackgroundColor: colors.orange,
              selectedDayTextColor: '#ffffff',
              todayTextColor: colors.white,
              dayTextColor: colors.white,
              textDisabledColor: colors.grey}}
      onDayPress={day => {
        this.setState({selected:day.dateString});
        console.log(this.state.selected);
      }}
      markedDates={{
        [this.state.selected]: {selected: true, selectedDotColor: colors.theme}
      }}
    />
        </CardFullWidth>
        <CardFullWidth bgColor={colors.white}>
          <Text style={typo.h4r}>Total period cycle</Text>
          <View style={rowClose}>
          <Text style={typo.titler}>{this.state.age}</Text><Text style={typo.h4r}>Days</Text>
        </View>
        <View style={row}>
          <PlusButton onPress={()=>{this.setState({age:this.state.age+1})}} />
          <MinusButton onPress={()=>{this.setState({age:this.state.age-1})}} />
        </View>
          </CardFullWidth>
        <View style={styles.footerButton}>
          <ThemeButton title='PREDICT DELIVERY DATE' onPress={this.handlePress} loading={this.state.loading}  />
        </View>  
        <BasicModal title="Result" closeTitle={'Recalculate DDC'} visibility={this.state.modalVisible} modalClose={this.handleModalClose}>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.h4r}>Your Possible Delivery date is</Text>
        <View style={rowClose}>
          <Text style={typo.titler}>{this.state.result}</Text>
        </View>     
        </CardFullWidth>
          </BasicModal>      
      </ScrollView></View>
      
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:colors.white
  },
  container:{
    minHeight:Dimensions.get("window").height,
    minWidth:Dimensions.get("window").width
  },
  footerButton:{
    width:sizes.fullWidth,
  },
  sliderTrack:{
    backgroundColor:colors.theme,
    height:6,
    borderColor:colors.theme,
    margin:0,
    padding:0
  }
})
