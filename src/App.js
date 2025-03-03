import "./App.css";
import Header from "./components/Header/Header.jsx";
import LeftBar from "./components/LeftBar/LeftBar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Messages from "./components/Messages/Messages.jsx";
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";

import { Routes, Route } from "react-router-dom";

function App({ store }) {
  return (
    <div className="app-wrapper">
      <Header />
      <LeftBar items={store._state.leftBar.items} />
      <div className="app-wrapper-content">
        <Routes>
          <Route
            path="/profile"
            element={
              <Profile
                data={store._state.profilePageData}
                addPost={store.addPost.bind(store)}
                updateNewPostText={store.updateNewPostText.bind(store)}
              />
            }
          />
          <Route
            path="/messages/*"
            element={
              <Messages
                data={store._state.messagesPageData}
                updateNewMessageText={store.updateNewMessageText.bind(store)}
                addMessage={store.addMessage.bind(store)}
              />
            }
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
