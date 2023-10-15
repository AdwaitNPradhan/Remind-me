import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import LocationPickerBSM from '../../components/LocationPickerBSM/LocationPickerBSM';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <LocationPickerBSM />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
