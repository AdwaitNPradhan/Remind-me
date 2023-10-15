import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Video from 'react-native-video';
import { GetVid } from '../constants/assets';
import useStore from '../zustand';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [vidUrl, setVideoUrl] = useState<string>('');
  const [videoPlayable, setVideoPlayable] = useState(false);
  const [splashIsVisible, setSplashIsVisible] = useState(true);
  const vidRef = useRef<Video>(null);
  useEffect(() => {
    setVideoUrl(GetVid());
    setSplashIsVisible(true);
    const a = setTimeout(() => {
      useStore.persist.rehydrate();
    }, 1200);
    const t = setTimeout(() => {
      setSplashIsVisible(false);
    }, 1700);

    return () => {
      clearTimeout(t);
      clearTimeout(a);
    };
  }, []);

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      {vidUrl.length > 0 ? (
        <Video
          source={{
            uri: vidUrl,
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
          ref={vidRef}
          resizeMode="cover"
          onError={err => {
            setVideoPlayable(false);
          }}
          removeClippedSubviews
          muted
          repeat={true}
          controls={false}
          fullscreen
          fullscreenAutorotate={false}
          fullscreenOrientation="portrait"
          onEnd={() => {
            vidRef.current?.seek(0);
          }}
        />
      ) : (
        <View
          style={{ backgroundColor: 'black', height: '100%', width: '100%' }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9,
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#ffffff00',
            },
            animation: 'fade',
            animationTypeForReplace: 'push',
            orientation: 'portrait',
          }}
          initialRouteName={splashIsVisible ? 'SplashScreen' : 'OnBoarding'}>
          {splashIsVisible && (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          )}
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default AuthNavigator;
