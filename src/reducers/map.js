const map = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_MAP':
      return {
        map: action.map
      };
    case 'SET_LOCATION':
      return {
        address: action.address,
        locationName: action.locationName,
        place_id: action.place_id,
        geolocation: action.geolocation
      };
    case 'GET_LOCATION':
      return {
        geolocation: action.geolocation
      };
    default:
      return state;
  }
};

export default map;