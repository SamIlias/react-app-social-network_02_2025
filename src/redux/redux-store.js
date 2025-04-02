import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import leftBarReducer from "./leftBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import { thunk } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { compose, combineReducers, createStore, applyMiddleware } from "redux";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  leftBar: leftBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducers, applyMiddleware(thunk));

Window.store = store;

export default store;
