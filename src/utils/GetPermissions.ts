import { Platform, PermissionsAndroid } from 'react-native';

const AndroidPermissions = [
  PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

export const CheckForPermissions = async () => {
  const passed = [];
  const rejected = [];

  for (let i = 0; i < AndroidPermissions.length; i++) {
    const permission = AndroidPermissions[i];
    if (permission) {
      const result = await PermissionsAndroid.check(permission);
      console.log('chec', permission, result);
      if (result) {
        passed.push(permission);
      } else {
        const res = await PermissionsAndroid.request(permission);
        if (res && res === 'granted') {
          passed.push(permission);
        } else {
          rejected.push(permission);
        }
      }
    }
  }
};
