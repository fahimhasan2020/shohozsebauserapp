import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import IonIcons from "react-native-vector-icons/Ionicons"
import { shadows } from '../ui/shadow';
import { sizes } from '../constants/sizes';
import { typo } from '../ui/typo';

interface IconOnlyCardButtonProps {
  name:String;
  title:String;
  bgColor:String;
  fgColor:String;
  onPress: () => void;
}

export const IconOnlyCardButton: React.FC<IconOnlyCardButtonProps> = ({  onPress,name,title,bgColor,fgColor }) => {
  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:bgColor},shadows.smallShadow]} onPress={onPress}>
        <IonIcons name={name} size={60} color={fgColor} />
        <Text style={[typo.p,{color:fgColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      width:sizes.windowWidthHalf,
      height:sizes.windowWidthHalf,
      alignItem:'center',
      justifyContent:'center',
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });