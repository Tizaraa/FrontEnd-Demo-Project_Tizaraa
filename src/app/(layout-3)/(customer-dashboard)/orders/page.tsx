// "use client";
// import { Fragment, useEffect, useState } from "react";
// import api from "@utils/__api__/orders"; // Assuming you have an API utility
// import Hidden from "@component/hidden";
// import TableRow from "@component/TableRow";
// import { H5 } from "@component/Typography";
// import { useRouter } from "next/navigation";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import { OrderRow } from "@sections/customer-dashboard/orders"; // Ensure OrderRow is imported correctly
// import Cookies from "js-cookie";
// import axios from "axios";
// import authService from "services/authService";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

// export default function OrderList() {
//   const router = useRouter();
//   const [orderList, setOrderList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   //const [fetched, setFetched] = useState(false);

//   useEffect(() => {
//     // const token = Cookies.get("token");
//     const token = authService.getToken();

//     if (!token) {
//       router.push("/login");
//     } else {
//       //console.log(token);

//       fetchOrderList(token);
//       //toast.success("Order placed successfully!");
//     }

//     const success = localStorage.getItem("orderSuccess");
//     if (success) {
//       setOrderSuccess(true);
//       localStorage.removeItem("orderSuccess");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (orderSuccess) {
//       // alert("Order placed successfully!");
//       toast.success("Order placed successfully!");
//       // toast('🦄 Wow so easy!', {
//       //   position: "top-right",
//       //   autoClose: 5000,
//       //   hideProgressBar: false,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       //   draggable: true,
//       //   progress: undefined,
//       //   theme: "light",
//       //   //transition: Bounce,
//       //   });

//       //setOrderSuccess(false);
//     }
//   }, [orderSuccess]);

//   const fetchOrderList = async (token: string) => {
//     try {
//       const response = await axios.get(`${ApiBaseUrl.baseUrl}user/order`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data;
//       if (Array.isArray(data.orders)) {
//         setOrderList(data.orders);
//         //toast.success("Order placed successfully!");
//       } else {
//         console.error("Orders not found in the expected format");
//       }
//     } catch (error) {
//       console.error("Failed to fetch order list:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <LoaderWrapper>
//         <Vortex />
//       </LoaderWrapper>
//     );

//   return (
//     <Fragment>
//       <DashboardPageHeader title="My Orders" iconName="bag_filled" />

//       <Hidden down={769}>
//         <TableRow
//           boxShadow="none"
//           padding="0px 18px"
//           backgroundColor="transparent"
//         >
//           <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
//             Order #
//           </H5>
//           <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
//             Status
//           </H5>
//           <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
//             Date purchased
//           </H5>
//           <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
//             Total
//           </H5>
//           <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
//         </TableRow>
//       </Hidden>

//       {orderList.map((order) => (
//         <OrderRow key={order.invoice} order={order} />
//       ))}
//     </Fragment>
//   );
// }

"use client";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@utils/__api__/orders"; // Assuming you have an API utility
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import {
 OrderRow,
 OrdersPagination,
} from "@sections/customer-dashboard/orders"; // Ensure OrderRow is imported correctly
import authService from "services/authService";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import { toast } from "react-hot-toast"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import Image from "next/image";
import NextImage from "@component/NextImage";
import Loader from "@component/loader";
import { CpuIcon } from "lucide-react";

export default function OrderList() {
 //const order_List = await api.getOrders();
 const router = useRouter();
 const [orderList, setOrderList] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [orderSuccess, setOrderSuccess] = useState(false);
 const [fetched, setFetched] = useState(false);
 const [currentPage, setCurrentPage] = useState(0);
 const ordersPerPage = 10;

 const fetchOrderList = async (token: string) => {
  try {
   const response = await axios.get(`${ApiBaseUrl.baseUrl}user/order`, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = response.data;

   if (Array.isArray(data.orders)) {
    setOrderList(data.orders);
    if (!fetched) {
     // Show toast only on initial fetch
     //toast.success("Order placed successfully!");
     //setOrderSuccess(true);
     setFetched(true); // Mark as fetched
    }
   } else {
    console.error("Orders not found in the expected format");
   }
  } catch (error) {
   console.error("Failed to fetch order list:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  const token = authService.getToken();

  if (!fetched) {
   fetchOrderList(token);
  }

  const success = localStorage.getItem("orderSuccess");
  if (success) {
   setOrderSuccess(true);
   localStorage.removeItem("orderSuccess");
  }
 }, [fetched, router]);

 useEffect(() => {
  if (orderSuccess) {
   toast.success("Order placed successfully!");

   setOrderSuccess(false); // Reset orderSuccess state after toast displays
  }
 }, [orderSuccess]);

 useEffect(() => {
  const queryString = window.location.search;
  console.log("Query String:", queryString); // Log query string

  const urlParams = new URLSearchParams(queryString);
  const status = urlParams.get("status");
  const message = urlParams.get("message");
  console.log("Status:", status);
  console.log("Message:", decodeURIComponent(message || ""));

  if (status === "success" && message) {
   toast.success(decodeURIComponent(message));
  } else if (status === "fail" && message) {
   toast.error(decodeURIComponent(message));
  }
 }, []);

 const currentOrders = orderList.slice(
  currentPage * ordersPerPage,
  (currentPage + 1) * ordersPerPage
 );

 if (loading) {
  return (
   <Typography>
    <Loader />
   </Typography>
  );
 }

 return (
  <>
   {/* Background image */}
   {/* <NextImage
  alt="newArrivalBanner"
  src={tizaraa_watermark}
  priority
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    width: "100%", // Set to 100% to ensure full responsiveness
    height: "auto", // Maintain aspect ratio
    maxWidth: "1200px", // Optional: Limit the maximum width
    backgroundSize: "contain", // Adjust the scaling behavior
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  }}
/>

     <main
    style={{
      position: "relative",
      background: "none",
    }}
  > */}

   <Fragment>
    {/* Render ToastContainer for toast notifications */}
    <DashboardPageHeader title="My Orders" iconName="bag_filled" />

    <Hidden down={769}>
     <TableRow
      boxShadow="none"
      padding="0px 18px"
      backgroundColor="transparent"
     >
      <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
       Order ID
      </H5>
      {/* <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5> */}
      <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
       Date purchased
      </H5>
      <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
       Items
      </H5>
      <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
       Total
      </H5>
      <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
     </TableRow>
    </Hidden>

    {orderList?.length === 0 ? (
     <div
      style={{
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       justifyContent: "center",
       padding: "60px 20px",
       textAlign: "center",
       color: "#888",
      }}
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="80"
       height="80"
       viewBox="0 0 24 24"
       fill="none"
       stroke="#D3D3D3"
       strokeWidth="1.5"
       strokeLinecap="round"
       strokeLinejoin="round"
       style={{ marginBottom: "20px" }}
      >
       <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
       <line x1="3" y1="6" x2="21" y2="6" />
       <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <h3
       style={{
        fontSize: "20px",
        fontWeight: 600,
        color: "#444",
        marginBottom: "8px",
       }}
      >
       No Orders Yet!
      </h3>
      <p
       style={{
        fontSize: "14px",
        color: "#999",
        marginBottom: "24px",
        maxWidth: "320px",
       }}
      >
       You haven't placed any orders yet. Browse our products and place your
       first order today!
      </p>
      <a
       href="/"
       style={{
        display: "inline-block",
        padding: "10px 28px",
        backgroundColor: "#D23F57",
        color: "#fff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "14px",
       }}
      >
       Shop Now
      </a>
     </div>
    ) : (
     <>
      {currentOrders.map((order) => (
       <OrderRow key={order.invoice} order={order} />
      ))}
      <OrdersPagination
       orderList={orderList}
       ordersPerPage={ordersPerPage}
       currentPage={currentPage}
       onPageChange={setCurrentPage}
      />
     </>
    )}
   </Fragment>
   {/* </main> */}
  </>
 );
}
