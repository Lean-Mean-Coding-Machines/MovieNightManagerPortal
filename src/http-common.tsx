import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

const http = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    const navigate = useNavigate();
    navigate('/login');
  }
);

export default http;
