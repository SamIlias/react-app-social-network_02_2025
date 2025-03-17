import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LeftbarContainer from "./components/LeftBar/LeftBarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";

function App(props) {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <LeftbarContainer />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/messages/*" element={<MessagesContainer />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
