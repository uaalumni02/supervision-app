import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from './Layout'

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        {/* <UserContextProvider> */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        {/* </UserContextProvider> */}
      </BrowserRouter>
    </Layout>
  );
}

export default App;
