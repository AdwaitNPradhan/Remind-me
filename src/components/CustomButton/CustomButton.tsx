import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

interface CustomButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  buttonStyles?: ViewStyle;
  textStyles?: TextStyle;
  buttonOptions?: PressableProps;
  textOptions?: TextProps;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <Pressable
      {...props.buttonOptions}
      disabled={props.disabled}
      style={[styles.buttonStyles, props.buttonStyles]}
      onPress={props.onPress}>
      <Text
        {...props.textOptions}
        style={[styles.textStyles, props.textStyles]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: colors.heavyBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.montserrat.bold,
    letterSpacing: 0.8,
  },
});
