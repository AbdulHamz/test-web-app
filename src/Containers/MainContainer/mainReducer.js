import * as Constants from "../../Constants";

const initialState = {
  isDrawerOpened: false,
  selectedMenu: 0,
};

const mainReducer = (state = initialState, action) => {
  const stateObj = {};
  switch (action.type) {
    case Constants.DRAWER_STATUS:
      stateObj.isDrawerOpened = action.isDrawerOpened;
      break;

    case Constants.SELECTED_MENU:
      stateObj.selectedMenu = action.selectedMenu;
      break;

    default:
      return state;
  }

  return { ...state, ...stateObj };
};

export default mainReducer;
