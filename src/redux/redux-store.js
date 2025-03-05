import { combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import leftbarReducer from "./leftbar-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  leftbar: leftbarReducer,
});

const store = createStore(reducers);

export default store;
