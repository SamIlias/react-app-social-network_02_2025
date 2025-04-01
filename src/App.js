import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LeftbarContainer from "./components/LeftBar/LeftBarContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import React, { lazy } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { withSuspense } from "./hoc/withSuspense";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import MessagesContainer from "./components/Messages/MessagesContainer";
const MessagesContainer = lazy(
  () => import("./components/Messages/MessagesContainer"),
);
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer"),
);

// import Preloader from "./components/common/Preloader";

export class myApp extends React.Component {
  // componentDidMount() {
  //   this.props.initializeApp();
  // }

  render() {
    // if (!this.props.initialised) {
    //   return <Preloader />;
    // }

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
            <Route path="/users" element={<UsersContainer />} />
            <Route
              path="/messages/*"
              element={withSuspense(MessagesContainer)}
            />
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
}

const mapStateToProps = (state) => ({
  initialised: state.app.initialised,
});

export default compose(connect(mapStateToProps, { initializeApp })(myApp));
