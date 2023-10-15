import { View } from 'react-native';
import React, { useEffect } from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import useStore from '../zustand';

const NavigatorBase = () => {
  const { user } = useStore();

  return user.onBoarded ? <AppNavigator /> : <AuthNavigator />;
};

export default NavigatorBase;
