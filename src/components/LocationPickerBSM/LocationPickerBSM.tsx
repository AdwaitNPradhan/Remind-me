import { BackHandler, StyleSheet, Text, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Typography from '../Typography/Typography';
import WebView from 'react-native-webview';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import fonts from '../../constants/fonts';
import useStore from '../../zustand';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import colors from '../../constants/colors';

interface LocationPickerBSMProps {
  reminderId?: string;
  editing: boolean;
  setOpen: (open: boolean) => void;
}

const LocationPickerBSM = (props: LocationPickerBSMProps) => {
  const setReminder = useStore(state => state.setReminder);
  const getReminder = useStore(state => state.getReminder);
  const [reminderData, setReminderData] = React.useState<{
    title: string,
    description?: string,
    location: {
      title: string,
      lat: number,
      lon: number,
    },
    radius: number,
    isActive: boolean,
    id?: string,
    createdAt?: string,
  }>({
    title: '',
    description: '',
    location: {
      title: '',
      lat: 0,
      lon: 0,
    },
    radius: 250,
    isActive: false,
    id: '',
    createdAt: '',
  });

  const baseUrl = 'https://maps.google.com';
  const [urlString, setUrlString] = React.useState<string>('');

  const [currentSnapPointIndex, setCurrentSnapPointIndex] =
    React.useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['70%', '100%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      setCurrentSnapPointIndex(index);
      if (
        index === 1 &&
        (!urlString ||
          !reminderData.location.lat ||
          !reminderData.location.lon) &&
        !props.editing
      ) {
        console.log(
          'Have to select location first',
          !urlString ||
            !reminderData.location.lat ||
            !reminderData.location.lon,
          urlString,
          reminderData.location.lat,
          reminderData.location.lon,
        );
        bottomSheetRef.current?.snapToIndex(1);
      }
    },
    [urlString, JSON.stringify(reminderData)],
  );

  const changeSnapIndex = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  useEffect(() => {
    setReminderData({
      title: '',
      description: '',
      location: {
        title: '',
        lat: 0,
        lon: 0,
      },
      radius: 250,
      isActive: false,
      id: '',
      createdAt: '',
    });
    // Handle backhandler
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentSnapPointIndex === 1) {
        changeSnapIndex(0);
        return true;
      } else if (currentSnapPointIndex === 0) {
        props.setOpen(false);
        return true;
      }
      return false;
    });

    setUrlString('');
    if (props?.editing && props?.reminderId) {
      bottomSheetRef.current?.snapToIndex(-1);
      setCurrentSnapPointIndex(-1);
      const reminder = getReminder(props?.reminderId);
      if (reminder) setReminderData(reminder);
      return;
    }
    bottomSheetRef.current?.snapToIndex(0);
    setCurrentSnapPointIndex(0);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        if (currentSnapPointIndex === 1) {
          changeSnapIndex(0);
          return true;
        } else if (currentSnapPointIndex === 0) {
          props.setOpen(false);
          return true;
        }
        return false;
      });
    };
  }, []);

  // useEffect(() => {
  //   if (currentSnapPointIndex === 0 && urlString !== '') {
  //     changeSnapIndex(1);
  //     console.log('need to select location first or something');
  //   }
  // }, [currentSnapPointIndex]);

  useEffect(() => {
    if (urlString) {
      const locCoords = urlString
        ?.split('/@')[1]
        ?.split(/(,\d*[z]\/)/g)[0]
        ?.split(',');
      const locName = decodeURIComponent(
        urlString
          ?.split(/(\/place\/)/)[2]
          ?.split(/(\/@\d*)/)[0]
          ?.replace(/([+])/g, ' ') ?? '',
      );

      if (locCoords) {
        setReminderData({
          ...reminderData,
          location: {
            title: locName || '',
            lat: +locCoords[0],
            lon: +locCoords[1],
          },
        });
      }
    }
  }, [urlString]);

  const handleSubmit = () => {
    if (
      reminderData.title &&
      reminderData.location.lat &&
      reminderData.location.lon &&
      reminderData.location.title &&
      reminderData.radius
    ) {
      const uuid = uuidv4();
      setReminder({
        ...reminderData,
        isActive: true,
        id: uuid,
        createdAt: Date.now().toLocaleString(),
      });
      props?.setOpen?.(false);
    } else {
      console.log('please fill all fields');
    }
  };

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => {
        props?.setOpen?.(false);
      }}
      backgroundStyle={{
        backgroundColor: colors.darkHeavyBlue,
      }}
      containerStyle={{
        backgroundColor: `${colors.white}44`,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.white }}
      onChange={handleSheetChanges}>
      <View style={styles.contentContainer}>
        {currentSnapPointIndex === 0 ? (
          <View style={{ padding: 20, paddingTop: 0 }}>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Reminder Title
              </Typography>
              <CustomTextInput
                value={reminderData.title}
                onChangeText={text =>
                  setReminderData({ ...reminderData, title: text })
                }
                style={styles.textInput}
              />
            </View>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Location
              </Typography>
              <CustomTextInput
                multiline
                numberOfLines={2}
                value={reminderData.location?.title || ''}
                onChangeText={text =>
                  setReminderData({
                    ...reminderData,
                    location: { ...reminderData.location, title: text || '' },
                  })
                }
                style={[styles.textInput, styles.multilineTextInput]}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Typography textStyles={styles.labelTextStyles}>Lat</Typography>
                <CustomTextInput
                  editable={false}
                  value={reminderData.location.lat?.toString()}
                  style={styles.textInput}
                />
              </View>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 1 }}>
                <Typography textStyles={styles.labelTextStyles}>Lon</Typography>
                <CustomTextInput
                  editable={false}
                  value={reminderData.location.lon?.toString()}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Description
              </Typography>
              <CustomTextInput
                value={reminderData.description}
                onChangeText={text =>
                  setReminderData({ ...reminderData, description: text })
                }
                style={[styles.textInput, styles.multilineTextInput]}
              />
            </View>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Radius of circle (m)
              </Typography>
              <CustomTextInput
                value={reminderData.radius?.toString()}
                onChangeText={text =>
                  setReminderData({ ...reminderData, radius: +text })
                }
                keyboardType={'number-pad'}
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <CustomButton
                title={'Change Location'}
                onPress={() => changeSnapIndex(1)}
              />
            </View>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <CustomButton title={'Create Reminder'} onPress={handleSubmit} />
            </View>
          </View>
        ) : (
          <View style={styles.mapBSMContainer}>
            <View style={styles.mapHeaderContainer}>
              <Typography textStyles={styles.headerTextStyle}>
                Pick a location
              </Typography>
            </View>
            <View style={styles.mapContainer}>
              <WebView
                location={true}
                source={{ uri: urlString !== '' ? urlString : baseUrl }}
                onNavigationStateChange={e => {
                  setUrlString(e.url);
                }}
                renderLoading={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Loading...</Text>
                  </View>
                )}
                geolocationEnabled
                incognito
                forceDarkOn
                useWebView2
                thirdPartyCookiesEnabled={false}
                webviewDebuggingEnabled
                onError={error => {
                  console.error(error);
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                buttonStyles={styles.button}
                title={'Continue'}
                onPress={() => changeSnapIndex(0)}
              />
            </View>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default LocationPickerBSM;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  labelTextStyles: {
    fontFamily: fonts.montserrat.semiBold,
    marginBottom: 5,
    color: colors.white,
  },
  textInput: {
    borderRadius: 5,
    fontSize: 14,
    fontFamily: fonts.montserrat.medium,
  },
  multilineTextInput: {
    maxHeight: 120,
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  headerTextStyle: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.montserrat.semiBold,
  },
  mapHeaderContainer: {
    height: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mapBSMContainer: { width: '100%', height: '100%', paddingBottom: 10 },
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
  },
  button: { marginHorizontal: 20 },
});
