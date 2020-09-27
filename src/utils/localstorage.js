const storeToken = (response) => {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", response.data.user._id);
};

export default storeToken;
