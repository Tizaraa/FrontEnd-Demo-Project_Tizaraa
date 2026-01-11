"use client";

import useFetcher from "@hook/useFetcher";
import { useEffect } from "react";

// AppProvider component
export default function SetUser() {
  const {data:profile} = useFetcher(`v1/user/profile`)
 
 useEffect(() => {
  if (typeof window !== "undefined" && profile?.profile) {
    localStorage.setItem("userInfo",JSON.stringify(profile?.profile))
  }   
 }, [profile]);

 return null
}

