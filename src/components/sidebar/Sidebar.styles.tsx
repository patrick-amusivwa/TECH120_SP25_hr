import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: #1e1c1c;
  float: left;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  padding: 10px;
  border: 1px solid white;
  width: 200px;
  height: 100px;
  margin: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
`;

export const MenuContainer = styled(Link)`
  padding: 10px;
  border: 1px solid white;
  margin: 10px;

  display: flex;
  align-items: center;
  width: 200px;
  text-decoration: none;
  color: white;
`;

export const MenuItem = styled.div`
  padding: 0 10px;
`;
