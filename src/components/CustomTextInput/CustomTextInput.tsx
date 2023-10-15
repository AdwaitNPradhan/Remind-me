import { StyleSheet, TextInputProps } from 'react-native';
import React from 'react';
import fonts from '../../constants/fonts';
import { TextInput } from 'react-native-gesture-handler';

interface CustomTextInputProps extends TextInputProps {}

const CustomTextInput = (props: CustomTextInputProps) => {
  return <TextInput {...props} style={[styles.baseTextStyles, props.style]} />;
};

export default CustomTextInput;

const styles = StyleSheet.create({
  baseTextStyles: {
    backgroundColor: '#ffffff',
    padding: 6,
    paddingHorizontal: 12,

    borderRadius: 12,
    width: '100%',
    fontSize: 20,
    color: '#000',
    fontFamily: fonts.montserrat.regular,
    marginBottom: 12,
  },
});
