"use client";
import { useState } from "react";
import { Button } from "@component/buttons";
import { useRouter } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";

export default function AddNewAddress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push("/address/create");
  };

  return (
    <Button
      px="2rem"
      color="primary"
      bg="primary.light"
      onClick={handleClick}>
      {loading ? <BeatLoader size={18} color="#fff" /> : "Add New Address"}
    </Button>
  );
}
