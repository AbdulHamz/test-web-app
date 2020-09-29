import { combineReducers } from "redux";
import mainReducer from "../Containers/MainContainer/mainReducer";
import reportReducer from "../Containers/BodyContainer/ReportContainer/reportReducer";

export default combineReducers({
  mainState: mainReducer,
  reportState: reportReducer,
});
