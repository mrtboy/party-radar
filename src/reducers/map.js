const map = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_MAP':
      return {
        map: action.map
      };
    default:
      return state;
  }
};

export default map;