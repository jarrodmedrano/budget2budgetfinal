import axios from "axios";
import * as types from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS } from "./types";

export const fetchExpenses = () => async dispatch => {
  const res = await axios.get("/api/provider/all");
  dispatch({ type: types.FETCH_PROVIDERS, payload: res.data });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/users/current");
  dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const loginUser = (values, history) => dispatch => {
  try {
    axios
      .post("/api/users/login", values)
      .then(res => {
        //save to local storage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        //set token to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded, history));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    // dispatch({ type: types.LOGIN_USER, payload: res.data });
    // dispatch(navigateTo("/calendar"));
    // history.push("/calendar");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Set Logged in User
export const setCurrentUser = (decoded, history) => dispatch => {
  dispatch({
    type: types.SET_CURRENT_USER,
    PAYLOAD: decoded
  });
  // dispatch(navigateTo("/calendar"));
  //   // history.push("/calendar");
};

export const registerUser = (values, history) => dispatch => {
  try {
    axios
      .post("/api/users/register", values)
      .then(res => dispatch({ type: types.REGISTER_USER, payload: res.data }))
      .then(dispatch(navigateTo("/calendar")))
      .then(history.push("/calendar"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// export const testUser = () => async dispatch => {
//   const res = await axios.post("/api/users/test");
//   dispatch({ type: types.TEST_USER, payload: res.data });
// };

export const navigateTo = path => async dispatch => {
  dispatch({ type: types.NAVIGATE_TO, payload: path });
};
