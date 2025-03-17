import React from "react";
import Header from "./Header";
import { passAuthorization } from "../../redux/auth-reducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.passAuthorization();
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

export default connect(mapStateToProps, {
  passAuthorization,
})(HeaderContainer);
