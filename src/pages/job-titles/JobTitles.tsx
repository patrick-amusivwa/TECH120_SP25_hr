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

  const fetchJobTitles = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5158/api/v1/JobTitles'
      );
      const fetchedJobTitles = response.data;
      setJobTitles(fetchedJobTitles);
      console.log(fetchedJobTitles);
    } catch (error) {}
  };

  const fetchEmployeesByJobTitle = async (jobTitleId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5158/api/v1/Employees/JobTitle/${jobTitleId}`
      );
      const fetchedEmployees = response.data.data;
      setEmployees(fetchedEmployees);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  const handleJobTitleClick = (jobTitleId: number) => {
    setSelectedJobTitle(jobTitleId);
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
            <Button onClick={() => handleJobTitleClick(jobTitle.id)}>
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
