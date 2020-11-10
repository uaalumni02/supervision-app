const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  export default logOut