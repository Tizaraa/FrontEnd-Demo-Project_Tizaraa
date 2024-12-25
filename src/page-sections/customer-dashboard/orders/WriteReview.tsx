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

  const deliveryCharge = orderDetails?.delivery_charge;

  // Toggle visibility of the summary
  const toggleSummary = () => {
    setIsSummaryOpen((prev) => !prev);
  };

  // Handle click outside to close the summary
  const handleClickOutside = (event: MouseEvent) => {
    if (summaryRef.current && !summaryRef.current.contains(event.target as Node)) {
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

        <FlexBox flex="160px" m="6px" alignItems="center">
          <Button variant="text" color="primary" onClick={toggleSummary}>
            <Typography fontSize="14px">Total Summary</Typography>
          </Button>
        </FlexBox>
      </div>

      {/* Conditionally render the total summary */}
      {isSummaryOpen && (
        <div ref={summaryRef} style={{ width: "100%", marginTop: "1rem" }}>
          <Box p="20px" borderRadius={8}>
            <H6 mt="0px" mb="14px">
              Total Summary
            </H6>

            <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <H6 my="0px">{currency(item.price * item.quantity)}</H6>
            </FlexBox>

            {/* Display the Delivery Charge based on shop */}
            <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
              <Typography fontSize="14px" color="text.hint">
                Shipping fee ({shopName}):
              </Typography>
              <H6 my="0px">{currency(deliveryCharge)}</H6> {/* Displaying the shipping fee */}
            </FlexBox>

            <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
              <Typography fontSize="14px" color="text.hint">
                Discount:
              </Typography>
              <H6 my="0px">{currency(0)}</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
              <H6 my="0px">Total</H6>
              <H6 my="0px">
                {currency(orderDetails?.total)} 
              </H6>
            </FlexBox>
          </Box>
        </div>
      )}
    </FlexBox>
  );
}
