import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/redux-store";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { actions } from "./redux/app-reducer";
import { ConfigProvider } from "antd";

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

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <HashRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#177ddc",
            colorBgContainer: "#8c8c8c",
            colorText: "#ff9c6e",
            borderRadius: 8,
          },
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </HashRouter>,
  );
} else {
  console.error("Element with id 'root' did not find");
}
