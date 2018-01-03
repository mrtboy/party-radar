

const locationsReducer = (state = {}, action) => {
  switch(action.type){
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        ...action.setCurrentLocation
      }
    default: 
      return state;
  }
};