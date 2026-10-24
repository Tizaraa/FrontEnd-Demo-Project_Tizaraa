// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import Icon from "@component/icon/Icon";
// import TableRow from "@component/TableRow";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import { Fragment } from "react";
// // import "./Dialog"
// import "./Dialog"
// import {
//     AddNewAddress,
//      AddressPagination,
//      AddressForm
//    } from "@sections/customer-dashboard/address"; // Import AddressItem component
// import Address from "@models/address.model";
// import authService from "services/authService"; // Make sure Address model is defined and imported correctly
// import { Card1 } from "@component/Card1";

// export default function AddressList() {
//   const [dialog,setDialog] = useState({
//     message: "",
//     isLoading: true,
//   });
//   const [addresses, setAddresses] = useState<Address[]>([]);

//   const authtoken = authService.getToken(); // Retrieve the auth token

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get(
//           `https://frontend.tizaraa.com/api/user/address`,
//   {
//     headers: {
//       Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//     },
//   }
// );
//         setAddresses(response.data.user); // Assuming the data is structured as shown in the API response
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };

//     fetchAddresses();
//   }, [authtoken]);

//   const handleDelete = async (id: String) => {
//     setDialog({
//       message: "Are you sure you want to delete?",
//       isLoading: true
//     })

//     const areUsureDelete = (choose)=>{
//       if(choose){
//         setAddresses((prevAddresses) =>
//           prevAddresses.filter((address) => address.id !== id)
//         );
//       }else{

//       }
//     }

//     //alert(id)
//     try {
//       await axios.get(`https://frontend.tizaraa.com/api/user/address/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//         },
//       });
//       // Remove the deleted address from the state
//       setAddresses((prevAddresses) =>
//         prevAddresses.filter((address) => address.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     }
//   };

//   return (
//     <Fragment>
//       <DashboardPageHeader title="My addresses" iconName="pin_filled" button={<AddNewAddress />} />
//       {/* <Card1 borderRadius={8}>
//         <AddressForm />
//       </Card1> */}
//       {addresses.length > 0 ? (
//         addresses.map((item) => (
//           <AddressItem key={item.id} item={item} onDelete={handleDelete} />
//         ))
//       ) : (
//         <div>No addresses found</div>
//       )}
//     </Fragment>
//   );
// }

// function AddressItem({
//   item,
//   onDelete,
// }: {
//   item: Address;
//   onDelete: (id: String) => void;
// }) {
//   return (
//     <TableRow my="1rem" padding="6px 18px">
//       <Typography className="pre" m="6px" textAlign="left">
//         {item.name || "No Name"} {/* Display name or fallback */}
//       </Typography>

//       <Typography
//         flex="1 1 260px !important"
//         m="6px"
//         textAlign="left"
//         style={{
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {item.address}
//       </Typography>

//       <Typography className="pre" m="6px" textAlign="left">
//         {item.phone}
//       </Typography>

//       <Typography className="pre" textAlign="center" color="text.muted">
//         <Link href={`/address/edit/${item.id}`}>
//           <IconButton>
//             <Icon variant="small" defaultcolor="currentColor">
//               edit
//             </Icon>
//           </IconButton>
//         </Link>

//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(item.id); // Call the onDelete handler
//           }}
//         >
//           <Icon variant="small" defaultcolor="currentColor">
//             delete
//           </Icon>
//         </IconButton>
//         {dialog.isLoading && <Dialog onDialog={areUsureDelete} message={dialog.messege} />}
//       </Typography>
//     </TableRow>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import Icon from "@component/icon/Icon";
// import TableRow from "@component/TableRow";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import { Fragment } from "react";
// import Dialog from "./Dialog"; // Import the Dialog component
// import toast, { Toaster } from "react-hot-toast";
// import { Vortex } from 'react-loader-spinner'
// import  styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import { useSearchParams,useRouter } from "next/navigation";
// import {
//   AddNewAddress,
// } from "@sections/customer-dashboard/address"; // Import AddressItem component
// import Address from "@models/address.model";
// import authService from "services/authService"; // Make sure Address model is defined and imported correctly
// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export default function AddressList() {
//   const [dialog, setDialog] = useState({
//     message: "",
//     isLoading: false,
//     id: null, // Track the ID to delete
//   });
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const authtoken = authService.getToken();// Retrieve the auth token

//   useEffect(() => {
//     const checkAuth = () => {
//       if (!authService.isAuthenticated()) {
//         router.push("/login");
//       } else {
//         setIsLoggedIn(true);
//       }
//     };
//     checkAuth();
//   }, [router]);

//   // if (!isLoggedIn) {
//   //   return null; // You can also return a loader or a placeholder here
//   // }

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get(`${ApiBaseUrl.baseUrl}user/address`, {
//           headers: {
//             Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//           },
//         });
//         setAddresses(response.data.user); // Assuming the data is structured as shown in the API response
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchAddresses();
//   }, [authtoken]);

//   const handleDelete = async (id: string) => {
//     setDialog({
//       message: "Are you sure you want to delete?",
//       isLoading: true,
//       id: id, // Set the ID of the address to delete
//     });
//   };

//   const areYouSureDelete = async (choose: boolean) => {
//     if (choose) {
//       try {
//         await axios.get(`${ApiBaseUrl.baseUrl}user/address/delete/${dialog.id}`, {
//           headers: {
//             Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//           },
//         });
//         // Remove the deleted address from the state
//         setAddresses((prevAddresses) =>
//           prevAddresses.filter((address) => address.id !== dialog.id)
//         );
//         toast.success("Address Deleted successfully!");
//       } catch (error) {
//         toast.error("Failed deleting address.");
//       }
//     }
//     setDialog({ ...dialog, isLoading: false }); // Close the dialog
//   };

//   return (
//     <Fragment>
//       <DashboardPageHeader title="My addresses" iconName="pin_filled" button={<AddNewAddress />} />
//       {loading ? (
//         <LoaderWrapper>
//           <Vortex />
//         </LoaderWrapper>
//       ): addresses.length > 0 ? (
//         addresses.map((item) => (
//           <AddressItem key={item.id} item={item} onDelete={handleDelete} />
//         ))
//       ) : (
//         <Typography textAlign="center" m="20px">
//           No address found
//         </Typography>
//       )}
//       {/* Show Dialog only if isLoading is true */}
//       {dialog.isLoading && <Dialog message={dialog.message} onDialog={areYouSureDelete} />}
//     </Fragment>
//   );
// }

// function AddressItem({
//   item,
//   onDelete,
// }: {
//   item: Address;
//   onDelete: (id: string) => void;
// }) {
//   return (
//     <TableRow my="1rem" padding="6px 18px">
//       <Typography className="pre" m="6px" textAlign="left">
//         {item.name || "No Name"} {/* Display name or fallback */}
//       </Typography>

//       <Typography
//         flex="1 1 260px !important"
//         m="6px"
//         textAlign="left"
//         style={{
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {item.address}
//       </Typography>

//       <Typography className="pre" m="6px" textAlign="left">
//         {item.phone}
//       </Typography>

//       <Typography className="pre" textAlign="center" color="text.muted">
//         <Link href={`/address/edit/${item.id}`}>
//           <IconButton>
//             <Icon variant="small" defaultcolor="currentColor">
//               edit
//             </Icon>
//           </IconButton>
//         </Link>

//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(item.id); // Call the onDelete handler
//           }}
//         >
//           <Icon variant="small" defaultcolor="currentColor">
//             delete
//           </Icon>
//         </IconButton>
//       </Typography>
//     </TableRow>
//   );
// }

"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { Vortex } from "react-loader-spinner";
import { DeleteIcon, EditIcon } from "lucide-react";
import Typography from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { AddNewAddress } from "@sections/customer-dashboard/address";
import Address from "@models/address.model";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
// import { motion } from "framer-motion";
import Loader from "@component/loader";
import EmptyOrders from "@sections/customer-dashboard/orders/EmptyOrders";

// Styled Components
// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const AddressGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 16px;

 @media (max-width: 820px) {
  grid-template-columns: minmax(0, 1fr);
 }
`;

const AddressCard = styled.article`
 display: flex;
 flex-direction: column;
 gap: 8px;
 padding: 20px;
 background: var(--tz-paper);
 border: 1px solid var(--tz-line);
 border-radius: var(--tz-radius-md);

 .ac-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--tz-ink);
 }

 .ac-missing {
  color: var(--tz-slate);
  font-weight: 400;
  font-style: italic;
 }

 .ac-line {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--tz-ink-soft);
  overflow-wrap: anywhere;
 }

 .ac-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--tz-line-soft);
 }
`;

const ActionButton = styled.button`
 display: inline-flex;
 align-items: center;
 gap: 6px;
 min-height: 36px;
 padding: 0 12px;
 border: 1px solid var(--tz-line);
 border-radius: var(--tz-radius-sm);
 background: var(--tz-paper);
 color: var(--tz-ink);
 font-family: inherit;
 font-size: 14px;
 font-weight: 500;
 cursor: pointer;
 transition: background-color var(--tz-motion-fast), border-color var(--tz-motion-fast),
  color var(--tz-motion-fast);

 &:hover {
  border-color: var(--tz-slate);
  background: var(--tz-mist);
 }

 &.danger:hover {
  border-color: var(--tz-danger);
  background: var(--tz-danger-bg);
  color: var(--tz-danger);
 }

 &:focus-visible {
  outline: none;
  box-shadow: var(--tz-focus-ring);
 }
`;

const Backdrop = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 z-index: 999;
 width: 100vw;
 height: 100vh;
 background-color: rgba(20, 21, 32, 0.45);
 display: flex;
 justify-content: center;
 align-items: center;
`;

const DialogBox = styled.div`
 background: var(--tz-paper);
 padding: 24px;
 border-radius: var(--tz-radius-lg);
 max-width: 400px;
 width: 90%;
 box-shadow: var(--tz-elevation-raised);

 h3 {
  margin: 0;
  font-family: var(--tz-font-display);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tz-ink);
 }
`;

const ButtonGroup = styled.div`
 margin-top: 24px;
 display: flex;
 justify-content: flex-end;
 gap: 12px;
`;

const DialogButton = styled.button<{ danger?: boolean }>`
 min-height: 44px;
 padding: 0 20px;
 border: 1px solid ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-line)")};
 border-radius: var(--tz-radius-md);
 font-family: inherit;
 font-size: 15px;
 font-weight: 600;
 cursor: pointer;
 background-color: ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-paper)")};
 color: ${({ danger }) => (danger ? "var(--tz-paper)" : "var(--tz-ink)")};

 &:hover {
  background-color: ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-mist)")};
  opacity: ${({ danger }) => (danger ? 0.9 : 1)};
 }

 &:focus-visible {
  outline: none;
  box-shadow: var(--tz-focus-ring);
 }
`;

function AddressItem({
 item,
 onDelete,
}: {
 item: Address;
 onDelete: (id: string) => void;
}) {
 return (
  <AddressCard>
   <p className="ac-name">
    {item.name || <span className="ac-missing">No name</span>}
   </p>
   <p className="ac-line">{item.address}</p>
   <p className="ac-line">
    {item.phone || <span className="ac-missing">Phone not provided</span>}
   </p>

   <div className="ac-actions">
    <Link href={`/address/edit/${item.id}`}>
     <ActionButton as="span">
      <EditIcon size={16} aria-hidden="true" />
      Edit
     </ActionButton>
    </Link>

    <ActionButton
     type="button"
     className="danger"
     onClick={(e) => {
      e.stopPropagation();
      onDelete(item.id);
     }}
    >
     <DeleteIcon size={16} aria-hidden="true" />
     Delete
    </ActionButton>
   </div>
  </AddressCard>
 );
}

export default function AddressList() {
 const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  id: null,
 });
 const [addresses, setAddresses] = useState<Address[]>([]);
 const [loading, setLoading] = useState(true);
 const router = useRouter();
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const authtoken = authService.getToken();

 useEffect(() => {
  if (!authService.isAuthenticated()) {
   router.push("/login");
  } else {
   setIsLoggedIn(true);
  }
 }, [router]);

 useEffect(() => {
  const fetchAddresses = async () => {
   try {
    const response = await axios.get(`${ApiBaseUrl.localApiUrl}user/address`, {
     headers: {
      Authorization: `Bearer ${authtoken}`,
     },
    });
    // setAddresses(response.data.user);
    setAddresses(response.data.address);
    console.log("address", response.data.address);

   } catch (error) {
    console.error("Error fetching addresses:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchAddresses();
 }, [authtoken]);

 const handleDelete = (id: string) => {
  setDialog({
   message: "Are you sure you want to delete this address?",
   isLoading: true,
   id,
  });
 };

 const areYouSureDelete = async (choose: boolean) => {
  if (choose && dialog.id) {
   try {
    await axios.get(`${ApiBaseUrl.localApiUrl}user/address/delete/${dialog.id}`, {
     headers: {
      Authorization: `Bearer ${authtoken}`,
     },
    });
    setAddresses((prev) => prev.filter((a) => a.id !== dialog.id));
    toast.success("Address Deleted successfully!");
   } catch (error) {
    toast.error("Failed deleting address.");
   }
  }
  setDialog({ ...dialog, isLoading: false });
 };

 return (
  <Fragment>
   <DashboardPageHeader
    title="My addresses"
    iconName="pin_filled"
    button={<AddNewAddress />}
   />

   {loading ? (
    <Typography>
     <Loader />
    </Typography>
   ) : addresses?.length > 0 ? (
    <AddressGrid>
     {addresses.map((item) => (
      <AddressItem key={item.id} item={item} onDelete={handleDelete} />
     ))}
    </AddressGrid>
   ) : (
    <EmptyOrders
     title="No saved addresses"
     message="Add an address once and pick it at checkout next time."
     actionLabel="Add new address"
     actionHref="/address/create"
    />
   )}

   {dialog.isLoading && (
    <Backdrop>
     <DialogBox
     // initial={{ opacity: 0, scale: 0.9 }}
     // animate={{ opacity: 1, scale: 1 }}
     // transition={{ duration: 0.2 }}
     >
      <h3>{dialog.message}</h3>
      <ButtonGroup>
       <DialogButton type="button" onClick={() => areYouSureDelete(false)}>
        Cancel
       </DialogButton>
       <DialogButton type="button" danger onClick={() => areYouSureDelete(true)}>
        Delete
       </DialogButton>
      </ButtonGroup>
     </DialogBox>
    </Backdrop>
   )}
  </Fragment>
 );
}
