import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Typography from '../Typography/Typography';
import WebView from 'react-native-webview';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import fonts from '../../constants/fonts';
import { useIsFocused } from '@react-navigation/native';

const LocationPickerBSM = () => {
  const [reminder, setReminder] = React.useState<{
    title: string,
    description: string,
    location: {
      title: string, lat: number, lon: number,
    }
    radius: number,
    isActive: boolean
  }>({
    title: '',
    description: '',
    location: {
      title: '',
      lat: 0,
      lon: 0,
    },
    radius: 0,
    isActive: false,
  });
  const baseUrl = 'https://maps.google.com';
  const [urlString, setUrlString] = React.useState<string>('');

  const [currentSnapPointIndex, setCurrentSnapPointIndex] =
    React.useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['75%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setCurrentSnapPointIndex(index);
    if(index === 0 && (!urlString || !reminder.location.lat || !reminder.location.lon)){
     console.log("Have to select location first")
      bottomSheetRef.current?.snapToIndex(1)
    }
  }, []);

  const changeSnapIndex = () => {
    bottomSheetRef.current?.snapToIndex(currentSnapPointIndex === 0 ? 1 : 0);
  };

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
          ?.replace(/([+])/g, ' '),
      );

      if (locCoords) {
        setReminder({
          ...reminder,
          location: {
            title: locName,
            lat: +locCoords[0],
            lon: +locCoords[1],
          },
        });
      }
    }
  }, [urlString]);

const handleSubmit = ()=>{
  if(reminder.title && reminder.description && reminder.location.lat && reminder.location.lon && reminder.location.title && reminder.radius){
    console.log(reminder)
  }
  else {
    console.log('please fill all fields')
  }
}

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          {currentSnapPointIndex === 0 ? (
            <View style={{ padding: 20, paddingTop: 0 }}>
              <View>
                <Typography
                  textStyles={{
                    fontFamily: fonts.montserrat.semiBold,
                    marginBottom: 5,
                  }}>
                  Reminder Title
                </Typography>
                <CustomTextInput
                  value={reminder.title}
                  onChangeText={text =>
                    setReminder({ ...reminder, title: text })
                  } 
                style={styles.textInput} />
              </View>
              <View>
                <Typography>Location</Typography>
                <CustomTextInput 
                multiline
                numberOfLines={2}
                value={reminder.location.title}
                style={[styles.textInput, styles.multilineTextInput]} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Typography>Lat</Typography>
                  <CustomTextInput
                  editable={false}

                    value={reminder.location.lat?.toString()}
                    style={styles.textInput} />

                </View>
                <View style={{ flex: 0.1 }} />
                <View style={{ flex: 1 }}>
                  <Typography>Lon</Typography>
                  <CustomTextInput
                  editable={false}

                    value={reminder.location.lon?.toString()}
                    style={styles.textInput} />
                    </View>
              </View>
              <View>
                <Typography>Description</Typography>
                <CustomTextInput
                  value={reminder.description}
                  onChangeText={text =>
                    setReminder({ ...reminder, description: text })
                  }
                  style={[styles.textInput, styles.multilineTextInput]} />
                  </View>
              <View>
                <Typography>Radius of circle (m)</Typography>
                <CustomTextInput 
                value={reminder.radius?.toString()}
                onChangeText={text =>
                  setReminder({ ...reminder, radius: +text })
                }
                keyboardType={'number-pad'}

                style={styles.textInput} />
              </View>
              <View
                style={{
                  height: 50,
                  justifyContent: 'center',
                }}>
                <CustomButton title={'Change Location'} onPress={changeSnapIndex} />
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
            <View style={{ width: '100%', height: '100%', paddingBottom: 10 }}>
              <View
                style={{
                  height: 30,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                }}>
                <Typography
                  textStyles={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
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
                  geolocationEnabled
                  incognito
                  thirdPartyCookiesEnabled={false}
                  webviewDebuggingEnabled
                  onError={error => {
                    console.error(error);
                  }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  justifyContent: 'center',
                }}>
                <CustomButton
                  buttonStyles={{ marginHorizontal: 20 }}
                  title={'Continue'}
                  onPress={changeSnapIndex}
                />
              </View>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default LocationPickerBSM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  mapContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  textInput:{ borderWidth: 0.2, borderRadius:5 },
  multilineTextInput:{
    maxHeight: 120,
  }
  disabled
});
