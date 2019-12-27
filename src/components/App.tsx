import React from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { companyStyles } from "../styles/theme";
import "moment/locale/es";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { Matcher } from "./Matcher";
import { Register } from "./register/Register";
import { useDidMount } from "../utils/hooksUtils";
import { init } from "../utils/init";
import { Errors, LoadState } from "../types/types";
import { ErrorScreen } from "./ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";

companyStyles.setStyles({
  theme: "white",
  primaryColor: "#e91e63",
  contrastPrimaryColor: "white"
});

export function App() {
  const [loadState, setLoadState] = React.useState({
    state: LoadState.Loading,
    message: ""
  });
  const history = useHistory();

  useDidMount(() => {
    try {
      init();
      history.push("/");
      setLoadState({
        state: LoadState.Idle,
        message: ""
      });
    } catch (error) {
      switch (error.message) {
        case Errors.Unauthorized:
          history.push("/register");
          setLoadState({
            state: LoadState.Idle,
            message: ""
          });
          break;
        default:
          setLoadState({
            state: LoadState.Error,
            message: error.message
          });
          break;
      }
    }
  });

  return (
    <ThemeProvider theme={companyStyles.styles}>
      <Container>
        {loadState.state === LoadState.Error && (
          <ErrorScreen message={loadState.message} />
        )}
        {loadState.state === LoadState.Loading && <LoadingScreen />}
        {loadState.state === LoadState.Idle && (
          <Switch>
            <Route exact path="/">
              <Matcher />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        )}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh;
  width: 100vw; */
  background-color: ${props => props.theme.screenColor};
`;
