// import s from "./LeftBar.module.css";
// import { NavLink } from "react-router-dom";
//
// type PropsType = {
//   items: Array<string>;
// };
//
// const Leftbar: React.FC<PropsType> = ({ items }) => {
//   const barItems = items.map((el) => {
//     const path = el.toLowerCase();
//     return (
//       <div key={el} className={s.item}>
//         <NavLink
//           to={`/${path}`}
//           className={({ isActive }) => (isActive ? s.activeLink : "")}
//         >
//           {el}
//         </NavLink>
//       </div>
//     );
//   });
//
//   return <nav className={s.leftBar}>{barItems}</nav>;
// };
//
// export default Leftbar;

import { Menu } from "antd";
import _ from "lodash";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

type PropsType = {
  items: Array<string>;
};

const Leftbar: React.FC<PropsType> = ({ items }) => {
  const barItems = items.map((el) => {
    const path = el.toLowerCase();
    return {
      key: _.uniqueId(),
      icon: <UserOutlined />,
      label: <NavLink to={`/${path}`}>{el}</NavLink>,
    };
  });

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[...barItems]}
    />
  );
};

export default Leftbar;
