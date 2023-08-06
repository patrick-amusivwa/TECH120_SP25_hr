import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://employee-management-backend2.azurewebsites.net/api/v1',
});
export default axiosInstance;
