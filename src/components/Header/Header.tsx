import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { Button, Flex, Layout, theme } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

type PropsType = {
  isAuth: boolean;
  userName: string | null;
  logout: () => void;
};

// const Header: React.FC<PropsType> = ({ isAuth, userName, logout }) => {
//   return (
//     <header className={s.header}>
//       <img src={logo} alt="logo" />
//       {isAuth ? (
//         <div className={s.login}>
//           <span>
//             <span className={s.userName}>{userName}</span>
//             <button onClick={logout}>Log out</button>
//           </span>
//         </div>
//       ) : (
//         <NavLink className={s.login} to="/login">
//           Login
//         </NavLink>
//       )}
//     </header>
//   );
// };

const { Header } = Layout;

const MyHeader: React.FC<PropsType> = ({ isAuth, userName, logout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header style={{ padding: 0, background: "#ad2102" }}>
      <Flex vertical={false}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
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
      </Flex>
    </Header>
  );
};

export default MyHeader;
