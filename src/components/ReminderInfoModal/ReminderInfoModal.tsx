import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Typography from '../Typography/Typography';
import colors from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import fonts from '../../constants/fonts';
import { Portal, Modal } from 'react-native-paper';
import { Reminder } from '../../zustand/ReminderSlice';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextInput from '../CustomTextInput/CustomTextInput';

interface ReminderInfoModalProps {
  open: boolean;
  closeModal: () => void;
  reminder: Reminder;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const ReminderInfoModal = (props: ReminderInfoModalProps) => {
  return (
    <Portal>
      <Modal
        visible={props.open}
        dismissable
        dismissableBackButton
        onDismiss={() => props.closeModal()}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{ backgroundColor: `${colors.white}99` }}>
        <View
          style={{
            backgroundColor: colors.darkHeavyBlue,
            width: '90%',
            padding: 10,
            borderRadius: 12,
          }}>
          <View style={{ padding: 20, paddingTop: 0 }}>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Reminder Title
              </Typography>
              <CustomTextInput
                value={props.reminder?.title}
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
                value={props.reminder?.location?.title}
                style={[styles.textInput, styles.multilineTextInput]}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Typography textStyles={styles.labelTextStyles}>Lat</Typography>
                <CustomTextInput
                  editable={false}
                  value={props.reminder?.location?.lat?.toString()}
                  style={styles.textInput}
                />
              </View>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 1 }}>
                <Typography textStyles={styles.labelTextStyles}>Lon</Typography>
                <CustomTextInput
                  editable={false}
                  value={props.reminder?.location?.lon?.toString()}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Description
              </Typography>
              <CustomTextInput
                value={props.reminder?.description}
                style={[styles.textInput, styles.multilineTextInput]}
              />
            </View>
            <View>
              <Typography textStyles={styles.labelTextStyles}>
                Radius of circle (m)
              </Typography>
              <CustomTextInput
                value={props.reminder?.radius?.toString()}
                editable={false}
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
                buttonStyles={{ backgroundColor: colors.chromeYellow }}
                title={'Edit'}
                onPress={() => props.onEditPress()}
              />
            </View>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <CustomButton
                buttonStyles={{ backgroundColor: colors.red }}
                title={'Delete'}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ReminderInfoModal;

const styles = StyleSheet.create({
  textStyles: {
    color: colors.white,
  },
  labelTextStyles: {
    fontFamily: fonts.montserrat.semiBold,
    marginBottom: 5,
    color: colors.white,
  },
  textInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: fonts.montserrat.medium,
    backgroundColor: colors.heavyBlue,
    color: 'white',
  },
  multilineTextInput: {
    maxHeight: 120,
  },
});
