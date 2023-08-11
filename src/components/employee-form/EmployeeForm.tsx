import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Box,
} from '@mui/material';
import {
  ButtonContainer,
  FormBodyContainer,
  FormContainer,
  InputBox,
  InputContainer,
  StyledTextField,
  SubmitButton,
  style,
} from './EmployeeForm.styles';
import { useState } from 'react';
import { EmployeeFormProps } from '../../interface/IEmployee';

const EmployeeForm = ({
  employees,
  departments,
  jobTitles,
  onSubmit,
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState(employees);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

  const resetFormState = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      salary: 0,
      departmentId: null,
      jobTitleId: null,
    });
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // If the changed field is departmentName, find the corresponding departmentId
    if (name === 'departmentName') {
      const selectedDepartment = departments.find(
        (dept) => dept.name === value
      );
      if (selectedDepartment) {
        setFormData({ ...formData, departmentId: selectedDepartment.id });
      }
    }

    // If the changed field is jobTitleName, find the corresponding jobTitleId
    if (name === 'jobTitleName') {
      const selectedJobTitle = jobTitles.find((job) => job.title === value);
      if (selectedJobTitle) {
        setFormData({ ...formData, jobTitleId: selectedJobTitle.id });
      }
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Find the departmentId and jobTitleId corresponding to the selected department and job title names
    const selectedDepartment = departments.find(
      (dept) => dept.id === formData.departmentId
    );
    const selectedJobTitle = jobTitles.find(
      (job) => job.id === formData.jobTitleId
    );

    if (!selectedDepartment || !selectedJobTitle) {
      console.error('Selected department or job title not found.');
      return;
    }
    console.log('Form Data:', formData);
    onSubmit(formData);
    setIsSuccessSnackbarOpen(true);
    resetFormState();
  };

  const handleSnackbarClose = () => {
    setIsSuccessSnackbarOpen(false);
  };
  return (
    <FormContainer>
      <FormBodyContainer onSubmit={handleSubmit}>
        <InputContainer sx={{ ...style, backgroundColor: 'white' }}>
          <InputBox>
            <StyledTextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <StyledTextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                name="departmentId"
                value={formData.departmentId || ''}
                onChange={handleChange}
                label="Department"
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Job Title</InputLabel>
              <Select
                name="jobTitleId"
                value={formData.jobTitleId || ''}
                onChange={handleChange}
                label="Job Title"
              >
                <MenuItem value="">
                  <em>Select Job Title</em>
                </MenuItem>
                {jobTitles.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputBox>
        </InputContainer>
        <InputContainer sx={{ ...style, backgroundColor: 'white' }}>
          <InputBox>
            <StyledTextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <StyledTextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <StyledTextField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </InputBox>
        </InputContainer>
      </FormBodyContainer>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Snackbar
          open={isSuccessSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="New employee added successfully!"
          sx={{
            position: 'absolute',
            top: -40,
            left: '60%',
            transform: 'translateX(-60%)',
          }}
        />
      </Box>

      <ButtonContainer>
        <SubmitButton type="submit" variant="contained" onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default EmployeeForm;
