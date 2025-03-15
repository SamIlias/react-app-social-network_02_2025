import React from "react";
import Header from "./Header";
import { toggleIsFetching, setUserAuthData } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { authAPI } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);

    authAPI.getAuthData().then((data) => {
      this.props.toggleIsFetching(false);
      if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        this.props.setUserAuthData(id, login, email);
      }
    });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isFetching: state.auth.isFetching,
  };
};

export default connect(mapStateToProps, { toggleIsFetching, setUserAuthData })(
  HeaderContainer,
);
