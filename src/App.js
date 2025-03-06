import "./App.css";
import Header from "./components/Header/Header.jsx";
import LeftBar from "./components/LeftBar/LeftBar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";
import MessagesContainer from "./components/Messages/MessagesContainer";

import { Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <LeftBar items={props.store.getState().leftbar.items} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/profile" element={<Profile store={props.store} />} />
          <Route
            path="/messages/*"
            element={<MessagesContainer store={props.store} />}
          />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
