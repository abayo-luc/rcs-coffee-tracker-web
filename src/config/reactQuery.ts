import axios from 'axios';
import { QueryClient } from 'react-query';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6InJjcy1jb2ZmZWUtdHJhY2tlci1hcGkiLCJpZCI6IjcwMTJjN2Y2LTU2YzEtNDliNy1iZDUzLWM2ZDkxNTU1NmVmMiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjgxOTAyMTE3fQ.YED0ilfiEYg00ALovRy1bBDNAdM3oNl-UGfdpB6DKes`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response || error);
  }
);

const queryClient = new QueryClient();

export { queryClient, axiosClient };
