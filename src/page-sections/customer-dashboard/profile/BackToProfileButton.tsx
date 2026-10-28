"use client";

import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";

export default function BackToProfileButton() {
 const { push } = useRouter();

 return (
  <Button variant="outlined" color="secondary" onClick={() => push("/profile")}>
   Back to profile
  </Button>
 );
}
