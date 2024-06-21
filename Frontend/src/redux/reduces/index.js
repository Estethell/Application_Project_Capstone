const initialState = {
  user: null,
  jobOffers: [],
};

const mainReducer = function (state = initialState, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };

    case "logout":
      return {
        ...state,
        user: null,
      };

    case "SET_JOB_OFFERS":
      return {
        ...state,
        jobOffers: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
