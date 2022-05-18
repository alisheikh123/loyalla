let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).data
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).data.token
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.data,
        token: action.payload.data.token,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "", 
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload.message
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};