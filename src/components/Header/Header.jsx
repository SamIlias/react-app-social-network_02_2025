import s from "./Header.module.css";
// import Preloader from "../common/Preloader";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://i.redd.it/p2ami7lbck681.jpg" alt="logo" />
      {props.isAuth ? (
        <span className={s.login}>{props.login}</span>
      ) : (
        <NavLink className={s.login} to="/login">
          Login
        </NavLink>
      )}
    </header>
  );
};

export default Header;
