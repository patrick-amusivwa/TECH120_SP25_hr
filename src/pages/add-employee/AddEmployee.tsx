import { Box } from '@mui/material';
import { PageContainer, PageHeader } from './AddEmployee.styles';
import EmployeeForm from '../../components/employee-form/EmployeeForm';
import { useEffect, useState } from 'react';
import {
  DepartmentData,
  EmployeeData,
  JobTitleData,
} from '../../interface/IEmployee';
import axiosInstance from '../../common/AxiosInstance';

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
    axiosInstance.get('/Employees').then((response) => {
      setEmployees(response.data);
    });

    // Fetch departments data
    axiosInstance.get('/Departments').then((response) => {
      setDepartments(response.data);
    });

    // Fetch job titles data
    axiosInstance.get('/JobTitles').then((response) => {
      setJobTitles(response.data);
    });
  }, []);

  const handleFormSubmit = (formData: EmployeeData) => {
    // Make a POST request to the API endpoint to add a new employee
    axiosInstance
      .post('/Employees', formData)
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
