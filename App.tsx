import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/DevScreen/DevScreen';
import CodePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorBase from './src/navigation/NavigatorBase';
import { PaperProvider } from 'react-native-paper';
import { CheckForPermissions } from './src/utils/GetPermissions';

const App = () => {
  useEffect(() => {
    CheckForPermissions();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <StatusBar barStyle={'light-content'} />
            <NavigatorBase />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: true,
})(App);
