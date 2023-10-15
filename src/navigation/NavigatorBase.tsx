import React, { useEffect } from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import useStore from '../zustand';

const NavigatorBase = () => {
  const { user } = useStore();
  useEffect(() => {
    useStore.persist.setOptions({ skipHydration: true });
  }, []);

  return user.onBoarded ? <AppNavigator /> : <AuthNavigator />;
};

export default NavigatorBase;
