import fetch from "node-fetch";

export const post = async (url, body) => {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await res.json();
  return responseJson;
};

export const get = async (url, headers) => {
  //finish here
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: bearer,
    },
  });
  const responseJson = await res.json();
  return responseJson;
};

