import { StoreSlice } from '.';
export interface Settings {
  locationTrackingEnabled: boolean;
  locationTrackingInterval: number;
  locationTrackingDistance: number;
}
export interface SettingsSlice {
  settings: Settings;
  setSettings: (newSettings: Settings) => void;
  clearSettingsState: () => void;
}

const CreateSettingsSlice: StoreSlice<SettingsSlice> = (set, get) => ({
  settings: {
    locationTrackingEnabled: false,
    locationTrackingInterval: 1000 * 30,
    locationTrackingDistance: 100,
  },
  setSettings: (newSettings: Settings) => {
    set((state: { settings: Settings }) => ({
      settings: newSettings,
    }));
  },
  clearSettingsState: () =>
    set(
      {
        settings: {
          locationTrackingEnabled: false,
          locationTrackingInterval: 1000 * 30,
          locationTrackingDistance: 100,
        },
      },
      true,
    ),
});

export default CreateSettingsSlice;
