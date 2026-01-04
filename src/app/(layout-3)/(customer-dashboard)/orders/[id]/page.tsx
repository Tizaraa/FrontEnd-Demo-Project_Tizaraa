"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { currency } from "@utils/utils";
import axios from "axios";
import { Button } from "@component/buttons";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph, Small } from "@component/Typography";
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
import BeatLoader from "react-spinners/BeatLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@component/Chip";
import authService from "services/authService";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Loader from "@component/loader";
// import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

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
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [fetched, setFetched] = useState(false);
  const router = useRouter();

  const [openSummaries, setOpenSummaries] = useState<{
    [key: string]: boolean;
  }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#FFC107"; // Yellow for Pending
      case "Confirmed":
        return "#2196F3"; // Blue for Processing
      case "Delivered":
        return "#4CAF51"; // Green for Delivered
      case "Cancelled":
        return "#F44336"; // Red for Cancelled
      default:
        return "#9E9E9E"; // Grey for unknown status
    }
  };

  const toggleSummary = (shop: string) => {
    setOpenSummaries((prev) => ({
      ...prev,
      [shop]: !prev[shop], // Toggle the summary visibility for the clicked shop
    }));
  };

  useEffect(() => {
    const fetchOrder = async (token: string) => {
      const authtoken = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}user/order/detailss/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
        console.log("Order details data:", response);
        setOrder(response.data);
        setStatus(response.data.Order.status);
        setEstimateDate(response.data.Order.deliveredAt);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = authService.getToken();

    if (!token) {
      router.push("/login");
    } else if (!fetched) {
      fetchOrder(token); // Pass the token to the fetchOrder function
    }

    const success = localStorage.getItem("orderSuccess");
    if (success) {
      setOrderSuccess(true);
      localStorage.removeItem("orderSuccess");
    }
  }, [fetched, params.id, router]);

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
        `${ApiBaseUrl.baseUrl}get-invoice?id=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          responseType: "blob", // Set response type to blob for binary data
        }
      );
      const pdfBlobUrl = URL.createObjectURL(response.data);
      // console.log("ifty", pdfBlobUrl);

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
        `${ApiBaseUrl.baseUrl}user/order/detailss/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const orderData = orderResponse.data.Order;
      //console.log("");

      const paymentResponse = await axios.post(
        `${ApiBaseUrl.baseUrl}pay-via-ajax`,
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
          total_amount: orderData.amount,
          productType: orderData.productType,
          payment_type: "Online Payment", // Assuming "mb" is a predefined value for the payment method
          payment_method: orderData.payment_method,
          invoice_id: orderData.invoice,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const updatedOrder = orderResponse.data;
      const redirectUrl = paymentResponse.data.redirect_url;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error processing payment:", error);
      setOnlinePaymentError("Failed to process payment. Please try again.");
    } finally {
      setOnlinePaymentLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <Typography>
  //       <LoaderWrapper>
  //         {/* <img src={PrimaryLoader} alt="Loading" /> */}
  //         <img src={PrimaryLoader} alt="Loading" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
  //       </LoaderWrapper>
  //     </Typography>
  //   );
  // }

  if (loading) {
    return (
      <Typography>
        <Loader />
      </Typography>
    );
  }

  if (!order) {
    return <Typography color="red">Failed to fetch order details</Typography>;
  }

  let abroadProduct = null;

  if (order?.Order?.productType === "Abroad") {
    abroadProduct = (
      <Box key={order?.Order?.invoice_id} my="1rem">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
            }}
          >
            <Typography
              fontWeight="bold"
              fontSize="18px"
              mb="1rem"
              p="1rem"
              style={{ margin: "0" }}
            >
              <FontAwesomeIcon icon={faStore} size="1x" color="black" />{" "}
              {order?.Order?.items?.shop_name || "Product not available"}
            </Typography>

            <Box m="6px">
              <Chip p="0.25rem 1rem" bg={getColor(order?.Order?.items?.status)}>
                <Small color="white">
                  {order?.Order?.items?.status || "Status not available"}
                </Small>
              </Chip>
            </Box>
          </div>

          {order?.Order?.items?.delivered_at && (
            <p
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#FFE1E6",
                color: "#E94560",
                borderRadius: "300px",
                textAlign: "center",
                height: "40px",
                marginRight: "20px",
                marginTop: "10px",
                minWidth: "200px",
              }}
            >
              Estimated Delivery Date:{" "}
              <b>{order?.Order?.items?.delivered_at}</b>
            </p>
          )}

          <Box mt="1rem" textAlign="center">
            <Button
              variant="text"
              color="primary"
              onClick={() => toggleSummary(order?.Order?.invoice_id)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#FFE1E6",
                color: "#E94560",
                borderRadius: "300px",
                textAlign: "center",
                height: "40px",
                marginRight: "20px",
                marginTop: "-20px",
                minWidth: "200px",
              }}
            >
              {openSummaries[order?.Order?.invoice_id] ? (
                <>
                  Total Summary{" "}
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ marginLeft: "8px" }}
                  />
                </>
              ) : (
                <>
                  Total Summary{" "}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ marginLeft: "8px" }}
                  />
                </>
              )}
            </Button>
          </Box>
        </div>
        {order?.Order?.items?.order_items?.map((item, index) => (
          <WriteReview
            key={index}
            item={item}
            shopName={order?.Order?.items?.shop_name}
            orderDetails={order}
            status={order?.Order?.items?.status}
            delivered_at={order?.Order?.item?.delivered_at}
            orderItemId={order?.Order?.items?.order_item_id}
            cancel_status={order?.Order?.items?.order_items?.status}
            order_days_gone={order?.Order?.items?.order_items?.order_days_gone}
            return_status={order?.Order?.items?.order_items?.return_status}
          />
        ))}

        {openSummaries[order?.Order?.invoice_id] && (
          <Box p="20px" borderRadius={8} mt="1rem">
            <Typography variant="h6" fontWeight="bold" mt="0px" mb="14px">
              Total Summary (Overseas)
            </Typography>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
              fontWeight="bold"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <Typography fontSize="14px" color="text.hint">
                {/* {currency(order?.Order?.items?.order_items?.[0]?.price || 0)} */}
                {currency(order?.Order?.main_total || 0)}
              </Typography>
            </FlexBox>

            <FlexBox
              justifyContent="space-between"
              color="#16A34A"
              alignItems="center"
              mb="0.5rem"
              fontWeight="bold"
            >
              <Typography fontSize="14px">
                Advance Paid ({order?.Order?.amount_percentage}%):
              </Typography>
              <Typography fontSize="14px">
                {/* {currency(order?.Order?.items?.order_items?.[0]?.price || 0)} */}
                {currency(
                  order?.Order?.amount - order?.Order?.delivery_charge || 0
                )}
              </Typography>
            </FlexBox>

            {order?.Order?.amount_percentage !== "100" && (
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
                color="#E94560"
                fontWeight="bold"
              >
                <Typography fontSize="14px">Due:</Typography>
                <Typography fontSize="14px">
                  {currency(order?.Order?.due_amount || 0)}
                </Typography>
              </FlexBox>
            )}

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
              color="#7D879C"
              fontWeight="bold"
            >
              <Typography fontSize="14px">Shipping Fee:</Typography>

              {order?.Order?.delivery_charge === "0" ? (
                <FlexBox alignItems="center">
                  <Typography fontSize="14px" mr="0.5rem">
                    TBD
                  </Typography>
                  <Tooltip
                    title="Shipping & Courier Charge will be calculated based on actual weight & dimensions when the product is in-house by Tizaraa."
                    arrow
                    placement="top"
                  >
                    <InfoOutlinedIcon fontSize="small" color="action" />
                  </Tooltip>
                </FlexBox>
              ) : (
                <>
                  <Box flex="1" textAlign="center">
                    <Typography fontSize="13px" color="textSecondary">
                      {order?.Order?.delivery_charge_reason} from{" "}
                      {currency(order?.Order?.delivery_charge || 0)}
                    </Typography>
                  </Box>
                  <Typography fontSize="14px">
                    {currency(order?.Order?.delivery_charge || 0)}
                  </Typography>
                </>
              )}
            </FlexBox>

            {/* <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Typography fontSize="14px" color="text.hint">
            Shipping fee ({order?.Order?.items?.shop_name}):
          </Typography>
          <Typography fontSize="14px" color="text.hint">
            {currency(order?.Order?.items?.delivery_charge || 0)}
          </Typography>
        </FlexBox> */}

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
              fontWeight="bold"
            >
              <Typography variant="h6">Total Paid</Typography>
              <Typography variant="h6">
                {/* {currency(order?.Order?.items?.order_items?.[0]?.total_price || 0)} */}
                {currency(order?.Order?.paid || 0)}
              </Typography>
            </FlexBox>

            {/* <FlexBox alignItems="center" mb="1rem">
              Payment Method:
              <H6
                my="0px"
                mx="1rem"
                backgroundColor="rgba(255,225,230,1)"
                p="5px"
                px="10px"
                borderRadius="1rem"
                color="rgb(233, 69, 96)"
              >
                {order?.Order?.payment_method}
              </H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              Payment Status:
              <H6
                my="0px"
                mx="1rem"
                backgroundColor={
                  order?.Order?.amount_percentage === 100
                    ? "rgba(200, 255, 200, 1)" // greenish for Paid
                    : order?.Order?.amount_percentage > 0
                    ? "rgba(255, 250, 200, 1)" // yellowish for Partial Paid
                    : "rgba(255,225,230,1)" // reddish for Unpaid
                }
                p="5px"
                px="10px"
                borderRadius="1rem"
                color={
                  order?.Order?.amount_percentage === 100
                    ? "green"
                    : order?.Order?.amount_percentage > 0
                    ? "orange"
                    : "rgb(233, 69, 96)"
                }
              >
                {order?.Order?.amount_percentage === 100
                  ? "Paid"
                  : order?.Order?.amount_percentage > 0
                  ? "Partial Paid"
                  : "Unpaid"}
              </H6>
            </FlexBox> */}

            <FlexBox
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              {/* Payment Method Card */}
              <Box
                style={{
                  flex: 1,
                  minWidth: "280px",
                  padding: "28px",
                  borderRadius: "20px",
                  backgroundColor: "#FFF5F7",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#E94560",
                  }}
                >
                  Payment Method
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    backgroundColor: "#FECACA",
                    color: "#B91C1C",
                    padding: "10px 16px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    width: "fit-content",
                  }}
                >
                  {order?.Order?.payment_method || "N/A"}
                </Typography>
              </Box>

              {/* Payment Status Card */}
              <Box
                style={{
                  flex: 1,
                  minWidth: "280px",
                  padding: "28px",
                  borderRadius: "20px",
                  backgroundColor:
                    order?.Order?.amount_percentage === 100
                      ? "#ECFDF5"
                      : order?.Order?.amount_percentage > 0
                      ? "#FFFBEB"
                      : "#FFF1F2",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color:
                      order?.Order?.amount_percentage === 100
                        ? "#047857"
                        : order?.Order?.amount_percentage > 0
                        ? "#B45309"
                        : "#DC2626",
                  }}
                >
                  Payment Status
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    backgroundColor:
                      order?.Order?.amount_percentage === "100"
                        ? "#BBF7D0"
                        : order?.Order?.amount_percentage > "0"
                        ? "#FEF3C7"
                        : "#FECACA",
                    color:
                      order?.Order?.amount_percentage === "100"
                        ? "#065F46"
                        : order?.Order?.amount_percentage > "0"
                        ? "#92400E"
                        : "#B91C1C",
                    padding: "10px 16px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    width: "fit-content",
                  }}
                >
                  {order?.Order?.delivery_charge &&
                  order.Order.delivery_charge !== "0" &&
                  order.Order.delivery_charge !== 0
                    ? "Paid"
                    : order?.Order?.amount_percentage === "100"
                    ? "Paid (Excluding shipping fee)"
                    : order?.Order?.amount_percentage > "0"
                    ? "Partial Paid"
                    : "Unpaid"}
                </Typography>
              </Box>
            </FlexBox>

            {!(
              order?.Order?.delivery_charge &&
              order.Order.delivery_charge !== "0" &&
              order.Order.delivery_charge !== 0
            ) && (
              <Box
                backgroundColor="rgba(240, 248, 255, 0.8)"
                borderLeft="4px solid rgb(233, 69, 96)"
                borderRight="4px solid rgb(233, 69, 96)"
                p="10px"
                borderRadius="0.5rem"
                fontSize="14px"
                color="#333"
                fontWeight="500"
              >
                <FlexBox alignItems="flex-start">
                  <Box mr="8px" fontSize="18px" lineHeight="1.5">
                    📦
                  </Box>
                  <Box flex="1">
                    Shipping & Courier Charge will be calculated based on actual
                    weight & dimensions when the product is in-house by{" "}
                    <strong>Tizaraa</strong>.
                  </Box>
                </FlexBox>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={<OrderListButton params={params} />}
      />

      {/* <OrderStatus orderStatus={getStatus} deliveredAt={getEstimateDate} /> */}

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

        {/* <Box py="0.5rem">
          {order.Order.items && order.Order.items.length > 0 ? (
            order.Order.items.map((item, ind) => (
              <WriteReview key={ind} item={item} />
            ))
          ) : (
            <Typography>No items in this order.</Typography>
          )}
        </Box> */}

        {abroadProduct}

        {order?.Order?.productType !== "Abroad" && (
          <Box py="0.5rem">
            {order?.Order?.items && Object.keys(order.Order.items).length > 0
              ? Object.entries(order.Order.items).map(
                  ([shopName, shopDetails]) => {
                    const details = shopDetails as {
                      delivered_at: string | null;
                      order_items: any[];
                      delivery_charge: number | null;
                      promocodeStatus: number | null;
                      sub_total: number | null;
                      total: number | null;
                      status: string | null;
                      isAbroad: boolean; // Add a flag for checking if the product is from abroad
                    };

                    console.log("Check from ORDERS:: ", details.status);

                    return (
                      <Box key={shopName} my="1rem">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0",
                            }}
                          >
                            <Typography
                              fontWeight="bold"
                              fontSize="18px"
                              mb="1rem"
                              p="1rem"
                              style={{ margin: "0" }}
                            >
                              <FontAwesomeIcon
                                icon={faStore}
                                size="1x"
                                color="black"
                              />{" "}
                              {shopName}
                            </Typography>

                            {/* status  */}
                            <Box m="6px">
                              <Chip
                                p="0.25rem 1rem"
                                bg={getColor(details?.status)}
                              >
                                <Small color="white">{details?.status}</Small>
                              </Chip>
                            </Box>
                          </div>

                          {details?.delivered_at && (
                            <p
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#FFE1E6",
                                color: "#E94560",
                                borderRadius: "300px",
                                textAlign: "center",
                                height: "40px",
                                marginRight: "20px",
                                marginTop: "10px",
                                minWidth: "200px",
                              }}
                            >
                              Estimated Delivery Date:{" "}
                              <b>{details.delivered_at}</b>
                            </p>
                          )}

                          <Box mt="1rem" textAlign="center">
                            <Button
                              variant="text"
                              color="primary"
                              onClick={() => toggleSummary(shopName)}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#FFE1E6",
                                color: "#E94560",
                                borderRadius: "300px",
                                textAlign: "center",
                                height: "40px",
                                marginRight: "20px",
                                marginTop: "-20px",
                                minWidth: "200px",
                              }}
                            >
                              {openSummaries[shopName] ? (
                                <>
                                  Total Summary{" "}
                                  <FontAwesomeIcon
                                    icon={faCaretUp}
                                    style={{ marginLeft: "8px" }}
                                  />
                                </>
                              ) : (
                                <>
                                  Total Summary{" "}
                                  <FontAwesomeIcon
                                    icon={faCaretDown}
                                    style={{ marginLeft: "8px" }}
                                  />
                                </>
                              )}
                            </Button>
                          </Box>
                        </div>

                        {details?.order_items?.map((item, ind) => (
                          <WriteReview
                            key={ind}
                            item={item}
                            shopName={shopName}
                            orderDetails={details}
                            status={details.status}
                            orderItemId={item.order_item_id}
                            cancel_status={item.status}
                            order_days_gone={item.order_days_gone}
                            return_status={item.return_status}
                            delivered_at={details.delivered_at}
                          />
                        ))}
                        {/* <OrderStatus orderStatus={getStatus} deliveredAt={getEstimateDate} /> */}

                        <Box mt="10px" p="10px" border="1px solid #e94560" borderRadius="8px">
                        <OrderStatus
                          orderStatus={details.status}
                          deliveredAt={details.delivered_at}
                        />
                        </Box>

                        {openSummaries[shopName] && (
                          <Box p="20px" borderRadius={8} mt="1rem">
                            <Typography variant="h6" mt="0px" mb="14px">
                              Total Summary
                            </Typography>
                            <FlexBox
                              justifyContent="space-between"
                              alignItems="center"
                              mb="0.5rem"
                            >
                              <Typography fontSize="14px" color="text.hint">
                                Subtotal:
                              </Typography>
                              <Typography fontSize="14px" color="text.hint">
                                {currency(details.sub_total || 0)}
                                {/* {currency(order?.Order?.amount)} */}
                              </Typography>
                            </FlexBox>
                            <FlexBox
                              justifyContent="space-between"
                              alignItems="center"
                              mb="0.5rem"
                            >
                              <Typography fontSize="14px" color="text.hint">
                                Shipping fee ({shopName}):
                              </Typography>
                              <Typography fontSize="14px" color="text.hint">
                                {currency(details.delivery_charge || 0)}
                              </Typography>
                            </FlexBox>
                            <Divider mb="0.5rem" />
                            {/* Conditionally show Promo Applied if promocodeStatus is 1 */}
                            {/* {details.promocodeStatus === 1 && (
                      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
                        <Typography fontSize="14px" color="text.hint">
                          Promo Applied:
                        </Typography>
                        <Typography fontSize="14px" color="success.main">
                          Yes
                        </Typography>
                      </FlexBox>
                    )} */}

                            {/* <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6">
                        {currency(details.total || 0)}
                        </Typography>
                    </FlexBox> */}

                            <FlexBox
                              justifyContent="space-between"
                              alignItems="center"
                              mb="1rem"
                              position="relative"
                            >
                              <Typography variant="h6" color={"text.primary"}>
                                Total
                              </Typography>

                              <Typography
                                variant="h6"
                                display="flex"
                                alignItems="center"
                              >
                                {details.promocodeStatus === 1 && (
                                  <Box
                                    mr="0.5rem"
                                    px="0.4rem"
                                    py="0.2rem"
                                    backgroundColor="#E94560"
                                    color="#fff"
                                    borderRadius="12px"
                                    fontSize="13px"
                                    display="flex"
                                    alignItems="center"
                                    letterSpacing="1px"
                                  >
                                    Promo Applied &nbsp;
                                    <span
                                      style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        letterSpacing: "1px",
                                      }}
                                    >
                                      &#10003;
                                    </span>
                                  </Box>
                                )}
                                {currency(details.total || 0)}
                              </Typography>
                            </FlexBox>

                            <FlexBox alignItems="center" mb="1rem">
                              Payment Method:
                              <H6
                                my="0px"
                                mx="1rem"
                                backgroundColor="rgba(255,225,230,1)"
                                p="5px"
                                px="10px"
                                borderRadius="1rem"
                                color="rgb(233, 69, 96)"
                              >
                                {order?.Order?.delivery_type}
                              </H6>
                            </FlexBox>
                            <FlexBox alignItems="center" mb="1rem">
                              Payment Status:
                              <H6
                                my="0px"
                                mx="1rem"
                                backgroundColor="rgba(255,225,230,1)"
                                p="5px"
                                px="10px"
                                borderRadius="1rem"
                                color="rgb(233, 69, 96)"
                              >
                                {order?.Order?.payment_status}
                              </H6>
                            </FlexBox>
                          </Box>
                        )}
                      </Box>
                    );
                  }
                )
              : null}
          </Box>
        )}
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          {/* <Card p="20px 30px" borderRadius={8}>
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {order.Order.address}
            </Paragraph>
          </Card> */}

          <Card p="15px 20px" borderRadius={8}>
            <H5 mt="0px" mb="10px" fontSize="16px">
              Shipping Address
            </H5>

            {/* Main Address */}
            <Paragraph fontSize="14px" my="4px" color="black">
              {order.Order.address}
            </Paragraph>

            {/* Flex Layout for Details */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ color: "#555", fontWeight: 500 }}>Area:</span>
                <span style={{ color: "#000" }}>{order.Order.area_id}</span>
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ color: "#555", fontWeight: 500 }}>City:</span>
                <span style={{ color: "#000" }}>{order.Order.city_id}</span>
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ color: "#555", fontWeight: 500 }}>
                  Province:
                </span>
                <span style={{ color: "#000" }}>{order.Order.province_id}</span>
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ color: "#555", fontWeight: 500 }}>Phone:</span>
                <span style={{ color: "#000" }}>{order.Order.phone}</span>
              </div>
            </div>
          </Card>

          <div style={{ display: "flex", gap: "20px" }}>
            {/* <Button
              px="2rem"
              color="primary"
              bg="primary.light"
              mt="2rem"
              onClick={fetchInvoice} // Fetch invoice when button is clicked
            >
              {invoiceLoading ? <BeatLoader size={18} color="#E94560" /> : "Invoice"}
            </Button> */}

            {/* {order.Order.payment_status === "Unpaid" && (
             <Button
             px="2rem"
             color="success" // Or another green variant available in your theme
             bg="success.light" // Or a specific green shade
             mt="2rem"
             onClick={handleOnlinePayment}
             disabled={onlinePaymentLoading}
           >
             {onlinePaymentLoading ? (
               <BeatLoader size={18} color="rgba(51,208,103,0.79)" />
             ) : (
               "Online Payment"
             )}
           </Button>
           
            )} */}
            {/* {order.Order.payment_status === "Unpaid" && 
            !["Delivered", "Cancelled", "Return"].includes(order.Order.status) && (
              <Button
                px="2rem"
                color="success" // Or another green variant available in your theme
                bg="success.light" // Or a specific green shade
                mt="2rem"
                onClick={handleOnlinePayment}
                disabled={onlinePaymentLoading}
              >
                {onlinePaymentLoading ? (
                  <BeatLoader size={18} color="rgba(51,208,103,0.79)" />
                ) : (
                  "Online Payment"
                )}
              </Button>
            )
          } */}
          </div>

          {/* Invoice Display */}
          {/* {invoiceLoading && <Typography>Loading Invoice...</Typography>} */}
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

        {/* <Grid item lg={6} md={6} xs={12}>
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
            <FlexBox
              alignItems="center"
              mb="1rem"
            >
              Order Status:
              <H6 my="0px" mx="1rem">
                {order.Order.status}
              </H6>
            </FlexBox>
          </Card>
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
