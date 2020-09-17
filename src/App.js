import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from './Layout'

import Login from "./pages/Login";


function App() {
  return (
    <Layout>
      <BrowserRouter>
        {/* <UserContextProvider> */}
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        {/* </UserContextProvider> */}
      </BrowserRouter>
    </Layout>
  );
}

export default App;
