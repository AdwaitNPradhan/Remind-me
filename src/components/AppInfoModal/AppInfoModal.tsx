import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Typography from '../Typography/Typography';
import colors from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import fonts from '../../constants/fonts';
import { Portal, Modal } from 'react-native-paper';

interface AppInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AppInfoModal = (props: AppInfoModalProps) => {
  return (
    <Portal>
      <Modal
        visible={props.open}
        dismissable
        dismissableBackButton
        onDismiss={() => props.setOpen(false)}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{ backgroundColor: `${colors.white}99` }}>
        <View
          style={{
            backgroundColor: colors.darkHeavyBlue,
            width: '90%',
            height: '70%',
            padding: 10,
            borderRadius: 12,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <View>
                <Typography
                  textStyles={{
                    ...styles.textStyles,
                    textAlign: 'center',
                    fontFamily: fonts.montserrat.semiBold,
                    fontSize: 20,
                    marginBottom: 10,
                  }}>
                  Hi I am Remind me.
                </Typography>
                <Typography
                  textStyles={{ ...styles.textStyles, marginBottom: 10 }}>
                  A location based reminder app realized by my creator Adwait
                  Narayan Pradhan.
                </Typography>
                <Typography
                  textStyles={{ ...styles.textStyles, marginBottom: 5 }}>
                  I will try to help you by reminding you on what you wanted to
                  do when you are at a place.
                </Typography>
                <Typography
                  textStyles={{ ...styles.textStyles, marginBottom: 10 }}>
                  I was created when my forgetful creator kept forgetting to
                  clock in at his work. Could you believe that just for a simple
                  task he created me. But thanks to that I am here and will be
                  helping you in complete some tasks.
                </Typography>
                <Typography
                  textStyles={{ ...styles.textStyles, marginBottom: 15 }}>
                  I am currently in kindergarden and learning how to be a good
                  app. So please be patient with me.
                </Typography>
              </View>
              <View>
                <View>
                  <Typography
                    textStyles={{ ...styles.textStyles, marginBottom: 10 }}>
                    Here is an insight on how I work!
                  </Typography>
                </View>
                <View>
                  <Typography
                    textStyles={{ ...styles.textStyles, marginBottom: 5 }}>
                    1. You add a location based reminder.
                  </Typography>
                  <Typography
                    textStyles={{ ...styles.textStyles, marginBottom: 5 }}>
                    2. You provide me with the permission to get your location
                    and permission to show you notifications. Don't worry your
                    location data is not synced anywhere YET. I don't know what
                    all new things my creator would teach me to help you in more
                    than one way.
                  </Typography>
                  <Typography
                    textStyles={{ ...styles.textStyles, marginBottom: 5 }}>
                    3. At every set interval based on your location I filter out
                    reminders and send them to you as notifications.
                  </Typography>
                  <Typography
                    textStyles={{ ...styles.textStyles, marginBottom: 5 }}>
                    4. That's it. This is how I work.
                  </Typography>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default AppInfoModal;

const styles = StyleSheet.create({
  textStyles: {
    color: colors.white,
  },
});
