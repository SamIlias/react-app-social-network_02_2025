import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LeftbarContainer from "./components/LeftBar/LeftBarContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersContainer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import React, { lazy, useEffect, useState } from "react";
import { connect } from "react-redux";
import { actions } from "./redux/app-reducer";
import { withSuspense } from "./hoc/withSuspense";
import { AppStateType } from "./redux/redux-store";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, theme } from "antd";
import { Footer } from "antd/es/layout/layout";

const MessagesContainer = lazy(
  () => import("./components/Messages/MessagesContainer"),
);
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer"),
);

const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"));

type PropsType = {
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
};

const mapStateToProps = (state: AppStateType) => ({
  globalError: state.app.globalError,
});

const setGlobalError = actions.setGlobalError;
export default connect(mapStateToProps, { setGlobalError })(MyApp);

const { Header, Sider, Content } = Layout;

function MyApp({ globalError, setGlobalError }: PropsType): React.ReactElement {
  useEffect(() => {
    if (globalError) {
      alert(globalError);
      setGlobalError(null);
    }
  }, [globalError, setGlobalError]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <LeftbarContainer />
      </Sider>
      <Layout>
        <HeaderContainer />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={withSuspense(ProfileContainer)} />
            <Route
              path="/profile/:userId?"
              element={withSuspense(ProfileContainer)}
            />
            <Route path="/users" element={<UsersPage pageTitle="Samurais" />} />
            <Route
              path="/messages/*"
              element={withSuspense(MessagesContainer)}
            />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={withSuspense(ChatPage)} />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Samovich Ilya react project.
        </Footer>
      </Layout>
    </Layout>
  );
}
