import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DevScreen from '../screens/DevScreen/DevScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStore from '../zustand';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

const HomeStackNav = createNativeStackNavigator();

const HomeRootTabNav = createBottomTabNavigator();

/**
 * BottomTab:
 * - Home
 * - Dev
 * - Settings
 *
 * HomeStack:
 * - Home
 * - Dev
 *
 */

const AppNavigator = () => {
  // return (
  //   <HomeStackNav.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //     initialRouteName="Home">
  //     <HomeStackNav.Screen name="Home" component={HomeScreen} />
  //     <HomeStackNav.Screen name="Dev" component={DevScreen} />
  //   </HomeStackNav.Navigator>
  // );

  return (
    <HomeRootTabNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <HomeRootTabNav.Screen name="Home" component={HomeScreen} />
      {__DEV__ && <HomeRootTabNav.Screen name="Dev" component={DevScreen} />}
      <HomeRootTabNav.Screen name="Settings" component={SettingsScreen} />
    </HomeRootTabNav.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
