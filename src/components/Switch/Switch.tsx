import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Switch.styles';
import Typography from '../Typography/Typography';

type TProps = {
  value: boolean,
  onChange: () => void,
  onColor?: string,
  offColor?: string,
  label?: string,
  labelStyle?: any,
};

const Switch: React.FC<TProps> = ({
  value,
  onChange,
  onColor = 'green',
  offColor = 'grey',
  label = '',
  labelStyle,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    value && setIsEnabled(value);
  }, [value]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange();
  };

  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [-0.2, 0.9],
    outputRange: [0, 20],
  });

  const color = value ? onColor : offColor;

  animatedValue.setValue(value ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: value ? 1 : 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      {!!label && (
        <Typography textStyles={[styles.label, labelStyle]}>{label}</Typography>
      )}

      <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
        <View style={[styles.toggleContainer, { backgroundColor: color }]}>
          <Animated.View
            style={[styles.toggleWheelStyle, { marginLeft: moveToggle }]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Switch;
