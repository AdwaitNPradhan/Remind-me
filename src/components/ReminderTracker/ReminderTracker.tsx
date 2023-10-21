import { AppState, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import useStore from '../../zustand';
import { useDistanceCalculators } from '../../hooks/useDistanceCalculators';
import { IGeoPosition, useGeoLocation } from '../../hooks/useGeoLocation';

import BackgroundService from 'react-native-background-actions';
import { Reminder } from '../../zustand/ReminderSlice';
import Geolocation from '@react-native-community/geolocation';
import { getItemInES } from '../../utils/EncryptedLocalStorage';
import { Settings } from '../../zustand/SettingsSlice';
import { UserSlice } from '../../zustand/UserSlice';
import { GetDistanceBetweenTwoPoints } from '../../utils/basics';

const sleep = (time: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), time));

const BackgroundLocationMonitor = async (taskDataArguments: any) => {
  const { delay } = taskDataArguments;
  const details = JSON.parse(await getItemInES('remind-me.app#zustand')) as {state:{reminders:Reminder[], settings: Settings, user: UserSlice}, version: number};
  const reminders = details.state?.reminders?.filter(reminder=>reminder.isActive)
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      if (details && details.state?.settings?.locationTrackingEnabled && reminders?.length> 0) {
        Geolocation.getCurrentPosition(
          pos => {
          
            for (const reminder of reminders) 
            { const distance = GetDistanceBetweenTwoPoints(
               {
                 lat: pos?.coords?.latitude,
                 lon: pos?.coords?.longitude,
               },
               {
                 lat: reminder.location.lat,
                 lon: reminder.location.lon,
               },
             );
             if (distance < reminder.radius)
               console.log(`Alert, you have entered ${reminder.title}`);
             }

          },
          err => {
            console.log(err);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
          },
        );
      }else {
        BackgroundService.updateNotification({taskDesc:"You dont have any active location based reminders."});
      }
      await sleep(delay);
    }
  });
};



const ReminderTracker = () => {
  const settings = useStore(store => store.settings);
  const reminders = useStore(store => store.reminders);
  const user = useStore(store => store.user);
  const options = {
    taskName: 'Remind Me Location Tracker',
    taskTitle: 'I am tracking your location',
    taskDesc:"I'm tracking your location to remind you when you reach a location based reminder.",
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: settings.locationTrackingInterval*1000,
    },
    
  };
  const { GetDistanceBetweenTwoPointsInMeters } = useDistanceCalculators();
  const { GetCurrentLocation, CheckForPermissions } = useGeoLocation();
  const [currentLocation, setCurrentLocation] = React.useState<IGeoPosition>();
  const timerRef = useRef<any>();

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state === 'background' || state === 'inactive') {
        if (BackgroundService.isRunning()) BackgroundService.stop();
        BackgroundService.start(BackgroundLocationMonitor, options);
      }
      if (state === 'active') {
        BackgroundService.stop();
      }
    });
  }, [AppState.currentState]);

  useEffect(() => {
    if (settings.locationTrackingEnabled) {
      CheckForPermissions();
      GetCurrentLocation(
        pos => {
          setCurrentLocation(pos);
        },
        err => {
          console.log(err);
        },
      );
      timerRef.current = setInterval(() => {
        GetCurrentLocation(
          pos => {
            setCurrentLocation(pos);
          },
          err => {
            console.log(err);
          },
        );
      }, settings.locationTrackingInterval);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [settings, reminders, user]);

  useMemo(() => {
    if (!currentLocation) return;
    for (const reminder of reminders) {
      const distance = GetDistanceBetweenTwoPointsInMeters(
        {
          lat: currentLocation?.coords.latitude,
          lon: currentLocation?.coords.longitude,
        },
        {
          lat: reminder.location.lat,
          lon: reminder.location.lon,
        },
      );
      if (distance < reminder.radius)
        console.log(`Alert, you have entered ${reminder.title}`);
    }
  }, [JSON.stringify(currentLocation), JSON.stringify(reminders)]);

  return null;
};

export default ReminderTracker;

const styles = StyleSheet.create({});
