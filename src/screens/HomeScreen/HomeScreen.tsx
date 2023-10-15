import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import LocationPickerBSM from '../../components/LocationPickerBSM/LocationPickerBSM';
const HomeScreen = () => {
  return (
    <KeyboardAvoidingView enabled behavior={'height'} style={styles.container}>
      <LocationPickerBSM />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
