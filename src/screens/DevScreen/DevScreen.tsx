import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
const DevScreen = () => {
  const baseUrl = 'https://maps.google.com';
  const [urlString, setUrlString] = React.useState<string>('');
  const [loc, setLoc] = React.useState<{
    lat: number | null,
    loc: number | null,
  }>({ lat: null, loc: null });

  useEffect(() => {
    if (urlString) {
      const locData = urlString
        ?.split('/@')[1]
        ?.split(/(,\d*[z]\/)/g)[0]
        ?.split(',');
      if (locData) setLoc({ lat: +locData[0], loc: +locData[1] });
    }
  }, [urlString]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>location</Text>
        </TouchableOpacity>
      </View>
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
  );
};

export default DevScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
  button: {
    margin: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
