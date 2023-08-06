import axiosInstance from '../common/AxiosInstance';
import { EmployeeData } from '../interface/IEmployee';

export const fetchEmployees = () => {
  return axiosInstance.get(`/Employees`).then((response) => response.data);
};

export const fetchDepartments = () => {
  return axiosInstance.get(`/Departments`).then((response) => response.data);
};

export const fetchJobTitles = () => {
  return axiosInstance.get(`/JobTitles`).then((response) => response.data);
};

export const addEmployee = (formData: EmployeeData) => {
  return axiosInstance
    .post('/Employees', formData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
