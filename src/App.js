import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Supervision from "./pages/Supervision";
import RequestToken from "./pages/RequestToken";
import Reset from "./pages/Reset";
import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings"

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
            <Route exact path="/reset/:id" component={Reset} />
            <Route exact path="/meeting" component={Meeting} />
            <Route exact path="/myMeetings/:id" component={MyMeetings} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </GlobalStateProvider>
  );
}

export default App;
