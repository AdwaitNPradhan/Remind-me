import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Typography from '../Typography/Typography';
import WebView from 'react-native-webview';

const LocationPickerBSM = () => {
  const baseUrl = 'https://maps.google.com';
  const [urlString, setUrlString] = React.useState<string>('');
  const [loc, setLoc] = React.useState<{
    lat: number | null,
    loc: number | null,
  }>({ lat: null, loc: null });

  const [currentSnapPointIndex, setCurrentSnapPointIndex] =
    React.useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setCurrentSnapPointIndex(index);
  }, []);

  const changeSnapIndex = () => {
    bottomSheetRef.current?.snapToIndex(currentSnapPointIndex === 0 ? 1 : 0);
  };

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
            <Typography>50%</Typography>
          ) : (
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>{JSON.stringify(loc)}</Text>
                <Text style={styles.headerText}>
                  {urlString
                    ?.split(/(\/place\/)/)[2]
                    ?.split(/(\/@\d*)/)[0]
                    ?.replace(/([+])/g, ' ')}
                </Text>
                <Text style={styles.headerText}>{urlString}</Text>
              </View>
              <WebView
                location={true}
                source={{ uri: baseUrl }}
                onNavigationStateChange={e => {
                  setUrlString(e.url);
                }}
                style={styles.innerContainer}
                onError={error => {
                  console.error(error);
                }}
              />
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
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  header: {
    backgroundColor: 'white',
    padding: 10,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flexWrap: 'wrap',
    color: 'black',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 4,
    flex: 1,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    textTransform: 'uppercase',
    fontStyle: 'normal',
    fontWeight: '800',
  },
});
