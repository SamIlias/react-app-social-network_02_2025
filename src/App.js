import "./App.css";
import Header from "./components/Header/Header.jsx";
import LeftBar from "./components/LeftBar/LeftBar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Dialogs from "./components/Dialogs/Dialogs.jsx";
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App({ data }) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <LeftBar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs/*" element={<Dialogs data={data} />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
