import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useStore from '../../zustand';
import { styles } from './SplashScreen.styles';
import Typography from '../../components/Typography/Typography';

const SplashScreen = () => {
  const { user } = useStore();
  return (
    <View style={styles.container}>
      <Typography>SplashScreen</Typography>
    </View>
  );
};

export default SplashScreen;
