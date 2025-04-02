import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = ({ isAuth, userName, logout }) => {
  return (
    <header className={s.header}>
      <img src="https://i.redd.it/p2ami7lbck681.jpg" alt="logo" />
      {isAuth ? (
        <div className={s.login}>
          <span>
            <span className={s.userName}>{userName}</span>
            <button onClick={logout}>Log out</button>
          </span>
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
