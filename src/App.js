import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./Layout";

import Login from "./pages/login";
import Register from "./pages/register";
import Supervision from "./pages/supervision";
import RequestToken from "./pages/RequestToken";
import Reset from "./pages/Reset";
import Meeting from "./pages/meeting";
import MyMeetings from "./pages/myMeetings"
import EditMeeting from "./pages/editMeeting"

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
            <Route exact path="/edit/:id" component={EditMeeting} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </GlobalStateProvider>
  );
}

export default App;
