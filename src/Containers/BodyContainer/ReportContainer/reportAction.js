import * as Constant from "../../../Constants";

export const setDetails = (defaultDetails) => {
  return {
    type: Constant.DRAWER_STATUS,
    defaultDetails,
  };
};
