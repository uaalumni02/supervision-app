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
  console.log(responseJson)
  return responseJson;
};

export const get = async (url, headers) => {
 //finish here
}






