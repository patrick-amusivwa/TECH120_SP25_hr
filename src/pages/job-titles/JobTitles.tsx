import { useEffect, useState } from 'react';
import { PageContainer, PageHeader } from './JobTitles.styles';
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

export interface IJobTitle {
  id: number;
  title: string;
}

const JobTitles = () => {
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<number | null>(null);
  const [activeJobTitle, setActiveJobTitle] = useState<number | null>(null);

  const fetchJobTitles = async () => {
    try {
      const response = await axios.get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/JobTitles'
      );
      const fetchedJobTitles = response.data;
      setJobTitles(fetchedJobTitles);
    } catch (error) {}
  };

  const fetchEmployeesByJobTitle = async (jobTitleId: number) => {
    try {
      const response = await axios.get(
        `https://employee-management-backend2.azurewebsites.net/api/v1/Employees/JobTitle/${jobTitleId}`
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

export default JobTitles;
