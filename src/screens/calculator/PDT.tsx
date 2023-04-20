import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar,FlatList} from 'react-native'
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
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
interface Props {

}
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
  lastPeriodStartDate:Date;
  listOfDays:Object
}

export default class App extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      maleCardBg:colors.white,
      feMaleCardBg:colors.white,
      maleCardTextBg:colors.greyDeep,
      feMaleCardTextBg:colors.greyDeep,
      lastPeriodStartDate:new Date(),
      min:50,
      max:250,
      height:80,
      age:20,
      weight:7,
      modalVisible:true,
      gender:'',
      result:'',
      selected:'',
      listOfDays:{}
    };
  }
  componentDidMount(): void {
      RNBootSplash.hide(); 
     
  }

  showDatePicker = () =>{
    DateTimePickerAndroid.open({
      value: this.state.lastPeriodStartDate,
      onChange:(event,selectedDate)=>{
        const currentDate = selectedDate;
        this.setState({lastPeriodStartDate:selectedDate});
      },
      mode: 'date',
    });
  }

  handlePress = () =>{
    this.setState({loading:true});
    setTimeout(()=>{
      const selectedDays = {};
      let currentDate = new Date();
      let daysSinceLastPeriodStart = Math.floor((currentDate - this.state.lastPeriodStartDate) / (1000 * 60 * 60 * 24));
      let nextPeriodStart = new Date(this.state.lastPeriodStartDate);
      nextPeriodStart.setMonth(currentDate.getMonth() + 1);
      while (Object.keys(selectedDays).length < 90) {
        let nextMonthStart = new Date(nextPeriodStart.getFullYear(), nextPeriodStart.getMonth(), 1);
        let nextMonthEnd = new Date(nextPeriodStart.getFullYear(), nextPeriodStart.getMonth() + 1, 0);
        let nextMonthDays = nextMonthEnd.getDate();
        let periodStartDay = Math.max(daysSinceLastPeriodStart + 1, 1);
        let periodEndDay = Math.min(daysSinceLastPeriodStart + this.state.weight, this.state.age);
        for (let i = periodStartDay; i <= periodEndDay; i++) {
          let nextSelectedDay = new Date(nextPeriodStart.getFullYear(), nextPeriodStart.getMonth(), i);
          let nextSelectedDayFormatted = `${nextSelectedDay.getFullYear()}-${String(nextSelectedDay.getMonth() + 1).padStart(2, '0')}-${String(nextSelectedDay.getDate()).padStart(2, '0')}`;
          selectedDays[nextSelectedDayFormatted] = { selected: true, selectedColor: 'red' };
        }
        for (let i = periodEndDay + 1; i <= nextMonthDays; i++) {
          let nextSelectedDay = new Date(nextPeriodStart.getFullYear(), nextPeriodStart.getMonth(), i);
          let nextSelectedDayFormatted = `${nextSelectedDay.getFullYear()}-${String(nextSelectedDay.getMonth() + 1).padStart(2, '0')}-${String(nextSelectedDay.getDate()).padStart(2, '0')}`;
          selectedDays[nextSelectedDayFormatted] = { selected: true, selectedColor: 'blue' };
        }
        daysSinceLastPeriodStart += this.state.age;
        if (daysSinceLastPeriodStart >= 30) {
          nextPeriodStart.setMonth(nextPeriodStart.getMonth() + 1);
          daysSinceLastPeriodStart -= 30;
        }
      }
      this.setState({listOfDays:selectedDays});
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
        <Text style={[typo.h1,{marginTop:40,marginBottom:10}]}>Period Tracker</Text>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.p}>Select first day at your last period cycle</Text>
        <Pressable onPress={()=>{this.showDatePicker()}} style={{backgroundColor:colors.theme,padding:10,margin:10,borderRadius:5,elevation:10}}><Text style={{color:colors.white}}>{this.state.lastPeriodStartDate.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
})}</Text></Pressable>
        </CardFullWidth>
        <View style={row}>
          <CardHalfWidth bgColor={colors.white}>
          <Text style={typo.h4r}>Total period cycle</Text>
          <View style={rowClose}>
          <Text style={typo.titler}>{this.state.age}</Text><Text style={typo.h4r}>Days</Text>
        </View>
        <View style={row}>
          <PlusButton onPress={()=>{this.setState({age:this.state.age+1})}} />
          <MinusButton onPress={()=>{this.setState({age:this.state.age-1})}} />
        </View>
          </CardHalfWidth>
          <CardHalfWidth bgColor={colors.white}>
          <Text style={typo.h4r}>Total period days</Text>
          <View style={rowClose}>
          <Text style={typo.titler}>{this.state.weight}</Text><Text style={typo.h4r}>Days</Text>
        </View>
        <View style={row}>
          <PlusButton onPress={()=>{this.setState({weight:this.state.weight+1})}} />
          <MinusButton onPress={()=>{this.setState({weight:this.state.weight-1})}} />
        </View>
          </CardHalfWidth>
        </View>
        
        <View style={styles.footerButton}>
          <ThemeButton title='SHOW PERIOD CYCLE' onPress={this.handlePress} loading={this.state.loading}  />
        </View>  
        <BasicModal title="Result" closeTitle={'Recalculate PTC'} visibility={this.state.modalVisible} modalClose={this.handleModalClose}>
        <CardFullWidth bgColor={colors.white}>
        <Text style={typo.h4r}>Period cycle</Text>
        <View style={rowClose}>
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
              markedDates={this.state.listOfDays}
    />
        </View>     
        </CardFullWidth>
        <CardFullWidth bgColor={colors.white}>
          <View style={[row,{marginBottom:10}]}><View style={{backgroundColor:'red',padding:10,borderRadius:10,elevation:10,width:20,height:20}}></View><Text style={typo.p}>Red dots indicates the days of period.</Text></View>
          <View style={row}><View style={{backgroundColor:'blue',padding:10,borderRadius:10,elevation:10,width:20,height:20}}></View><Text style={typo.p}>Blue dots indicates the days of getting pregnant.</Text></View>
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
