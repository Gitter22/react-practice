import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <h3 className="mt-2">
          <Link to="/">React Practice</Link>
        </h3>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className="p-3 text-center fixed-bottom">
        Agile Infoways Pvt Ltd.
      </Footer>
    </Layout>
  );
};

export default AppLayout;
