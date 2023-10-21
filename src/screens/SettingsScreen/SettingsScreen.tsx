import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Typography from '../../components/Typography/Typography';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../../zustand';
import Switch from '../../components/Switch/Switch';
import SettingsRow from '../../components/SettingsRow/SettingsRow';
import CustomButton from '../../components/CustomButton/CustomButton';

const SettingsScreen = () => {
  const settings = useStore(store => store.settings);
  const clearSettingsState = useStore(store => store.clearSettingsState);
  const clearRemindersState = useStore(store => store.clearRemindersState);
  const clearUserState = useStore(store => store.clearUserState);

  const setSettings = useStore(
    (store: { setSettings: any }) => store.setSettings,
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.heavyBlue,
      }}>
      <View
        style={{
          height: 60,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: 'row',
          elevation: 5,
          backgroundColor: colors.darkHeavyBlue,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 5,
        }}>
        <Typography
          textStyles={{
            color: colors.white,
            fontSize: 24,
            fontFamily: fonts.montserrat.semiBold,
          }}>
          Settings
        </Typography>
      </View>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10, flex: 1 }}>
        <View style={{ width: '100%' }}>
          <View style={{ paddingVertical: 10 }}>
            <Typography
              textStyles={{
                color: colors.white,
                fontFamily: fonts.montserrat.semiBold,
                fontSize: 20,
              }}>
              Location Based (Remind Me)
            </Typography>
          </View>

          <View>
            <SettingsRow
              title="Track my location"
              description="Should the app track your location?"
              value={settings.locationTrackingEnabled}
              onChange={() =>
                setSettings({
                  ...settings,
                  locationTrackingEnabled: !settings.locationTrackingEnabled,
                })
              }
              type="toggle"
            />
            <SettingsRow
              title="Location tracking interval"
              description="How often should the app check your location? (in seconds)"
              value={(settings.locationTrackingInterval / 1000).toFixed(0)}
              onChange={value => {
                if (!value) return;
                !!value &&
                  setSettings({
                    ...settings,
                    locationTrackingInterval: +value * 1000,
                  });
              }}
              type="input-number"
            />
            <SettingsRow
              title="Location tracking distance"
              description="How close should you be to the reminder location to trigger the reminder? (in meters)"
              value={settings.locationTrackingDistance}
              onChange={value => {
                if (!value) return;
                !!value &&
                  setSettings({
                    ...settings,
                    locationTrackingDistance: +value,
                  });
              }}
              type="input-number"
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <CustomButton
            title="RESET ALL DATA"
            onPress={() => {
              clearSettingsState();
              clearRemindersState();
              clearUserState();
            }}
            buttonStyles={{
              backgroundColor: colors.red,
              marginBottom: 40,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
