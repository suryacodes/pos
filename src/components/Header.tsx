import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";

const Header = styled.div`
  grid-area: header;
  width: 100%;
`;

function AppNavbar() {
  return (
    <Header>
      <Navbar bg="light" data-theme="light">
        <Navbar.Brand style={{ marginLeft: 16 }}>Meat Pos</Navbar.Brand>
      </Navbar>
    </Header>
  );
}

export default AppNavbar;
