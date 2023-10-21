import { FlatList, KeyboardAvoidingView, View, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import LocationPickerBSM from '../../components/LocationPickerBSM/LocationPickerBSM';
import useStore from '../../zustand';
import Typography from '../../components/Typography/Typography';
import HomeHeader from '../../navigation/HomeHeader';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AppInfoModal from '../../components/AppInfoModal/AppInfoModal';
import { Reminder } from '../../zustand/ReminderSlice';
import ReminderInfoModal from '../../components/ReminderInfoModal/ReminderInfoModal';
const HomeScreen = () => {
  const reminders = useStore(store => store.reminders);
  const [reminderBSMOpen, setReminderBSMOpen] = React.useState<boolean>(false);
  const [editingReminder, setEditingReminder] = React.useState<string>('');
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  const [showReminderInfo, setShowReminderInfo] = React.useState<{
    open: boolean,
    reminder?: Reminder | undefined,
  }>({
    open: false,
    reminder: undefined,
  });

  return (
    <KeyboardAvoidingView enabled behavior={'height'} style={styles.container}>
      <HomeHeader
        onAddPress={() => {
          setReminderBSMOpen(true);
          setEditingReminder('');
        }}
        onAppNamePress={() => {
          setShowInfoModal(true);
        }}
      />
      <View style={{  }}>
        <View style={{}}>
          <FlatList
            data={reminders}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            bounces
            bouncesZoom
            contentContainerStyle={{
              paddingTop: 8,   paddingHorizontal: 20,
              paddingBottom: 20,
            }}
            ListHeaderComponent={() => (
              <View style={{ marginBottom: 12 }}>
                <View>
                  <Typography
                    textStyles={{
                      color: 'white',
                      fontFamily: fonts.montserrat.semiBold,
                    }}>
                    Here are your reminders!
                  </Typography>
                </View>
              </View>
            )}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={()=>{
                  setShowReminderInfo({ open: true, reminder: item });
                }}>

                <View
                  key={index}
                  style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 12,
                    backgroundColor: colors.darkHeavyBlue,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{ flex: 1 }}>
                      <Typography
                        options={{ numberOfLines: 3, ellipsizeMode: 'tail' }}
                        textStyles={{
                          color: 'white',
                          fontFamily: fonts.montserrat.semiBold,
                        }}>
                        {item.title}
                      </Typography>
                    </View>
                    <View
                      style={{
                        width: 100,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: item.isActive
                            ? colors.green
                            : colors.red,
                          borderRadius: 100,
                          paddingHorizontal: 15,
                          paddingVertical: 2,
                        }}>
                        <Typography textStyles={{ color: 'white' }}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                      </View>
                    </View>
                  </View>
                  <Typography
                    textStyles={{
                      color: 'white',
                      fontSize: 12,
                      marginBottom: 15,
                    }}>
                    {item.location.title}
                  </Typography>
                  <Typography
                    textStyles={{
                      color: 'white',
                      marginBottom: 5,
                      fontSize: 12,
                      fontFamily: fonts.montserrat.semiBold,
                    }}>
                    Remind me if within: {item.radius}ms
                  </Typography>
                </View>
                </Pressable>
              );
            }}
            ListFooterComponent={() => (
              <View>
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}>
                  <Typography
                    textStyles={{
                      color: '#ffffff99',
                      fontSize: 14,
                      fontFamily: fonts.montserrat.medium,
                      marginBottom: 20,
                      textAlign: 'center',
                    }}>
                    You can try adding a reminder and I would let you know when
                    you are near it.{'\n\n'}Tap on Add on the top to continue.
                  </Typography>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <AppInfoModal open={showInfoModal} setOpen={setShowInfoModal} />
      {reminderBSMOpen && (
        <LocationPickerBSM
          setOpen={setReminderBSMOpen}
          editing={editingReminder.length > 0}
          reminderId={editingReminder}
        />
      )}
      <ReminderInfoModal
        open={showReminderInfo.open}
        closeModal={() =>
          setShowReminderInfo({ open: false, reminder: undefined })
        }
        reminder={showReminderInfo.reminder!}
        onEditPress={() => {
          setEditingReminder(showReminderInfo.reminder!.id );
          setReminderBSMOpen(true);
          setShowReminderInfo({ open: false, reminder: undefined });
        }}
        onDeletePress={() => {}}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.heavyBlue,
  },
});
