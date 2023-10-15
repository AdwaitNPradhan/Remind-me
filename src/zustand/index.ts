import { create, StoreApi } from 'zustand';
import { ReminderSlice } from './ReminderSlice';
import { UserSlice } from './UserSlice';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

import {
  getItemInES,
  removeItemInES,
  setItemInES,
} from '../utils/EncryptedLocalStorage';

import CreateReminderSlice from './ReminderSlice';
import CreateUserStore from './UserSlice';

export type StoreState = ReminderSlice & UserSlice;
export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;

const ZustandMMKVStorage: StateStorage = {
  setItem: async (name: string, value: string) => {
    console.log('setting', value, 'for', name);
    return await setItemInES(name, value);
  },
  getItem: async (name: string) => {
    const value = await getItemInES(name);
    console.log('getting', value, 'for', name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    console.log('removing for', name);
    return await removeItemInES(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...CreateReminderSlice(set, get),
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
