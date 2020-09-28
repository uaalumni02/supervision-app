import { post } from "../utils/fetch";
import settings from "../config/configData";

const makeApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/user${path}`;
};

const login = async (username, password) => {
  const apiUrl = makeApiUrl("/login");
  const response = await post(apiUrl, { username, password });
  return response;
};

const register = async (username, firstName, lastName, password, email) => {
  const apiUrl = makeApiUrl("/");
  const response = await post(apiUrl, {
    username,
    firstName,
    lastName,
    password,
    email,
  });
  return response;
};

export default {
  login,
  register,
};


