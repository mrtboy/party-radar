export const initMap = (map) => {
  return {
    type: 'INIT_MAP',
    map
  };
};

export const setLocation = ({address,locationName, place_id, geolocation}) => {
  return {
    type: 'SET_LOCATION',
    address,
    locationName,
    place_id,
    geolocation
  };
};

export const getLocation = (geolocation) => {
  return {
    type: 'GET_LOCATION',
    geolocation
  };
};