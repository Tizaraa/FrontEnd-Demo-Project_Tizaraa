"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import BeatLoader from "react-spinners/BeatLoader";

export default function BackToAddress() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    push("/address");
  };

  return (
    <Button px="2rem" color="primary" bg="primary.light" onClick={handleClick}>
      
      {loading ? <BeatLoader size={18} color="#fff" /> : "Back to Address"}
    </Button>
  );
}
