import { combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import leftBarReducer from "./leftBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  leftBar: leftBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

Window.store = store;

export default store;
