import { StoreSlice } from '.';
export interface Reminder {
  id: string;
  title: string;
  location: {
    title: string,
    lat: number,
    lon: number,
  };
  radius: number;
  description?: string;
  createdAt: string;
  isActive: boolean;
}
export interface ReminderSlice {
  reminders: Reminder[];
  getReminder: (reminderId: string) => Reminder | undefined;
  setReminder: (reminder: Reminder) => void;
  switchReminderActive: (reminderId: string) => void;
  updateAndSaveReminder: (rem: Reminder) => void;
  removeReminder: (reminderId: string) => void;
  clearRemindersState: () => void;
}

const CreateReminderSlice: StoreSlice<ReminderSlice> = (set, get) => ({
  reminders: [],

  getReminder: (reminderId: string) => {
    return get().reminders?.find(
      (reminder: Reminder) => reminder.id === reminderId,
    );
  },
  setReminder: (reminder: Reminder) => {
    set((state: { reminders: Reminder[] }) => ({
      reminders: [...state.reminders, reminder],
    }));
  },
  switchReminderActive: (reminderId: string) => {
    set((state: { reminders: Reminder[] }) => ({
      reminders: state.reminders.map((reminder: Reminder) =>
        reminder.id === reminderId
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder,
      ),
    }));
  },
  updateAndSaveReminder: (rem: Reminder) => {
    set((state: { reminders: Reminder[] }) => ({
      reminders: state.reminders.map((reminder: Reminder) =>
        reminder.id === rem.id ? rem : reminder,
      ),
    }));
  },
  removeReminder: (reminderId: string) => {
    set((state: { reminders: Reminder[] }) => ({
      reminders: state.reminders.filter(
        (reminder: Reminder) => reminder.id !== reminderId,
      ),
    }));
  },
  clearRemindersState: () =>
    set(
      {
        reminders: [],
      },
      true,
    ),
});
export default CreateReminderSlice;
