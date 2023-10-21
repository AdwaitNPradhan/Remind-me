import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Typography from '../components/Typography/Typography';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

interface HomeHeaderProps {
  onAddPress: () => void;
  onAppNamePress: () => void;
}

const HomeHeader = ({ onAddPress, onAppNamePress }: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <Typography
        options={{ onPress: onAppNamePress }}
        textStyles={styles.textStyles}>
        Remind Me!
      </Typography>
      <Pressable onPress={onAddPress} style={styles.buttonStyles}>
        <Typography textStyles={styles.plusTextStyles}>➕</Typography>
        <Typography textStyles={styles.addTextStyles}>Add</Typography>
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
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
  },
  textStyles: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
    fontSize: 24,
  },
  buttonStyles: {
    height: 35,
    borderRadius: 100,
    borderColor: colors.chromeYellow,
    borderWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: 'white',
  },
  plusTextStyles: { marginRight: 5, fontSize: 12 },
  addTextStyles: { fontFamily: fonts.montserrat.semiBold },
});
