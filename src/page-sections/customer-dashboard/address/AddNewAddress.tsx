"use client";
import { useState, useEffect } from "react";
import { Button } from "@component/buttons";
import { useRouter } from "next/navigation";
import authService from "services/authService";
import BeatLoader from "react-spinners/BeatLoader";

export default function AddNewAddress() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 const handleClick = () => {
  setLoading(true);
  if (isLoggedIn) {
   router.push("/address/create");
  } else {
   router.push("/login");
  }
 };

 return (
  <Button px="2rem" color="primary" bg="primary.light" onClick={handleClick}>
   {loading ? <BeatLoader size={18} color="#E94560" /> : "Add New Address"}
  </Button>
 );
}
