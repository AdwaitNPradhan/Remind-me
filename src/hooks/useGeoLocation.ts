import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';

export interface IGeoPosition extends GeolocationResponse {}

export const useGeoLocation = () => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    enableBackgroundLocationUpdates: true,
  });

  const CheckForPermissions = async (
    successCallback: () => void = () => undefined,
    errorCallback: (error: GeolocationError) => void = () => undefined,
  ) => {
    Geolocation.requestAuthorization(successCallback, errorCallback);
  };

  const GetCurrentLocation = (
    successCallback: (position: GeolocationResponse) => void,
    errorCallback: (error: GeolocationError) => void,
    options: GeolocationOptions | undefined = {
      enableHighAccuracy: true,
      distanceFilter: 10,
    },
  ) => {
    return Geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options,
    );
  };

  return { GetCurrentLocation, CheckForPermissions };
};
