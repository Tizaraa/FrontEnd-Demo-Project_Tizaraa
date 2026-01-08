"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import authService from "services/authService";
import BeatLoader from "react-spinners/BeatLoader";

export default function BackToAddress() {
 const { push } = useRouter();
 const [loading, setLoading] = useState(false);

 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 const handleClick = () => {
  setLoading(true);
  if (isLoggedIn) {
   push("/address");
  } else {
   push("/login");
  }
 };

 return (
  <Button px="2rem" color="primary" bg="primary.light" onClick={handleClick}>
   {loading ? <BeatLoader size={18} color="#E94560" /> : "Back to Address"}
  </Button>
 );
}
