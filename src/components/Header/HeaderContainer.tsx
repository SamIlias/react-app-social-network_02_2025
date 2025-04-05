import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean;
  userName: string | null;
};

type MapDispatchPropsType = {
  logout: () => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const HeaderContainer: React.FC<PropsType> = ({ isAuth, userName, logout }) => {
  return <Header isAuth={isAuth} userName={userName} logout={logout} />;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    userName: state.auth.login,
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  logout,
})(HeaderContainer);
