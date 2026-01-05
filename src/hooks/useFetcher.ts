// @/hooks/useFetcher.ts

import axios from "@lib/axios";
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
  const { revalidateTime = 300000, ...axiosConfig } = config;

  const { data, error, isLoading, mutate } = useSWR(
    url + token,
    () => fetcher(url, axiosConfig),
    {
      refreshInterval: revalidateTime, // auto revalidate
      revalidateOnFocus: true, // revalidate on window focus
      revalidateOnReconnect: false, // revalidate on reconnect
      revalidateIfStale: false, // don't revalidate if cache exists
      dedupingInterval: 5000, // prevent double fetch within 5 seconds
      shouldRetryOnError: false,
      errorRetryCount: 0,
      // suspense: false, // optional: if you want loading states
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
