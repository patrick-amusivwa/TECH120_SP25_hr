import {
  Logo,
  LogoContainer,
  MenuContainer,
  MenuItem,
  SidebarContainer,
} from './Sidebar.styles';
import { FaHouse, FaStaylinked, FaUserPlus, FaBuilding } from 'react-icons/fa6';
import { HiBriefcase, HiUserGroup } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo>
          <FaStaylinked />
          HR
        </Logo>
      </LogoContainer>
      <MenuContainer
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        <FaHouse />
        <MenuItem> HOME</MenuItem>
      </MenuContainer>
      <MenuContainer
        to="/add-employee"
        className={location.pathname === '/add-employee' ? 'active' : ''}
      >
        <FaUserPlus />
        <MenuItem> ADD EMPLOYEE</MenuItem>
      </MenuContainer>
      <MenuContainer
        to="/employees"
        className={location.pathname === '/employees' ? 'active' : ''}
      >
        <HiUserGroup />
        <MenuItem> EMPLOYEES</MenuItem>
      </MenuContainer>
      <MenuContainer
        to="/departments"
        className={location.pathname === '/departments' ? 'active' : ''}
      >
        <FaBuilding />
        <MenuItem> DEPARTMENTS</MenuItem>
      </MenuContainer>
      <MenuContainer
        to="/job-titles"
        className={location.pathname === '/job-titles' ? 'active' : ''}
      >
        <HiBriefcase />
        <MenuItem> JOB TITLES</MenuItem>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
