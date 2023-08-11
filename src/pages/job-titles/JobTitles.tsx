import { ChangeEvent, useEffect, useState } from 'react';
import {
  JobTitleContainer,
  JobTitlesContainer,
  PageContainer,
  PageHeader,
  PaginationContainer,
  Position,
  StyledTable,
  TableContainer,
  TableHeader,
} from './JobTitles.styles';
import {
  Button,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { IEmployee, IJobTitle } from '../../interface/IEmployee';
import { StyledTableRow, TableItem } from '../employees/Employees.styles';
import axiosInstance from '../../common/AxiosInstance';
import { fetchJobTitles } from '../../helpers/api';

const JobTitles = () => {
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<number | null>(null);
  const [activeJobTitle, setActiveJobTitle] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    fetchJobTitles().then((data) => setJobTitles(data));
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
      <JobTitlesContainer>
        {jobTitles.map((jobTitle) => (
          <JobTitleContainer
            key={jobTitle.id}
            onClick={() => handleJobTitleClick(jobTitle.id)}
            sx={{
              backgroundColor:
                jobTitle.id === activeJobTitle ? 'green' : 'transparent',
            }}
          >
            <Button>
              <Position>{jobTitle.title}</Position>
            </Button>
          </JobTitleContainer>
        ))}
      </JobTitlesContainer>
      {selectedJobTitle !== null && (
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

export default JobTitles;
