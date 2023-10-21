import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native';
import React from 'react';
import fonts from '../../constants/fonts';

interface TypographyProps {
  textStyles?: TextStyle | TextStyle[];
  title?: string;
  children?: any;
  options?: TextProps;
}

const Typography = (props: TypographyProps) => {
  return (
    <Text {...props.options} style={[styles.baseTextStyles, props.textStyles]}>
      {props.title ?? props.children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  baseTextStyles: {
    fontFamily: fonts.montserrat.regular,
    color: '#000',
    fontSize: 16,
  },
});
