import fetch from "node-fetch";
import settings from "../config/configData";


const post = (body) => {
  const username = body.username;
  const password = body.password;
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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user._id);
    })
    .catch((error) => console.error("Error:", error));
};

export default post;
