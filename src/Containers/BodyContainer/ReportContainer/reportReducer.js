import * as Constants from "../../../Constants";

const initialState = {
  defaultDetails: [],
};

const reportReducer = (state = initialState, action) => {
  const stateObj = {};
  switch (action.type) {
    case Constants.DEFAULT_DETAILS:
      stateObj.defaultDetails = action.defaultDetails;
      break;

    default:
      return state;
  }

  return { ...state, ...stateObj };
};

export default reportReducer;
