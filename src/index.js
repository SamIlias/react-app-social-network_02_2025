import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/state";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rerenderEntireTree = (store) => {
  root.render(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>,
  );
};

rerenderEntireTree(store);

store.subscribe(rerenderEntireTree);
