import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import leftBarReducer from "./leftBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import { thunk, ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
  Action,
} from "redux";
import { chatReducer } from "./chat-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  leftBar: leftBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
//@ts-ignore
Window.store = store;

export default store;

// types -----------------------------------------
export type BaseThunkType<
  A extends Action,
  R = Promise<void> | void,
> = ThunkAction<R, AppStateType, unknown, A>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any },
> = ReturnType<PropertiesTypes<T>>;

export type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
