import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

type PropsType = {
  isAuth: boolean;
  userName: string | null;
  logout: () => void;
};

const Header: React.FC<PropsType> = ({ isAuth, userName, logout }) => {
  return (
    <header className={s.header}>
      <img src={logo} alt="logo" />
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
