import { ChangeEvent, useEffect, useState } from 'react';
import {
  Department,
  DepartmentContainer,
  DepartmentsContainer,
  PageContainer,
  PageHeader,
  PaginationContainer,
  StyledTable,
  TableContainer,
  TableHeader,
} from './Departments.styles';
import {
  Button,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { StyledTableRow, TableItem } from '../employees/Employees.styles';
import axiosInstance from '../../common/AxiosInstance';
import { fetchDepartments } from '../../helpers/api';
import { IEmployee } from '../../interface/IEmployee';

export interface IDepartment {
  id: number;
  name: string;
}

export interface IJobTitle {
  id: number;
  title: string;
}

const Departments = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [activeDepartment, setActiveDepartment] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const fetchEmployeesByDepartment = async (departmentId: number) => {
    try {
      const response = await axiosInstance.get(
        `/Employees/department/${departmentId}`
      );
      const fetchedEmployees = response.data.data;
      setEmployees(fetchedEmployees);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDepartments().then((data) => setDepartments(data));
  }, []);

  useEffect(() => {
    if (departments.length > 0) {
      // Set the first department as the active department by default
      setActiveDepartment(departments[0].id);
      setSelectedDepartment(departments[0].id); // Set the first department as selected when component loads
      fetchEmployeesByDepartment(departments[0].id); // Fetch employees for the first department when component loads
    }
  }, [departments]);

  const handleDepartmentClick = (departmentId: number) => {
    setSelectedDepartment(departmentId);
    setActiveDepartment(departmentId);
    fetchEmployeesByDepartment(departmentId);
  };

  return (
    <PageContainer>
      <PageHeader>Departments</PageHeader>
      <DepartmentsContainer>
        {departments.map((department) => (
          <DepartmentContainer
            key={department.id}
            onClick={() => handleDepartmentClick(department.id)}
            sx={{
              backgroundColor:
                department.id === activeDepartment ? 'green' : 'transparent',
            }}
          >
            <Button>
              <Department>{department.name}</Department>
            </Button>
          </DepartmentContainer>
        ))}
      </DepartmentsContainer>

      {selectedDepartment !== null && (
        <>
          <TableContainer>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableHeader>Last Name</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>First Name</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>Email</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>Phone Number</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>Salary</TableHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentEmployees.map((employee) => (
                  <StyledTableRow key={employee.id}>
                    <TableCell>
                      <TableItem>{employee.lastName}</TableItem>
                    </TableCell>
                    <TableCell>
                      <TableItem>{employee.firstName}</TableItem>
                    </TableCell>
                    <TableCell>
                      <TableItem> {employee.email}</TableItem>
                    </TableCell>
                    <TableCell>
                      <TableItem> {employee.phoneNumber}</TableItem>
                    </TableCell>
                    <TableCell>
                      <TableItem> {employee.salary}</TableItem>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </>
      )}
      <PaginationContainer>
        <Pagination
          count={Math.ceil(employees.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ backgroundColor: 'white' }}
        />
      </PaginationContainer>
    </PageContainer>
  );
};

export default Departments;
