import {Modal,View,Text,Alert,ToastAndroid,Pressable} from "react-native"
import React, { Component } from 'react'
import { sizes } from "../constants/sizes";
import { colors } from "../constants/colors";
import { typo } from "../ui/typo";
import { row } from "../ui/row";

interface ModalProps{
title:String;
children?: React.ReactNode;
visibility:Boolean;
modalClose: () => void;
closeTitle:String;
}

export const BasicModal: React.FC<ModalProps> = ({  visibility = false ,title,children,modalClose,closeTitle}) => {
    return (<Modal
        animationType="slide"
        transparent={false}
        visible={visibility}
        onRequestClose={modalClose}
      >
        <View style={{ marginTop: 22,flex:1}}>
          <View style={{flex:1}}>
            <Text style={typo.h1}>{title}</Text>
            {children}
            <View style={[{position:'absolute',bottom:0,left:0,width:sizes.fullWidth,},row]}>
              <Pressable
            onPress={modalClose}
            style={{width:sizes.windowWidthHalf,backgroundColor:colors.theme,padding:10,elevation:10,alignItems:'center',}}><Text style={{color:colors.white}}>{closeTitle}</Text></Pressable>
              <Pressable
            onPress={modalClose}
            style={{width:sizes.windowWidthHalf,backgroundColor:colors.black,padding:10,elevation:10,alignItems:'center',}}><Text style={{color:colors.white}}>Close</Text></Pressable>
            </View>
            
          </View>
        </View>
      </Modal>);
  };
export const CardModal: React.FC<ModalProps> = ({  visibility = false,children,modalClose}) => {
    return (<Modal
        animationType="slide"
        transparent={false}
        visible={visibility}
        onRequestClose={modalClose}
      >
        <View style={{ marginTop: 22,flex:1}}>
          <View style={{flex:1}}>
            {children}            
          </View>
        </View>
      </Modal>);
  };
