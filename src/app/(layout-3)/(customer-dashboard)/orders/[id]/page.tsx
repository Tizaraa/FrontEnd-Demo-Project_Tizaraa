// "use client";
// import { Fragment, useEffect, useState } from "react";
// import { format } from "date-fns";
// // UTILS
// import { currency } from "@utils/utils";
// // API FUNCTIONS
// import axios from "axios";
// // GLOBAL CUSTOM COMPONENTS
// import { Button } from "@component/buttons";
// import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import TableRow from "@component/TableRow";
// import Typography, { H5, H6, Paragraph } from "@component/Typography";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import ApiBaseUrl from "api/ApiBaseUrl";
// // PAGE SECTION COMPONENTS
// import {
//   OrderStatus,
//   WriteReview,
//   OrderListButton,
// } from "@sections/customer-dashboard/orders";
// // CUSTOM DATA MODEL
// import { IDParams } from "interfaces";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import Box from "@component/Box";
// import { useRouter } from "next/navigation";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export default function OrderDetails({ params }: IDParams) {
//   const { push } = useRouter();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true); // For loading state
//   const [getStatus, setStatus] = useState(null);
//   const [getEstimateDate, setEstimateDate] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const authtoken = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           `${ApiBaseUrl.baseUrl}user/order/details/${params.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${authtoken}`,
//             },
//           }
//         );
//         setOrder(response.data);
//         console.log("Fetched Order Data:", response.data);
//         setStatus(response.data.Order.status);
//         setEstimateDate(response.data.Order.deliveredAt)

//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <Typography>
//         <LoaderWrapper>
//           <Vortex />
//         </LoaderWrapper>
//       </Typography>
//     ); // Show loading state
//   }

//   if (!order) {
//     return <Typography color="red">Failed to fetch order details</Typography>; // Handle error state
//   }

//   return (
//     <Fragment>
//       <DashboardPageHeader
//   title="Order Details"
//   iconName="bag_filled"
//   button={<OrderListButton params={params} />}
// />

//       {/* <OrderStatus /> */}

//       <OrderStatus orderStatus={getStatus} deliveredAt={getEstimateDate} />

//       <Card p="0px" mb="30px" overflow="hidden" borderRadius={8}>
//         <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
//           <FlexBox className="pre" m="6px" alignItems="center">
//             <Typography fontSize="14px" color="text.muted" mr="4px">
//               Order ID:
//             </Typography>
//             <Typography fontSize="14px">#{order.Order.invoice_id}</Typography>
//           </FlexBox>

//           <FlexBox className="pre" m="6px" alignItems="center">
//             <Typography fontSize="14px" color="text.muted" mr="4px">
//               Placed on:
//             </Typography>
//             <Typography fontSize="14px">
//               {order.Order.createdAt
//                 ? format(new Date(order.Order.createdAt), "dd MMM, yyyy")
//                 : "N/A"}
//             </Typography>
//           </FlexBox>

//           {order.Order.isDelivered && (
//             <FlexBox className="pre" m="6px" alignItems="center">
//               <Typography fontSize="14px" color="text.muted" mr="4px">
//                 Delivered on:
//               </Typography>
//               <Typography fontSize="14px">
//                 {order.Order.deliveredAt
//                   ? format(new Date(order.Order.deliveredAt), "dd MMM, yyyy")
//                   : "N/A"}
//               </Typography>
//             </FlexBox>
//           )}
//         </TableRow>

//         <Box py="0.5rem">
//           {order.Order.items && order.Order.items.length > 0 ? (
//             order.Order.items.map((item, ind) => (
//               <WriteReview key={ind} item={item} />
//             ))
//           ) : (
//             <Typography>No items in this order.</Typography>
//           )}
//         </Box>
//       </Card>

//       <Grid container spacing={6}>
//         <Grid item lg={6} md={6} xs={12}>
//           <Card p="20px 30px" borderRadius={8}>
//             <H5 mt="0px" mb="14px">
//               Shipping Address
//             </H5>
//             <Paragraph fontSize="14px" my="0px">
//               {order.Order.address}
//             </Paragraph>
//           </Card>

//           <Button
//         px="2rem"
//         color="primary"
//         bg="primary.light"
//         mt="2rem"
//         onClick={() => push(`/invoice/${params.id}`)}

//       >
//         Invoice
//       </Button>
//         </Grid>

//         <Grid item lg={6} md={6} xs={12}>
//           <Card p="20px 30px" borderRadius={8}>
//             <H5 mt="0px" mb="14px">
//               Total Summary
//             </H5>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                 Subtotal:
//               </Typography>
//               <H6 my="0px">{currency(order.Order.amount)}</H6>{" "}
//               {/* Use amount instead of totalPrice */}
//             </FlexBox>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                  fee:
//               </Typography>
//               <H6 my="0px">{currency(order.Order.shippingAddress)}</H6>
//             </FlexBox>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                 Discount:
//               </Typography>
//               <H6 my="0px">-{currency(order.discount || 0)}</H6>
//             </FlexBox>

//             <Divider mb="0.5rem" />

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="1rem"
//             >
//               <H6 my="0px">Total</H6>
//               <H6 my="0px">
//                 {currency(
//                   Number(order.Order.amount) +
//                     Number(order.Order.shippingAddress)
//                 )}
//               </H6>
//             </FlexBox>

//             <Typography fontSize="14px">
//               Paid by {order.Order.delivery_type}
//             </Typography>
//           </Card>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// }

// "use client";
// import { Fragment, useEffect, useState } from "react";
// import { format } from "date-fns";
// import { currency } from "@utils/utils";
// import axios from "axios";
// import { Button } from "@component/buttons";
// import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import TableRow from "@component/TableRow";
// import Typography, { H5, H6, Paragraph } from "@component/Typography";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import {
//   OrderStatus,
//   WriteReview,
//   OrderListButton,
// } from "@sections/customer-dashboard/orders";
// import { IDParams } from "interfaces";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import Box from "@component/Box";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const InvoiceWrapper = styled.div`
// margin-top: 20px;
// height: 80vh; // Use 80% of the viewport height for responsiveness
// width: 100%; // Take full width
// overflow: hidden; // Prevent scrollbars on the wrapper itself
// border: 1px solid #ccc; // Optional border styling
// display: flex; // Align content in the center
// justify-content: center;
// align-items: center;

// @media (min-width: 1024px) {
//   height: 90vh; // Adjust height for larger screens
// }
// `;

// const EmbedWrapper = styled.div`
// width: 100%;
// height: 100%;
// overflow: hidden; // Ensure scrolling within the embed area
// `;


// export default function OrderDetails({ params }: IDParams) {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [getStatus, setStatus] = useState(null);
//   const [getEstimateDate, setEstimateDate] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null); // State to hold the PDF URL
//   const [invoiceLoading, setInvoiceLoading] = useState(false); // Loading state for invoice
//   const [invoiceError, setInvoiceError] = useState(""); // Error message for invoice
//   const [onlinePaymentError, setOnlinePaymentError] = useState("");
//   const [onlinePaymentLoading, setOnlinePaymentLoading] = useState(false);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const authtoken = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           `${ApiBaseUrl.baseUrl}user/order/details/${params.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${authtoken}`,
//             },
//           }
//         );
//         console.log("nazim data",response)
//         setOrder(response.data);
//         setStatus(response.data.Order.status);
//         setEstimateDate(response.data.Order.deliveredAt);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [params.id]);

//   const fetchInvoice = async () => {
//     setInvoiceLoading(true); // Start loading state for invoice
//     setInvoiceError(""); // Reset any previous errors
//     const authToken = localStorage.getItem("token");
//     if (!authToken) {
//       setInvoiceError("Authentication token not found. Please log in."); // Handle missing token
//       setInvoiceLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://frontend.tizaraa.com/api/get-invoice?id=${params.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//           responseType: "blob", // Set response type to blob for binary data
//         }
//       );
//       const pdfBlobUrl = URL.createObjectURL(response.data);
//       console.log("ifty", pdfBlobUrl);

//       setPdfUrl(pdfBlobUrl);
//     } catch (error) {
//       console.error("Error fetching invoice data:", error);
//       setInvoiceError("Failed to load invoice. Please try again."); // Set error message for user
//     } finally {
//       setInvoiceLoading(false); // Stop loading state
//     }
//   };

//   const handleOnlinePayment = async () => {
//     setOnlinePaymentLoading(true);
//     setOnlinePaymentError("");
//     const authToken = localStorage.getItem("token");
//     if (!authToken) {
//       setOnlinePaymentError("Authentication token not found. Please log in.");
//       setOnlinePaymentLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://frontend.tizaraa.com/api/pay-via-ajax`,
//         { tran_id: params.id },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       if (response.data.payment_status === "paid") {
//         const updatedOrder = { ...order };
//         updatedOrder.Order.payment_status = "paid";
//         setOrder(updatedOrder);
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setOnlinePaymentError("Failed to process payment. Please try again.");
//     } finally {
//       setOnlinePaymentLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Typography>
//         <LoaderWrapper>
//           <Vortex />
//         </LoaderWrapper>
//       </Typography>
//     );
//   }

//   if (!order) {
//     return <Typography color="red">Failed to fetch order details</Typography>;
//   }

//   return (
//     <Fragment>
//       <DashboardPageHeader
//         title="Order Details"
//         iconName="bag_filled"
//         button={<OrderListButton params={params} />}
//       />

//       <OrderStatus orderStatus={getStatus} deliveredAt={getEstimateDate} />

//       <Card p="0px" mb="30px" overflow="hidden" borderRadius={8}>
//         <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
//           <FlexBox className="pre" m="6px" alignItems="center">
//             <Typography fontSize="14px" color="text.muted" mr="4px">
//               Order ID:
//             </Typography>
//             <Typography fontSize="14px">#{order.Order.invoice_id}</Typography>
//           </FlexBox>

//           <FlexBox className="pre" m="6px" alignItems="center">
//             <Typography fontSize="14px" color="text.muted" mr="4px">
//               Placed on:
//             </Typography>
//             <Typography fontSize="14px">
//               {order.Order.createdAt
//                 ? format(new Date(order.Order.createdAt), "dd MMM, yyyy")
//                 : "N/A"}
//             </Typography>
//           </FlexBox>

//           {order.Order.isDelivered && (
//             <FlexBox className="pre" m="6px" alignItems="center">
//               <Typography fontSize="14px" color="text.muted" mr="4px">
//                 Delivered on:
//               </Typography>
//               <Typography fontSize="14px">
//                 {order.Order.deliveredAt
//                   ? format(new Date(order.Order.deliveredAt), "dd MMM, yyyy")
//                   : "N/A"}
//               </Typography>
//             </FlexBox>
//           )}
//         </TableRow>

//         <Box py="0.5rem">
//           {order.Order.items && order.Order.items.length > 0 ? (
//             order.Order.items.map((item, ind) => (
//               <WriteReview key={ind} item={item} />
//             ))
//           ) : (
//             <Typography>No items in this order.</Typography>
//           )}
//         </Box>
//       </Card>

//       <Grid container spacing={6}>
//         <Grid item lg={6} md={6} xs={12}>
//           <Card p="20px 30px" borderRadius={8}>
//             <H5 mt="0px" mb="14px">
//               Shipping Address
//             </H5>
//             <Paragraph fontSize="14px" my="0px">
//               {order.Order.address}
//             </Paragraph>
//           </Card>

//           <div style={{display: "flex", gap:"20px"}}>
//           <Button
//             px="2rem"
//             color="primary"
//             bg="primary.light"
//             mt="2rem"
//             onClick={fetchInvoice} // Fetch invoice when button is clicked
//           >
//             Invoice
//           </Button>
//           {order.Order.payment_status === "Unpaid" && (
//               <Button
//                 px="2rem"
//                 color="primary"
//                 bg="primary.light"
//                 mt="2rem"
//                 onClick={handleOnlinePayment}
//                 disabled={onlinePaymentLoading}
//               >
//                 {onlinePaymentLoading ? "Processing..." : "Online Payment"}
//               </Button>
//             )}
//           </div>

//           {/* Invoice Display */}
//           {invoiceLoading && <Typography>Loading Invoice...</Typography>}
//           {invoiceError && <Typography color="red">{invoiceError}</Typography>}
//           {pdfUrl && (
//             <InvoiceWrapper>
//               <EmbedWrapper>
//                 <embed
//                   src={pdfUrl}
//                   type="application/pdf"
//                   width="100%"
//                   height="100%"
//                   style={{overflow: "hidden"}}
//                   title={`Invoice PDF ${params.id}`}
//                 />
//               </EmbedWrapper>
//             </InvoiceWrapper>
//           )}
//         </Grid>

//         <Grid item lg={6} md={6} xs={12}>
//           <Card p="20px 30px" borderRadius={8}>
//             <H5 mt="0px" mb="14px">
//               Total Summary
//             </H5>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                 Subtotal:
//               </Typography>
//               <H6 my="0px">{currency(order.Order.amount)}</H6>{" "}
//             </FlexBox>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                 Shipping fee:
//               </Typography>
//               <H6 my="0px">{currency(order.Order.shippingAddress)}</H6>
//             </FlexBox>

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="0.5rem"
//             >
//               <Typography fontSize="14px" color="text.hint">
//                 Discount:
//               </Typography>
//               <H6 my="0px">{currency(order.discount || 0)}</H6>
//             </FlexBox>

//             <Divider mb="0.5rem" />

//             <FlexBox
//               justifyContent="space-between"
//               alignItems="center"
//               mb="1rem"
//             >
//               <H6 my="0px">Total</H6>
//               <H6 my="0px">
//                 {currency(
//                   Number(order.Order.amount) +
//                     Number(order.Order.shippingAddress)
//                 )}
//               </H6>
//             </FlexBox>

//             {/* <Typography fontSize="14px">
//               Payment Method: {order.Order.delivery_type}
//             </Typography> */}

//             <FlexBox
//               // justifyContent="space-between"
//               alignItems="center"
//               mb="1rem"
//             >
//               Payment Method:
//               <H6 my="0px" mx="1rem">
//                 {order.Order.delivery_type}
//               </H6>
//             </FlexBox>
//             <FlexBox
//               // justifyContent="space-between"
//               alignItems="center"
//               mb="1rem"
//             >
//               Payment Status:
//               <H6 my="0px" mx="1rem">
//                 {order.Order.payment_status}
//               </H6>
//             </FlexBox>
//           </Card>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// }


"use client";
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { currency } from "@utils/utils";
import axios from "axios";
import { Button } from "@component/buttons";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import ApiBaseUrl from "api/ApiBaseUrl";
import {
  OrderStatus,
  WriteReview,
  OrderListButton,
} from "@sections/customer-dashboard/orders";
import { IDParams } from "interfaces";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import Box from "@component/Box";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InvoiceWrapper = styled.div`
  margin-top: 20px;
  height: 80vh; // Use 80% of the viewport height for responsiveness
  width: 100%; // Take full width
  overflow: hidden; // Prevent scrollbars on the wrapper itself
  border: 1px solid #ccc; // Optional border styling
  display: flex; // Align content in the center
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    height: 90vh; // Adjust height for larger screens
  }
`;

const EmbedWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden; // Ensure scrolling within the embed area
`;

export default function OrderDetails({ params }: IDParams) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getStatus, setStatus] = useState(null);
  const [getEstimateDate, setEstimateDate] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // State to hold the PDF URL
  const [invoiceLoading, setInvoiceLoading] = useState(false); // Loading state for invoice
  const [invoiceError, setInvoiceError] = useState(""); // Error message for invoice
  const [onlinePaymentError, setOnlinePaymentError] = useState("");
  const [onlinePaymentLoading, setOnlinePaymentLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const authtoken = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}user/order/details/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
        console.log("nazim data", response);
        setOrder(response.data);
        setStatus(response.data.Order.status);
        setEstimateDate(response.data.Order.deliveredAt);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const fetchInvoice = async () => {
    setInvoiceLoading(true); // Start loading state for invoice
    setInvoiceError(""); // Reset any previous errors
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setInvoiceError("Authentication token not found. Please log in."); // Handle missing token
      setInvoiceLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://frontend.tizaraa.com/api/get-invoice?id=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          responseType: "blob", // Set response type to blob for binary data
        }
      );
      const pdfBlobUrl = URL.createObjectURL(response.data);
      console.log("ifty", pdfBlobUrl);

      setPdfUrl(pdfBlobUrl);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      setInvoiceError("Failed to load invoice. Please try again."); // Set error message for user
    } finally {
      setInvoiceLoading(false); // Stop loading state
    }
  };

  const handleOnlinePayment = async () => {
    setOnlinePaymentLoading(true);
    setOnlinePaymentError("");
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setOnlinePaymentError("Authentication token not found. Please log in.");
      setOnlinePaymentLoading(false);
      return;
    }

    try {
      // Fetch the order details again to get the latest status
      const orderResponse = await axios.get(
        `${ApiBaseUrl.baseUrl}user/order/details/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const orderData = orderResponse.data.Order

      const paymentResponse = await axios.post(
        `https://frontend.tizaraa.com/api/pay-via-ajax`,
        {
          user_id: orderData.user_id,
          seller_id: orderData.seller_id,
          cus_name: orderData.user,
          cus_email: orderData.email,
          cus_phone: orderData.phone,
          province_id: orderData.province_id,
          city_id: orderData.city_id,
          area_id: orderData.area_id,
          house_level: orderData.house_level,
          delivery_charge: orderData.delivery_charge,
          cus_add1: orderData.address,
          currency: orderData.currency,
          total_amount: orderData.totalPrice,
          productType: orderData.productType,
          payment_type: "mb", // Assuming "mb" is a predefined value for the payment method
          payment_method: orderData.payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("fg",paymentResponse);
      console.log("fghhh",paymentResponse.data.redirect_url);
      const redirectUrl = paymentResponse.data.redirect_url;
        window.location.href = redirectUrl;
      

      // if (paymentResponse.data.payment_status === "Paid") {
      //   const updatedOrder = { ...order };
      //   updatedOrder.Order.payment_status = "Paid";
      //   setOrder(updatedOrder);
      // }

      // if (paymentResponse.data.payment_status === "Unpaid") {
      //   const redirectUrl = paymentResponse.data.redirect_url;
      //   window.location.href = redirectUrl; // Redirect to the payment URL
      // }
    } catch (error) {
      console.error("Error processing payment:", error);
      setOnlinePaymentError("Failed to process payment. Please try again.");
    } finally {
      setOnlinePaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <Typography>
        <LoaderWrapper>
          <Vortex />
        </LoaderWrapper>
      </Typography>
    );
  }

  if (!order) {
    return <Typography color="red">Failed to fetch order details</Typography>;
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={<OrderListButton params={params} />}
      />

      <OrderStatus orderStatus={getStatus} deliveredAt={getEstimateDate} />

      <Card p="0px" mb="30px" overflow="hidden" borderRadius={8}>
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="14px">#{order.Order.invoice_id}</Typography>
          </FlexBox>

          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Placed on:
            </Typography>
            <Typography fontSize="14px">
              {order.Order.createdAt
                ? format(new Date(order.Order.createdAt), "dd MMM, yyyy")
                : "N/A"}
            </Typography>
          </FlexBox>

          {order.Order.isDelivered && (
            <FlexBox className="pre" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted" mr="4px">
                Delivered on:
              </Typography>
              <Typography fontSize="14px">
                {order.Order.deliveredAt
                  ? format(new Date(order.Order.deliveredAt), "dd MMM, yyyy")
                  : "N/A"}
              </Typography>
            </FlexBox>
          )}
        </TableRow>

        <Box py="0.5rem">
          {order.Order.items && order.Order.items.length > 0 ? (
            order.Order.items.map((item, ind) => (
              <WriteReview key={ind} item={item} />
            ))
          ) : (
            <Typography>No items in this order.</Typography>
          )}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px" borderRadius={8}>
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {order.Order.address}
            </Paragraph>
          </Card>

          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              px="2rem"
              color="primary"
              bg="primary.light"
              mt="2rem"
              onClick={fetchInvoice} // Fetch invoice when button is clicked
            >
              Invoice
            </Button>
            {order.Order.payment_status === "Unpaid" && (
              <Button
                px="2rem"
                color="primary"
                bg="primary.light"
                mt="2rem"
                onClick={handleOnlinePayment}
                disabled={onlinePaymentLoading}
              >
                {onlinePaymentLoading ? "Processing..." : "Online Payment"}
              </Button>
            )}
          </div>

          {/* Invoice Display */}
          {invoiceLoading && <Typography>Loading Invoice...</Typography>}
          {invoiceError && <Typography color="red">{invoiceError}</Typography>}
          {pdfUrl && (
            <InvoiceWrapper>
              <EmbedWrapper>
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  style={{ overflow: "hidden" }}
                  title={`Invoice PDF ${params.id}`}
                />
              </EmbedWrapper>
            </InvoiceWrapper>
          )}
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px" borderRadius={8}>
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <H6 my="0px">{currency(order.Order.amount)}</H6>
            </FlexBox>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Shipping fee:
              </Typography>
              <H6 my="0px">{currency(order.Order.shippingAddress)}</H6>
            </FlexBox>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Discount:
              </Typography>
              <H6 my="0px">{currency(order.discount || 0)}</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">
                {currency(
                  Number(order.Order.amount) +
                    Number(order.Order.shippingAddress)
                )}
              </H6>
            </FlexBox>

            <FlexBox
              alignItems="center"
              mb="1rem"
            >
              Payment Method:
              <H6 my="0px" mx="1rem">
                {order.Order.delivery_type}
              </H6>
            </FlexBox>
            <FlexBox
              alignItems="center"
              mb="1rem"
            >
              Payment Status:
              <H6 my="0px" mx="1rem">
                {order.Order.payment_status}
              </H6>
            </FlexBox>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
