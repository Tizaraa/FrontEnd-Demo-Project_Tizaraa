"use client";

import { useEffect, useState } from "react";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app-context";
import ProductCard20 from "@component/product-cards/ProductCard20";
import { currency } from "@utils/utils";
import authService from "services/authService";
//import { useSearchParams } from "next/navigation";

interface RfqCheckoutSummaryProps {
  responseId: number; // Ensure responseId is a number
}

const RfqCheckoutSummary: React.FC<RfqCheckoutSummaryProps> = ({ responseId }) => {
  const { state } = useAppContext();
  //const searchParams = useSearchParams();
  //const responseId = searchParams.get("response_id");

  const [rfqData, setRfqData] = useState({
    sub_total: 0,
    vat: 0,
    total_price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const authToken = authService.getToken();

  useEffect(() => {
    const fetchRfqData = async () => {
      if (!responseId) {
        setError("Response ID is missing.");
        return;
      }

      try {
        console.log("Fetching data for responseId:", responseId);
        const response = await fetch(
          `https://frontend.tizaraa.com/api/rfq-seller-reviews/${responseId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          setError(`API Error: ${response.statusText}`);
          console.error("API Error Response:", await response.text());
          return;
        }

        const data = await response.json();
        console.log("Fetched RFQ data:", data); // Debug log for API response

        // Ensure data structure matches the expected format
        if (data?.purchaseInfo) {
          setRfqData({
            sub_total: data.purchaseInfo.sub_total || 0,
            vat: data.purchaseInfo.vat || 0,
            total_price: data.purchaseInfo.total_price || 0,
          });
        } else {
          setError("Invalid data structure in API response.");
          console.error("Invalid data structure:", data); // Log unexpected response
        }
      } catch (error) {
        console.error("Error fetching RFQ data:", error);
        setError("Error fetching RFQ data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRfqData();
  }, [responseId, authToken]);


  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card1>
      {state.cart.map((item) => (
        <ProductCard20
          margin={0}
          mb="1.5rem"
          id={item.id}
          key={item.id}
          qty={item.qty}
          slug={item.slug}
          productStock={item.productStock}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
          discountPrice={item.discountPrice}
          productId={item.productId}
          sellerId={item.sellerId}
        />
      ))}

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {currency(rfqData.sub_total)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tax:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {`${rfqData.vat}%`}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Discount:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb="1.5rem"
      >
        {currency(rfqData.total_price)}
      </Typography>
    </Card1>
  );
}

export default RfqCheckoutSummary;