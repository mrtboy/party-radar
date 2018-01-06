

const locationsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        ...action.pos
      };
    case 'NEAR_ME':
      return action.events;
    default:
      return state;
  }
};