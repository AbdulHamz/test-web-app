import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import MainContainer from "./Containers/MainContainer";
import FooterContainer from "./Containers/FooterContainer";
import HomeContainer from "./Containers/BodyContainer/HomeContainer";
import FormContainer from "./Containers/BodyContainer/FormContainer";
import ReportContainer from "./Containers/BodyContainer/ReportContainer";

// Setting Theme for an application
export const DEFAULT_THEME = createMuiTheme({
  palette: {
    primary: {
      main: "#dc004e",
    },
    secondary: {
      main: "#1976d2",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={DEFAULT_THEME}>
      <MainContainer />
      <Switch>
        <Redirect exact from="/" to="/Home" />
        <Route exact path="/Home">
          <HomeContainer />
        </Route>
        <Route exact path="/Form">
          <FormContainer />
        </Route>
        <Route exact path="/Report">
          <ReportContainer />
        </Route>
      </Switch>
      <FooterContainer />
    </MuiThemeProvider>
  );
};

export default App;
