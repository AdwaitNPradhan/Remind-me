import { GetDistanceBetweenTwoPoints } from '../utils/basics';

export const useDistanceCalculators = () => {
  const GetDistanceBetweenTwoPointsInKm = (
    p1: { lat: number, lon: number },
    p2: { lat: number, lon: number },
  ) => {
    return GetDistanceBetweenTwoPoints(p1, p2) / 1000;
  };

  const GetDistanceBetweenTwoPointsInMeters = (
    p1: { lat: number, lon: number },
    p2: { lat: number, lon: number },
  ) => {
    return GetDistanceBetweenTwoPoints(p1, p2);
  };

  return {
    GetDistanceBetweenTwoPointsInKm,
    GetDistanceBetweenTwoPointsInMeters,
  };
};
