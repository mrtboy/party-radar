//set current Location
import { latitude } from './../selectors/map';
export const setCurrentLocation = ({latitude, longitude}={}) => ({
  type: 'SET_CURRENT_LOCATION',
  currentLocation: {
    latitude,
    longitude
  }
});