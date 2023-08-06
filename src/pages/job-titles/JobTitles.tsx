import { ChangeEvent, useEffect, useState } from 'react';
import {
  PageContainer,
  PageHeader,
  PaginationContainer,
} from './JobTitles.styles';
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
import axiosInstance from '../../common/AxiosInstance';

export interface IJobTitle {
  id: number;
  title: string;
}

const JobTitles = () => {
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<number | null>(null);
  const [activeJobTitle, setActiveJobTitle] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchJobTitles = async () => {
    try {
      const response = await axiosInstance.get('/JobTitles');
      const fetchedJobTitles = response.data;
      setJobTitles(fetchedJobTitles);
    } catch (error) {}
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const fetchEmployeesByJobTitle = async (jobTitleId: number) => {
    try {
      const response = await axiosInstance.get(
        `/Employees/JobTitle/${jobTitleId}`
      );
      const fetchedEmployees = response.data.data;
      setEmployees(fetchedEmployees);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  useEffect(() => {
    if (jobTitles.length > 0) {
      // Set the first department as the active department by default
      setActiveJobTitle(jobTitles[0].id);
      setSelectedJobTitle(jobTitles[0].id); // Set the first department as selected when component loads
      fetchEmployeesByJobTitle(jobTitles[0].id); // Fetch employees for the first department when component loads
    }
  }, [jobTitles]);

  const handleJobTitleClick = (jobTitleId: number) => {
    setSelectedJobTitle(jobTitleId);
    setActiveJobTitle(jobTitleId);
    fetchEmployeesByJobTitle(jobTitleId);
  };

  return (
    <PageContainer>
      <PageHeader>Job Titles</PageHeader>
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
        {jobTitles.map((jobTitle) => (
          <Box
            key={jobTitle.id}
            onClick={() => handleJobTitleClick(jobTitle.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid white',
              m: 1,
              width: '300px',
              flexWrap: 'wrap',
              backgroundColor:
                jobTitle.id === activeJobTitle ? 'green' : 'transparent',
            }}
          >
            <Button>
              <Typography sx={{ color: 'white' }}>{jobTitle.title}</Typography>
            </Button>
          </Box>
        ))}
      </Box>
      {selectedJobTitle !== null && (
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

export default JobTitles;
