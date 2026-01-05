"use client";
import Axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";

// Create a dedicated Axios instance
const axios = Axios.create({
  baseURL: ApiBaseUrl.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach Redux token dynamically
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
