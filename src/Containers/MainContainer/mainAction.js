import * as Constant from "../../Constants";

export const setDrawerStatus = (isDrawerOpened) => {
  return {
    type: Constant.DRAWER_STATUS,
    isDrawerOpened,
  };
};
