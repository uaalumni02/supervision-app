import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Supervision from "./pages/Supervision";
import RequestToken from "./pages/RequestToken";
import Reset from "./pages/Reset";

import GlobalStateProvider from "./store/GlobalStateProvider";

function App() {
  return (
    <GlobalStateProvider>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/supervision" component={Supervision} />
            <Route exact path="/requestToken" component={RequestToken} />
            <Route exact path="/reset" component={Reset} />
          </Switch>
          {/* <UserContextProvider> */}
          {/* </UserContextProvider> */}
        </BrowserRouter>
      </Layout>
    </GlobalStateProvider>
  );
}

export default App;
