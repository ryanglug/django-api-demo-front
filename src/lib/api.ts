import axios from "axios";

export const apiGeneric = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
});

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});
export const graphQLApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/graphql/`,
});

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/`,
  withCredentials: true,
});

export const tokenApi = (accessToken: string) => {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/user/api/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return axiosInstance;
};
export const graphQLTokenApi = (accessToken: string) => {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/graphql/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return axiosInstance;
};
