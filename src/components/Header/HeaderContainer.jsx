import React from "react";
import Header from "./Header";
import { logout, passAuthorization } from "../../redux/auth-reducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    isFetching: state.auth.isFetching,
  };
};

export default connect(mapStateToProps, {
  passAuthorization,
  logout,
})(HeaderContainer);
