import style from "../Messages.module.css";
import { NavLink } from "react-router-dom";

const DialogsItem = (props) => {
  const path = `/messages/${props.id}`;
  return (
    <div className={`${style.dialog}`}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? style.activeLink : "")}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogsItem;
