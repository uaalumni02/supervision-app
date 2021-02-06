import { post, get, deleteMeeting } from "../utils/fetch";

import settings from "../config/configData";

const makeApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/user${path}`;
};

const supervisionApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/meeting${path}`;
};
const resetApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/reset`;
};

const resetPasswordApiUrl = (path) => {
  return `${settings.apiBaseUrl}/api/updatePassword${path}`;
};

const submitMeetingApiUrl = () => {
  return `${settings.apiBaseUrl}/api/meeting`;
};

const userApiUrl = () => {
  return `${settings.apiBaseUrl}/api/user`;
};

const meetingIdUrl = (path) => {
  return `${settings.apiBaseUrl}/api/meetingId${path}`;
};

const signApiUrl = () => {
  return `${settings.apiBaseUrl}/api/approval`;
};

const deleteMeetingApiUrl = (path) => {
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
    ...user,
  });

  return response;
};

const supervisionUnitsApiUrl = () => {
  return `${settings.apiBaseUrl}/api/supervisionUnits`;
};

const supervision = async (user) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = supervisionApiUrl("/" + user);
  const response = await get(apiUrl, headers);
  return response;
};
const resetToken = async (email) => {
  const apiUrl = resetApiUrl("/");
  const response = await post(apiUrl, { email });
  return response;
};
const resetPassword = async (passwordData, id) => {
  const apiUrl = resetPasswordApiUrl("/" + id);
  const response = await post(apiUrl, { ...passwordData });
  return response;
};

const supervisionUnits = async (user) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = supervisionUnitsApiUrl("/");
  const response = await get(apiUrl, headers);
  return response;
};

const submitMeetingData = async (meetingData) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = submitMeetingApiUrl("/");
  const response = await post(apiUrl, { ...meetingData }, headers);
  return response;
};

const userData = async (user) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = userApiUrl("/");
  const response = await get(apiUrl, headers);
  return response;
};

const mySupervisions = async (id) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = meetingIdUrl("/" + id);
  const response = await get(apiUrl, headers);
  return response;
};

const submitSignatureData = async (meetingId, userId) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = signApiUrl("/");
  const response = await post(apiUrl, { meetingId, userId }, headers);
  return response;
};
const getSignedNoteData = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = signApiUrl("/");
  const response = await get(apiUrl, headers);
  return response;
};

const deleteSupervisions = async (id) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const headers = { Authorization: bearer };
  const apiUrl = deleteMeetingApiUrl("/" + id);
  const response = await deleteMeeting(apiUrl, headers);
  return response;
};

export default {
  login,
  register,
  supervision,
  resetToken,
  resetPassword,
  supervisionUnits,
  submitMeetingData,
  userData,
  mySupervisions,
  submitSignatureData,
  getSignedNoteData,
  deleteSupervisions,
};
