import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../../components";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-rows: 56px 1fr;
  grid-template-columns: 80px 1fr 300px;
  grid-template-areas:
    "header header header"
    "sidebar main cart";
  height: 100vh;
`;

const AppNavbarWrapper = styled.header`
  grid-area: header;
`;

const SidebarContainer = styled.aside`
  grid-area: sidebar;
`;

const MainContent = styled.main`
  grid-area: main;
`;

const Cart = styled.aside`
  grid-area: cart;
  background-color: pink;
`;

function Dashboard() {
  return (
    <Layout>
      <AppNavbarWrapper>
        <Header />
      </AppNavbarWrapper>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <Outlet />
      </MainContent>
      <Cart></Cart>
    </Layout>
  );
}

export default Dashboard;
