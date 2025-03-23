import s from "./Header.module.css";
// import Preloader from "../common/Preloader";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://i.redd.it/p2ami7lbck681.jpg" alt="logo" />
      {props.isAuth ? (
        <div className={s.login}>
          <span>{props.login}</span>
          <button onClick={props.logout} className={s.login}>
            Log out
          </button>
        </div>
      ) : (
        <NavLink className={s.login} to="/login">
          Login
        </NavLink>
      )}
    </header>
  );
};

export default Header;
