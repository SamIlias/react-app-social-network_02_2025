import s from "./LeftBar.module.css";
import { NavLink } from "react-router-dom";

const Leftbar = ({ items }) => {
  const barItems = items.map((el) => {
    const path = el.toLowerCase();

    return (
      <div className={s.item}>
        <NavLink
          to={`/${path}`}
          className={({ isActive }) => (isActive ? s.activeLink : "")}
        >
          {el}
        </NavLink>
      </div>
    );
  });

  return <nav className={s.leftBar}>{barItems}</nav>;
};

export default Leftbar;
