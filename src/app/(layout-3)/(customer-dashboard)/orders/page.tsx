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
//       // console.log("nazim1");
//       // console.log("nazim",data);
//       if (Array.isArray(data.orders)) {
//         console.log("nazim2");
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
import { H5 } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { OrderRow, OrdersPagination } from "@sections/customer-dashboard/orders"; // Ensure OrderRow is imported correctly
import authService from "services/authService";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      // console.log("nazim",data);
      // console.log("nazim");
      
      
      if (Array.isArray(data.orders)) {
        setOrderList(data.orders);
        if (!fetched) { // Show toast only on initial fetch
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

    if (!token) {
      router.push("/login");
    } else if (!fetched) {
      fetchOrderList(token);
    }

    const success = localStorage.getItem("orderSuccess");
    if (success) {
      setOrderSuccess(true);
      localStorage.removeItem("orderSuccess");
    }
  }, [fetched,router]);

  // useEffect(() => {
  //   if (orderSuccess) {
  //     toast.success("Order placed successfully!");
  //     //console.log("nazim toast");
      
  //     setOrderSuccess(false); // Reset orderSuccess state after toast displays
  //   }
  // }, [orderSuccess]);

  const currentOrders = orderList.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage,
  );

  if (loading)
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );

  return (
    <Fragment>
      <ToastContainer /> {/* Render ToastContainer for toast notifications */}
      <DashboardPageHeader title="My Orders" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow
          boxShadow="none"
          padding="0px 18px"
          backgroundColor="transparent"
        >
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Order #
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date purchased
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>
          <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
        </TableRow>
      </Hidden>

      {currentOrders.map((order) => (
        <OrderRow key={order.invoice} order={order} />
      ))}
      <OrdersPagination
        orderList={orderList}
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Fragment>
  );
}


