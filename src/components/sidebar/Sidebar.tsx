import {
  Logo,
  LogoContainer,
  MenuContainer,
  MenuItem,
  SidebarContainer,
} from './Sidebar.styles';
import { FaHouse, FaStaylinked, FaUserPlus, FaBuilding } from 'react-icons/fa6';
import { HiBriefcase, HiUserGroup } from 'react-icons/hi';
const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo>
          <FaStaylinked />
          HR
        </Logo>
      </LogoContainer>
      <MenuContainer to="/">
        <FaHouse />
        <MenuItem> HOME</MenuItem>
      </MenuContainer>
      <MenuContainer to="/add-employee">
        <FaUserPlus />
        <MenuItem> ADD EMPLOYEE</MenuItem>
      </MenuContainer>
      <MenuContainer to="/employees">
        <HiUserGroup />
        <MenuItem> EMPLOYEES</MenuItem>
      </MenuContainer>
      <MenuContainer to="/departments">
        <FaBuilding />
        <MenuItem> DEPARTMENTS</MenuItem>
      </MenuContainer>
      <MenuContainer to="/job-titles">
        <HiBriefcase />
        <MenuItem> JOB TITLES</MenuItem>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
