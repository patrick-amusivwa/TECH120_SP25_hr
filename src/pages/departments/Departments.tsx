import { ChangeEvent, useEffect, useState } from 'react';
import {
  PageContainer,
  PageHeader,
  PaginationContainer,
} from './Departments.styles';
import axios from 'axios';
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Employee } from '../../interface/IEmployee';
import {
  TableHeader,
  StyledTableRow,
  TableItem,
} from '../employees/Employees.styles';

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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [activeDepartment, setActiveDepartment] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Departments'
      );
      const fetchedDepartments = response.data;
      setDepartments(fetchedDepartments);
    } catch (error) {}
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const fetchEmployeesByDepartment = async (departmentId: number) => {
    try {
      const response = await axios.get(
        `https://employee-management-backend2.azurewebsites.net/api/v1/Employees/department/${departmentId}`
      );
      const fetchedEmployees = response.data.data;
      setEmployees(fetchedEmployees);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDepartments();
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {departments.map((department) => (
          <Box
            key={department.id}
            onClick={() => handleDepartmentClick(department.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid white',
              m: 1,
              width: '300px',
              flexWrap: 'wrap',
              backgroundColor:
                department.id === activeDepartment ? 'green' : 'transparent',
            }}
          >
            <Button>
              <Typography sx={{ color: 'white' }}>{department.name}</Typography>
            </Button>
          </Box>
        ))}
      </Box>

      {selectedDepartment !== null && (
        <>
          <Box sx={{ m: 3, border: '1px solid white' }}>
            <Table>
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
            </Table>
          </Box>
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
