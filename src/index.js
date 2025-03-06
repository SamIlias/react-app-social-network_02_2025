import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rerenderEntireTree = (store) => {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App store={store} />
      </BrowserRouter>
    </Provider>,
  );
};

rerenderEntireTree(store);

store.subscribe(() => {
  rerenderEntireTree(store);
});

Window.store = store;
