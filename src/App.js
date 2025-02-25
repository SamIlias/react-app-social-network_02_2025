import "./App.css";
import Header from "./components/Header/Header.jsx";
import LeftBar from "./components/LeftBar/LeftBar.jsx";
import Profile from "./components/Profile/Profile.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <LeftBar />
      <Profile />
    </div>
  );
}

export default App;
