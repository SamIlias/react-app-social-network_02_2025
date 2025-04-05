import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LeftbarContainer from "./components/LeftBar/LeftBarContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import React, { lazy, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp, setGlobalError } from "./redux/app-reducer";
import { withSuspense } from "./hoc/withSuspense";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import MessagesContainer from "./components/Messages/MessagesContainer";
const MessagesContainer = lazy(
  () => import("./components/Messages/MessagesContainer"),
);
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer"),
);

export function MyApp({ globalError, setGlobalError }) {
  useEffect(() => {
    if (globalError) {
      alert(globalError);
      setGlobalError(null);
    }
  }, [globalError, setGlobalError]);

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <LeftbarContainer />
      <div className="app-wrapper-content">
        <Routes>
          <Route exact path="/" element={withSuspense(ProfileContainer)} />
          <Route
            path="/profile/:userId?"
            element={withSuspense(ProfileContainer)}
          />
          <Route
            path="/users"
            element={<UsersContainer pageTitle="Samurais" />}
          />
          <Route path="/messages/*" element={withSuspense(MessagesContainer)} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  globalError: state.app.globalError,
});

export default connect(mapStateToProps, { setGlobalError })(MyApp);
// export default compose(connect(mapStateToProps, { initializeApp })(myApp));
