import { create, StoreApi } from 'zustand';
import CreateReminderSlice, { ReminderSlice } from './ReminderSlice';
import CreateUserStore, { UserSlice } from './UserSlice';
import CreateSettingsSlice, { SettingsSlice } from './SettingsSlice';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

import {
  getItemInES,
  removeItemInES,
  setItemInES,
} from '../utils/EncryptedLocalStorage';

export type StoreState = ReminderSlice & UserSlice & SettingsSlice;
export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;

const ZustandMMKVStorage: StateStorage = {
  setItem: async (name: string, value: string) => {
    return await setItemInES(name, value);
  },
  getItem: async (name: string) => {
    const value = await getItemInES(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    return await removeItemInES(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...CreateReminderSlice(set, get),
      ...CreateSettingsSlice(set, get),
      ...CreateUserStore(set, get),
    }),
    {
      name: 'remind-me.app#zustand',
      storage: createJSONStorage(() => ZustandMMKVStorage),
      skipHydration: true,
    },
  ),
);

export default useStore;
