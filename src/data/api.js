

import { post, get } from "../utils/fetch";
import settings from "../config/configData";

const makeApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/user${path}`;
};

const supervisionApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/meeting${path}`;
};

const login = async (username, password) => {
  const apiUrl = makeApiUrl("/login");
  const response = await post(apiUrl, { username, password });
  return response;
};

const register = async (user) => {
  const apiUrl = makeApiUrl("/");
  const response = await post(apiUrl, {
   ...user
  });

  return response;
};

const supervision = async (user) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer }
  const apiUrl = supervisionApiUrl("/" + user);
  const response = await get(apiUrl, headers);
  return response;
};

export default {
  login,
  register,
  supervision
};

