import { Box } from '@mui/material';
import { PageContainer, PageHeader } from './AddEmployee.styles';
import EmployeeForm from '../../components/employee-form/EmployeeForm';
import { useEffect, useState } from 'react';
import {
  EmployeeData,
  IDepartment,
  IJobTitle,
} from '../../interface/IEmployee';
import {
  addEmployee,
  fetchDepartments,
  fetchEmployees,
  fetchJobTitles,
} from '../../helpers/api';

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
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);

  useEffect(() => {
    fetchDepartments().then((data) => setDepartments(data));
    fetchEmployees().then((data) => setEmployees(data));
    fetchJobTitles().then((data) => setJobTitles(data));
  }, []);

  const handleFormSubmit = (formData: EmployeeData) => {
    // Make a POST request to the API endpoint to add a new employee
    addEmployee(formData)
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
