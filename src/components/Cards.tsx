import React from 'react';
import { StyleSheet,View } from 'react-native';
import { colors } from '../constants/colors';
import { shadows } from '../ui/shadow';
import { sizes } from '../constants/sizes';

interface CardFullWidthProps {
  bgColor:String;
  children?: React.ReactNode;
}

export const CardFullWidth: React.FC<CardFullWidthProps> = ({  bgColor,children}) => {
  return (<View style={[styles.cardUi,{backgroundColor:bgColor},shadows.smallShadow]}>
    {children}
  </View>);
};
export const CardHalfWidth: React.FC<CardFullWidthProps> = ({  bgColor,children}) => {
  return (<View style={[styles.cardUiHalf,{backgroundColor:bgColor},shadows.smallShadow]}>
    {children}
  </View>);
};

const styles = StyleSheet.create({
    cardUi:{
        padding:10,
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    },
    cardUiHalf:{
        padding:10,
        width:'40%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    }
  });