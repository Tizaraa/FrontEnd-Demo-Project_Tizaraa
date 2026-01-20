"use client";
// @/hooks/useFetcher.ts

import axios from "@lib/axiosClient";
import authService from "services/authService";
import useSWR from "swr";

// --- Axios     fetcher compatible with SWR ---
const fetcher = async (url: string, config: any = {}) => {
 if (!url) return null;

 try {
  const response = await axios.get(url, config);
  return response.data;
 } catch (error) {
  throw error.response?.data || error.message || error;
 }
};

export default function useFetcher(url: string, config: any = {}) {
 const token = authService.getToken();
 const { revalidateTime = 300000, fallbackData, ...axiosConfig } = config;

 const { data, error, isLoading, mutate } = useSWR(
  url + token,
  () => fetcher(url, axiosConfig),
  {
   fallbackData,
   refreshInterval: revalidateTime, // auto revalidate
   revalidateOnReconnect: false, // revalidate on reconnect
   dedupingInterval: 5000, // prevent double fetch within 5 seconds
   errorRetryCount: 2,
  }
 );

 const isInitialLoading = !fallbackData && !data && isLoading;

 return {
  data,
  error,
  mutate,
  isLoading: isInitialLoading, // ← renamed / filtered
 };
}
