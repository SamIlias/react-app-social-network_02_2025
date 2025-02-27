import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let dialogsData = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Andrew" },
  { id: 3, name: "Nastya" },
  { id: 4, name: "Victor" },
  { id: 5, name: "Bro" },
];

let messagesData = [
  { message: "Hello, my friend!" },
  { message: "Look at this!" },
  { message: "What in the world you doing!" },
];

const data = {
  dialogsData,
  messagesData,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
