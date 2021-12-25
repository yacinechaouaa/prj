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
} from "../actions/action-type";

export const matchsReducer = (state = { matchs: [] }, action) => {
  switch (action.type) {
    case ALL_MATCHS_REQUEST:
    case ADMIN_MATCHS_REQUEST:
      return { loading: true, matchs: [] };
    case ALL_MATCHS_SUCCESS:
      return {
        loading: false,
        matchs: action.payload.matchs,
        matchCount: action.payload.matchCount,
        resPerPage: action.payload.resPerPage,
      };
    case ADMIN_MATCHS_SUCCESS:
      return {
        loading: false,
        matchs: action.payload,
      };
    case ALL_MATCHS_FAIL:
    case ADMIN_MATCHS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const matchDetailsReducer = (state = { Match: {} }, action) => {
  switch (action.type) {
    case MATCH_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MATCH_DETAILS_SUCCESS:
      return {
        loading: false,
        Match: action.payload,
      };
    case MATCH_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const matchReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MATCH_REQUEST:
    case UPDATE_MATCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_MATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_MATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_MATCH_FAIL:
    case UPDATE_MATCH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_MATCH_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_MATCH_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const newMatchReducer = (state = { match: {} }, action) => {
  switch (action.type) {
    case NEW_MATCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_MATCH_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        match: action.payload.match,
      };

    case NEW_MATCH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_MATCH_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
