import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  EditButton,
  PageContainer,
  PageHeader,
} from './EmployeeDetails.styles';
import { TextField } from '@mui/material';
import {
  InputContainer,
  style,
  InputBox,
  FormBodyContainer,
  ButtonContainer,
} from '../../components/employee-form/EmployeeForm.styles';
import { Employee } from '../../interface/IEmployee';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/v1/Employees/${id}`
        );
        const fetchedEmployee = response.data.data;

        // Fetch department details
        if (fetchedEmployee.departmentId !== null) {
          const departmentResponse = await axios.get(
            `http://localhost:5158/api/v1/Departments/${fetchedEmployee.departmentId}`
          );
          fetchedEmployee.departmentName = departmentResponse.data.data.name;
        } else {
          fetchedEmployee.departmentName = null;
        }

        // Fetch job title details
        if (fetchedEmployee.jobTitleId !== null) {
          const jobTitleResponse = await axios.get(
            `http://localhost:5158/api/v1/JobTitles/${fetchedEmployee.jobTitleId}`
          );
          fetchedEmployee.jobTitleName = jobTitleResponse.data.data.title;
        } else {
          fetchedEmployee.jobTitleName = null;
        }

        setEmployee(fetchedEmployee);
        console.log('Employee:', fetchedEmployee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  return (
    <PageContainer>
      <PageHeader>Employee Details</PageHeader>
      <FormBodyContainer>
        <InputContainer sx={{ ...style, backgroundColor: 'white' }}>
          <InputBox>
            <TextField
              label="First Name"
              name="firstName"
              value={employee?.firstName}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={employee?.email}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Department"
              name="department"
              value={employee?.departmentName || ''}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Salary"
              name="salary"
              value={employee?.salary}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </InputBox>
        </InputContainer>
        <InputContainer sx={{ ...style, backgroundColor: 'white' }}>
          <InputBox>
            <TextField
              label=" Last Name"
              name="lastName"
              value={employee?.lastName}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={employee?.phoneNumber}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={employee?.jobTitleName || ''}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </InputBox>
        </InputContainer>
      </FormBodyContainer>
      <ButtonContainer>
        <EditButton variant="contained">Edit</EditButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default EmployeeDetails;
