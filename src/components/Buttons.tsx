import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import AntDesign from "react-native-vector-icons/AntDesign"

interface PrimaryButtonProps {
  title: string;
  loading:Boolean;
  onPress: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:colors.blue}]} onPress={onPress}>
        {loading?<ActivityIndicator size={'large'} color={'white'} />:<Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};
export const ThemeButton: React.FC<PrimaryButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:colors.theme}]} onPress={onPress}>
        {loading?<ActivityIndicator size={'large'} color={'white'} />:<Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};
export const PlusButton: React.FC<PrimaryButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonRound,{backgroundColor:colors.theme}]} onPress={onPress}>
        <AntDesign name="plus" color={colors.white} size={20} />
    </TouchableOpacity>
  );
};
export const MinusButton: React.FC<PrimaryButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonRound,{backgroundColor:colors.theme}]} onPress={onPress}>
        <AntDesign name="minus" color={colors.white} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonRound: {
    padding: 10,
    borderRadius: 20,
    justifyContent:'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

