import {
  ALL_MATCHS_SUCCESS,
  ALL_MATCHS_REQUEST,
  ALL_MATCHS_FAIL,
  MATCH_DETAILS_REQUEST,
  MATCH_DETAILS_SUCCESS,
  MATCH_DETAILS_FAIL,
  ADMIN_MATCHS_REQUEST,
  ADMIN_MATCHS_FAIL,
  ADMIN_MATCHS_SUCCESS,
  DELETE_MATCH_SUCCESS,
  DELETE_MATCH_FAIL,
  DELETE_MATCH_RESET,
  DELETE_MATCH_REQUEST,
  UPDATE_MATCH_FAIL,
  UPDATE_MATCH_REQUEST,
  UPDATE_MATCH_RESET,
  UPDATE_MATCH_SUCCESS,
  NEW_MATCH_RESET,
  NEW_MATCH_FAIL,
  NEW_MATCH_REQUEST,
  NEW_MATCH_SUCCESS,
  CLEAR_ERRORS,
} from "./action-type";
import axios from "axios";
export const getMatchs = (
  keyword = "",
  currentPage = 1,
  price,
  categorie,
  rating = 0
) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_MATCHS_REQUEST,
    });
    let link = `/api/first-view/matchs?keyword=${keyword}&page=${currentPage}&price[lte]
    =${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
    if (categorie) {
      link = `/api/first-view/matchs?keyword=${keyword}&page=${currentPage}&price[lte]
    =${price[1]}&price[gte]=${price[0]}&categorie=${categorie}&rating[gte]=${rating}`;
    }
    const { data } = await axios.get(link);
    console.log("ddddddd", data);
    dispatch({
      type: ALL_MATCHS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MATCHS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getMatchDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MATCH_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/first-view/match/${id}`);
    dispatch({
      type: MATCH_DETAILS_SUCCESS,
      payload: data.thismatch,
    });
  } catch (error) {
    dispatch({
      type: MATCH_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminMatchs = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_MATCHS_REQUEST });

    const { data } = await axios.get(`/api/first-view/admin/matchs`);
    console.log(data, "from actionadmingetmatchs");
    dispatch({
      type: ADMIN_MATCHS_SUCCESS,
      payload: data.matchs,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_MATCHS_FAIL,
    });
  }
};
// admin delete match :
export const deleteMatch = (id) => async (dispatch) => {
  console.log("iddd", id);
  try {
    dispatch({ type: DELETE_MATCH_REQUEST });

    const {
      data,
    } = await axios.delete(
      `http://localhost:4000/api/first-view/admin/match/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    dispatch({
      type: DELETE_MATCH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MATCH_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update MATCH (ADMIN)
export const updateM = (id, matchData) => async (dispatch) => {
  console.log(id, "from update action");
  try {
    dispatch({ type: UPDATE_MATCH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/first-view/admin/match/${id}`,
      matchData,
      config
    );

    dispatch({
      type: UPDATE_MATCH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MATCH_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newMatch = (matchData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MATCH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/first-view/admin/match/new`,
      matchData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: NEW_MATCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_MATCH_FAIL,
      payload: error.response.data.message,
    });
  }
};
