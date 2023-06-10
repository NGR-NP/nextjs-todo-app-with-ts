import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://api.example.com'; // Your base URL here

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Set a timeout value if needed
  // You can also add additional configuration options here
});

export default axiosInstance;
