import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/redux-store";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { actions } from "./redux/app-reducer";

// Global error listener
window.addEventListener("error", (event) => {
  console.error("Global Error Caught:", event.message);
  store.dispatch(actions.setGlobalError(event.message));
});

// Global unhandled promise rejection listener
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
  store.dispatch(actions.setGlobalError(event.reason.toString()));
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);
