import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Typography from '../../components/Typography/Typography';
import CustomButton from '../../components/CustomButton/CustomButton';
import useStore from '../../zustand';
import { styles } from './OnBoardingScreen.styles';

const OnBoardingScreen = () => {
  const [name, setName] = useState('');
  const onBoardUser = useStore(state => state.onBoardUser);
  const handleContinue = () => {
    onBoardUser(name);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Typography textStyles={styles.titleText}>
          Welcome to Remind me!
        </Typography>
        <Typography textStyles={styles.descriptionText}>
          This is not just a location based reminder app. Its more than that.
        </Typography>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter your name"
          placeholderTextColor={'#999'}
          value={name}
          onChangeText={setName}
        />
        <CustomButton title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default OnBoardingScreen;
