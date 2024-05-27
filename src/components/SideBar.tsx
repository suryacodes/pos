import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  gap: 45px;
  padding-top: 45px;
  border-right: 1px solid #cecece;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <NavLink to="/dashboard">
        <DashboardIcon />
      </NavLink>
      <NavLink to="/dashboard/products">
        <ShoppingCartIcon />
      </NavLink>
      <NavLink to="/dashboard/order-history">
        <HistoryIcon />
      </NavLink>
    </SidebarWrapper>
  );
};

export default Sidebar;
