import { createStore, applyMiddleware, combineReducers } from "redux";

import {
  matchsReducer,
  matchDetailsReducer,
  matchReducer,
  newMatchReducer,
} from "./Reducer/MatchReducer";
import {
  authReducer,
  allUsersReducer,
  userReducer,
} from "./Reducer/UserReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const reducer = combineReducers({
  matchs: matchsReducer,
  match: matchReducer,
  matchDetail: matchDetailsReducer,
  auth: authReducer,
  newMatch: newMatchReducer,
  allUsers: allUsersReducer,
  user: userReducer,
});
let initialState = {};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
