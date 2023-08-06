import { Box } from '@mui/material';
import { PageContainer, PageHeader } from './AddEmployee.styles';
import EmployeeForm from '../../components/employee-form/EmployeeForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DepartmentData,
  EmployeeData,
  JobTitleData,
} from '../../interface/IEmployee';

const AddEmployee = () => {
  const [employees, setEmployees] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    salary: 0,
    departmentId: null,
    jobTitleId: null,
  });
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitleData[]>([]);

  useEffect(() => {
    // Fetch employee data
    axios
      .get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Employees'
      )
      .then((response) => {
        setEmployees(response.data);
      });

    // Fetch departments data
    axios
      .get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Departments'
      )
      .then((response) => {
        setDepartments(response.data);
      });

    // Fetch job titles data
    axios
      .get(
        'https://employee-management-backend2.azurewebsites.net/api/v1/JobTitles'
      )
      .then((response) => {
        setJobTitles(response.data);
      });
  }, []);

  const handleFormSubmit = (formData: EmployeeData) => {
    // Make a POST request to the API endpoint to add a new employee
    axios
      .post(
        'https://employee-management-backend2.azurewebsites.net/api/v1/Employees',
        formData
      )
      .then((response) => {
        console.log('Employee added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  return (
    <PageContainer>
      <PageHeader>Add New Employee</PageHeader>
      <Box>
        <EmployeeForm
          employees={employees}
          departments={departments}
          jobTitles={jobTitles}
          onSubmit={handleFormSubmit}
        />
      </Box>
    </PageContainer>
  );
};

export default AddEmployee;
