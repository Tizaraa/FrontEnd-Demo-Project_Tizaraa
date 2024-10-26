"use client";

import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";

export default function OrderListButton() {
  const { push } = useRouter();
  const invoiceId = "123"; 

  return (
    <FlexBox>
      <Button
        px="2rem"
        color="primary"
        bg="primary.light"
        onClick={() => push(`/invoice/${invoiceId}`)} // Include the ID here
      >
        Invoice
      </Button>
      <Button
        px="2rem"
        color="primary"
        bg="primary.light"
        onClick={() => push("/orders")} 
      >
        Order List
      </Button>
    </FlexBox>
  );
}
