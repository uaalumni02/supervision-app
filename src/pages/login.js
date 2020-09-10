import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import settings from "../config/configData"

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from "mdbreact";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [InvalidLogin, setInvalidLogin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (
          response.success === false ||
          response.data.user.role === "standard"
        ) {
          setInvalidLogin("Invalid username, password or pending approval");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user._id);
          setLoggedIn(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <MDBContainer>
      <br></br>
      <br></br> <br></br>
      <br></br>
      {loggedIn ? <Redirect to="/package/" /> : ""}
      <MDBRow className="d-flex justify-content-start">
        <MDBCol md="5" className="col-md-4 mx-auto">
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                icon="envelope"
                group
                // type="email"
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().trim())
                }
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                onChange={e => setPassword(e.target.value.trim())}
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={handleSubmit}>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Login;
