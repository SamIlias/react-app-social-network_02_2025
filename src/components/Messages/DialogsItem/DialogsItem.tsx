import style from "../Messages.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number;
  name: string;
};

const DialogsItem: React.FC<PropsType> = ({ id, name }) => {
  const path = `/messages/${id}`;
  return (
    <div className={`${style.dialog}`}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? style.activeLink : "")}
      >
        {name}
      </NavLink>
    </div>
  );
};

export default DialogsItem;
