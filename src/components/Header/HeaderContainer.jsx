import React from "react";
import Header from "./Header";
import { toggleIsFetching, setUserAuthData } from "../../redux/auth-reducer";
import axios from "axios";
import { connect } from "react-redux";

const authURL = "https://social-network.samuraijs.com/api/1.0/auth/me";
const myToken = "d1b85f17-f896-4ab1-9620-e52c1a1b76de";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(authURL, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${myToken}`,
          // "API-KEY": "2b7e60d1-cad9-40de-ba72-3c99a63263c4",
        },
      })
      .then((response) => {
        this.props.toggleIsFetching(false);
        if (response.data.resultCode === 0) {
          const { id, login, email } = response.data.data;
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
