export default (state, action) => {
    switch (action.type) {
      case 'GET_APPOINTMENTS':
        return {
          ...state,
          appointments: action.payload,
        };
      default:
        return state;
    }
  };
  