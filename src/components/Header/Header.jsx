import s from "./Header.module.css";
import Preloader from "../common/Preloader";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  debugger;
  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <header className={s.header}>
          <img src="https://i.redd.it/p2ami7lbck681.jpg" alt="logo" />
          <span>User name</span>
          {props.isAuth ? (
            <span>{props.login}</span>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
