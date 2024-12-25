"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
import Divider from "@component/Divider";

export default function WriteReview({ item, shopName, orderDetails }: { item: any, shopName: string, orderDetails: any }) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const deliveryCharge = orderDetails?.delivery_charge;

 // Toggle visibility of the summary
 const toggleSummary = (event: React.MouseEvent) => {
  event.stopPropagation(); // Prevent event propagation to the document
  setIsSummaryOpen((prev) => !prev);
};

// Handle click outside to close the summary
const handleClickOutside = (event: MouseEvent) => {
  if (
    summaryRef.current &&
    !summaryRef.current.contains(event.target as Node) &&
    buttonRef.current &&
    !buttonRef.current.contains(event.target as Node)
  ) {
    setIsSummaryOpen(false);
  }
};
  useEffect(() => {
    // Add event listener for detecting clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FlexBox px="1rem" py="0.5rem" flexWrap="wrap" alignItems="center" key={item.product_name}>
      <FlexBox flex="2 2 260px" m="6px" alignItems="center">
        <Avatar src={item.product_image} alt={item.product_image} size={64} />
        <Box ml="20px">
          <H6 my="0px">{item.product_name}</H6>
          <Typography fontSize="14px" color="text.muted">
            {currency(item.price)} x {item.quantity}
          </Typography>
        </Box>
      </FlexBox>

      <FlexBox flex="1 1 260px" m="6px" alignItems="center">
        <Typography fontSize="14px" color="text.muted">
          {item.color || "-"}
        </Typography>
      </FlexBox>

      <div style={{ display: "flex" }}>
        <FlexBox flex="160px" m="6px" alignItems="center">
          <Button variant="text" color="primary">
            <Typography fontSize="14px">Review</Typography>
          </Button>
        </FlexBox>

      </div>

    </FlexBox>
  );
}
