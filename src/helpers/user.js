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

const register = async (username, firstName, lastName, confirmPassword, password, email) => {
  const apiUrl = makeApiUrl("/");
  const response = await post(apiUrl, {
    username,
    firstName,
    lastName,
    confirmPassword,
    password,
    email,
  });
  return response;
};

const supervision = async (user) => {
  console.log(user)
  const apiUrl = supervisionApiUrl("/" + user);
  const response = await get(apiUrl);
  return response;
};

export default {
  login,
  register,
  supervision
};


