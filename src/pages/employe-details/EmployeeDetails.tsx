import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import axiosInstance from '../../common/AxiosInstance';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | undefined>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(`/Employees/${id}`);
        const fetchedEmployee = response.data.data;

        // Fetch department details
        if (fetchedEmployee.departmentId !== null) {
          const departmentResponse = await axiosInstance.get(
            `/Departments/${fetchedEmployee.departmentId}`
          );
          fetchedEmployee.departmentName = departmentResponse.data.data.name;
        } else {
          fetchedEmployee.departmentName = null;
        }

        // Fetch job title details
        if (fetchedEmployee.jobTitleId !== null) {
          const jobTitleResponse = await axiosInstance.get(
            `/JobTitles/${fetchedEmployee.jobTitleId}`
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

  const handleUpdateEmployee = async () => {
    try {
      // Make an HTTP PUT request to update the employee details in the database
      await axiosInstance.put(`/Employees/${id}`, employee);
      console.log('Employee details updated successfully');
      // Once the update is successful, exit edit mode
      setEdit(false);
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee: Employee | undefined) => ({
      ...prevEmployee!,
      [name]: value,
    }));
  };
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
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={employee?.email}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Department"
              name="department"
              value={employee?.departmentName || ''}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Salary"
              name="salary"
              value={employee?.salary}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
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
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={employee?.phoneNumber}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={employee?.jobTitleName || ''}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!edit}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </InputBox>
        </InputContainer>
      </FormBodyContainer>
      <ButtonContainer>
        {edit ? (
          // Save button (visible in edit mode)
          <EditButton variant="contained" onClick={handleUpdateEmployee}>
            Save
          </EditButton>
        ) : (
          // Edit button (visible when not in edit mode)
          <EditButton variant="contained" onClick={() => setEdit(true)}>
            Edit
          </EditButton>
        )}
      </ButtonContainer>
    </PageContainer>
  );
};

export default EmployeeDetails;
