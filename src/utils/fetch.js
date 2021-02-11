import fetch from "node-fetch";

export const post = async (url, body, header = {}) => {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(body),
  });
  const responseJson = await res.json();
  return responseJson;
};

export const get = async (url, headers = {}) => {
  const res = await fetch(url, {
    method: "get",
    headers,
  });
  const responseJson = await res.json();
  return responseJson;
};

export const deleteMeeting = async (url, headers = {}) => {
  const res = await fetch(url, {
    method: "delete",
    headers,
  });
  const responseJson = await res.json();
  return responseJson;
};


export const patch = async (url, body, header = {}) => {
  const res = await fetch(url, {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(body),
  });
  const responseJson = await res.json();
  return responseJson;
};
