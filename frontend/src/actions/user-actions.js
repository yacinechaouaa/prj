import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
} from "./action-type";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  console.log("hhhhhhhhhhhh", email);
  console.log("hhhhhhhhhhhh", password);

  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    /* const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }; */
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        //400"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/first-view/login",
      {
        email,
        password,
      },
      config
    );

    console.log("dataaa", data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log("eeeeeerrr", error.response);
    dispatch({
      type: LOGIN_FAIL,
      // payload: error.response.data.message,
    });
  }
};
export const register = (userData) => async (dispatch) => {
  console.log("from action", userData);
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "/api/first-view/register",
      userData,
      config
    );
    console.log(data, "data");

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const Loaduser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });
    const { data } = await axios.get("/api/first-view/me");
    console.log(data, "data");

    dispatch({
      type: LOAD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};
// logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/first-view/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    console.log("from allUsers");

    const { data } = await axios.get(
      "http://localhost:4000/api/first-view/admin/allUsers",
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      "/api/first-view/me/update",
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
