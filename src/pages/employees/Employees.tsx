import { ChangeEvent, useEffect, useState } from 'react';
import {
  PageContainer,
  PageHeader,
  PaginationContainer,
  StyledTableRow,
  TableHeader,
  TableItem,
} from './Employees.styles';
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
import {
  fetchDepartments,
  fetchEmployees,
  fetchJobTitles,
} from '../../helpers/api';
import { IEmployee, IDepartment, IJobTitle } from '../../interface/IEmployee';

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getDepartmentName = (
    departmentId: number | null,
    departments: IDepartment[]
  ) => {
    if (departmentId === null) {
      return 'N/A';
    }

    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : 'N/A';
  };

  const getJobTitle = (jobTitleId: number | null, jobTitles: IJobTitle[]) => {
    if (jobTitleId === null) {
      return 'N/A';
    }

    const jobTitle = jobTitles.find((title) => title.id === jobTitleId);
    return jobTitle ? jobTitle.title : 'N/A';
  };

  useEffect(() => {
    fetchEmployees().then((data) => setEmployees(data));
    fetchDepartments().then((data) => setDepartments(data));
    fetchJobTitles().then((data) => setJobTitles(data));
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
                      {getDepartmentName(employee.departmentId, departments)}
                    </TableItem>
                  </TableCell>
                  <TableCell>
                    <TableItem>
                      {getJobTitle(employee.jobTitleId, jobTitles)}
                    </TableItem>
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
