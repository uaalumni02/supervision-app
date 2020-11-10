const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGEDIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload,
      };
    case "SET_SUPERVISION_DATA":
      return {
        ...state,
        supervisions: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null,
        supervisions: null,
      };
    default:
      return state;
  }
};

export default reducer;
