import { ChangeEvent, useEffect, useState } from 'react';
import {
  PageContainer,
  PageHeader,
  PaginationContainer,
  StyledTableRow,
  TableHeader,
  TableItem,
} from './Employees.styles';
import axios from 'axios';
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
  jobTitleId: number;
  departmentName: string;
  jobTitleName: string;
  employmentStartDate: Date;
  salary: number;
}

interface IDepartment {
  id: number;
  name: string;
}

interface IJobTitle {
  id: number;
  title: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Employees'
      );

      const fetchedEmployees = response.data;
      setEmployees(fetchedEmployees);
      console.table(fetchedEmployees);
    } catch (error) {}
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  const getJobTitle = (jobTitleId: number) => {
    const jobTitle = jobTitles.find((title) => title.id === jobTitleId);
    return jobTitle ? jobTitle.title : 'Unknown Job Title';
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Departments'
      );

      const fetchedDepartments = response.data;
      setDepartments(fetchedDepartments);
      console.log(fetchedDepartments);
    } catch (error) {}
  };

  const fetchJobTitles = async () => {
    try {
      const response = await axios.get(
        'https://employee-management-backend2.azurewebsites.net/api/v1//JobTitles'
      );

      const fetchedJobTitles = response.data;
      setJobTitles(fetchedJobTitles);
      console.log(fetchedJobTitles);
    } catch (error) {}
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchJobTitles();
  }, []);

  return (
    <>
      <PageContainer>
        <PageHeader>Employees</PageHeader>
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
                  <TableHeader>Department</TableHeader>
                </TableCell>
                <TableCell>
                  <TableHeader>Position</TableHeader>
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
                    <Link to={`/employees/${employee.id}`}>
                      <TableItem>{employee.lastName}</TableItem>
                    </Link>
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
                    <TableItem>
                      {getDepartmentName(employee.departmentId)}
                    </TableItem>
                  </TableCell>
                  <TableCell>
                    <TableItem> {getJobTitle(employee.jobTitleId)}</TableItem>
                  </TableCell>
                  <TableCell>
                    <TableItem> {employee.salary}</TableItem>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <PaginationContainer>
          <Pagination
            count={Math.ceil(employees.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ backgroundColor: 'white' }}
          />
        </PaginationContainer>
      </PageContainer>
      ;
    </>
  );
};

export default Employees;
