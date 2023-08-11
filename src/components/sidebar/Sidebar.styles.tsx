import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoints as bp } from '../../utils/layout';

export const SidebarContainer = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: #1e1c1c;
  float: left;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${bp.sm}) {
    width: 15vw;
  }
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

  @media (max-width: ${bp.sm}) {
    width: 50px;
    height: 50px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: 700;

  @media (max-width: ${bp.sm}) {
    font-size: 13px;
  }
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

  @media (max-width: ${bp.sm}) {
    width: 40px;
    height: 40px;
    justify-content: center;
  }
`;

export const MenuItem = styled.div`
  padding: 0 10px;

  @media (max-width: ${bp.sm}) {
    display: none;
  }
`;
