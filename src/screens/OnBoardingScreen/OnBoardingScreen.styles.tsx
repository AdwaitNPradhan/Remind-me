import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  innerContainer: {
    borderRadius: 12,
    backgroundColor: '#ffffffaa',
    padding: 20,
    width: '80%',
    alignItems: 'center',
    minHeight: '20%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: fonts.montserrat.mediumItalic,
  },
  textInputStyle: {
    textAlign: 'center',
  },
});
