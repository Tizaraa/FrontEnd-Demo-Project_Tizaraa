"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";

export default function OrderListButton({ params }) {
  const { push } = useRouter();
  const [orderId, setOrderId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const authToken = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}user/order/detailss/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const orderData = response.data.Order;
        setOrderId(orderData?.id); // Set orderId from fetched data
        console.log("Fetched Order Data:", orderData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const handleNavigation = () => {
    setIsNavigating(true);
    push("/orders");
  };

  return (
    <FlexBox>
      {/* <Button
        px="2rem"
        color="primary"
        bg="primary.light"
        onClick={() => push(`/invoice/${params.id}`)} 
        
      >
        Invoice
      </Button> */}
      <Button
        px="2rem"
        color="primary"
        bg="primary.light"
        onClick={handleNavigation}
      >
        {/* Order List */}
        {isNavigating ? <BeatLoader size={18} color="#fff" /> : "Order List"}
      </Button>
    </FlexBox>
  );
}
