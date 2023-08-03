import { useEffect, useState } from 'react';
import { PageContainer, PageHeader } from './Departments.styles';
import axios from 'axios';
import {
  Box,
  Button,
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
  const [firstDepartmentId, setFirstDepartmentId] = useState<number | null>(
    null
  );

  // const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5158/api/v1/Departments'
      );
      const fetchedDepartments = response.data;
      setDepartments(fetchedDepartments);

      if (fetchedDepartments.length > 0) {
        const firstDepartment = fetchedDepartments[0];
        setFirstDepartmentId(firstDepartment.id);
      }
    } catch (error) {}
  };

  const fetchEmployeesByDepartment = async (departmentId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5158/api/v1/Employees/department/${departmentId}`
      );
      const fetchedEmployees = response.data.data;
      setEmployees(fetchedEmployees);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (firstDepartmentId !== null) {
      // Fetch employees for the first department when the component loads
      fetchEmployeesByDepartment(firstDepartmentId);
      setSelectedDepartment(firstDepartmentId); // Set the first department as the default selection
    }
  }, [firstDepartmentId]);

  const handleDepartmentClick = (departmentId: number) => {
    setSelectedDepartment(departmentId);
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
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid white',
              m: 1,
              width: '300px',
              flexWrap: 'wrap',
            }}
          >
            <Button onClick={() => handleDepartmentClick(department.id)}>
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
                {employees.map((employee) => (
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
    </PageContainer>
  );
};

export default Departments;
