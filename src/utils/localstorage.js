
const save = (key, data) => {
  localStorage.setItem(key, data);
}


const remove = (key) => {
  localStorage.removeItem(key);
}

const get = (key) => {
  const value = localStorage.getItem(key)
  return value
}

// const storeToken = (response) => {
//   console.log(response);
//   console.log(response)
//   localStorage.setItem("token", response.userdata.token);
//   localStorage.setItem("user", response.userdata.userId);
// };

export default {
  get,
  save,
  remove,
}
