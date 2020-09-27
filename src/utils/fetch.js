import fetch from "node-fetch";
import storeToken from "../utils/localstorage";

const post = async (url, body) => {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await res.json();
  if(responseJson) {
    storeToken(responseJson)
  }
  return responseJson;
};

export default post;
