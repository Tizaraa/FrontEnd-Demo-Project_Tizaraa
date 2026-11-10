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
import { keyframes } from "@emotion/react";
import toast from "react-hot-toast";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { AddNewAddress } from "@sections/customer-dashboard/address";
import Address from "@models/address.model";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
import EmptyOrders from "@sections/customer-dashboard/orders/EmptyOrders";
import { notifyDashboardCountsChanged } from "utils/dashboardCounts";

// What user/address actually returns (AddressResource), on top of the shared model
type AddressRow = Omit<Address, "city"> & {
 postal_code?: string | null;
 is_default?: boolean;
 province?: { id: number; province: string } | null;
 city?: { id: number; city: string } | null;
 area?: { id: number; area: string } | null;
};

// Motion: cards rise in once (staggered), dialog pops in. Transform/opacity only.
const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const fade = keyframes`
 from { opacity: 0; }
 to { opacity: 1; }
`;
const pop = keyframes`
 from { opacity: 0; transform: translateY(8px) scale(0.96); }
 to { opacity: 1; transform: none; }
`;
const shimmer = keyframes`
 from { background-position: -500px 0; }
 to { background-position: 500px 0; }
`;
const spin = keyframes`
 to { transform: rotate(360deg); }
`;

const AddressGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 16px;

 @media (max-width: 820px) {
  grid-template-columns: minmax(0, 1fr);
 }
`;

const AddressCard = styled.article`
 position: relative;
 display: flex;
 flex-direction: column;
 gap: 14px;
 padding: 20px;
 background: var(--tz-paper);
 border: 1px solid var(--tz-line);
 border-radius: 18px;
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
 animation-delay: calc(var(--i, 0) * 70ms);
 transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease, box-shadow 220ms ease;

 &:hover {
  transform: translateY(-2px);
  border-color: #f6b9a3;
  box-shadow: 0 12px 28px rgba(14, 52, 96, 0.08);
 }

 &.is-default {
  border-color: var(--tz-ember);
  background: linear-gradient(160deg, var(--tz-ember-tint) 0%, var(--tz-paper) 55%);
 }

 .ac-head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
 }
 .ac-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--tz-navy-tint);
  color: var(--tz-navy);
  font-family: var(--tz-font-display);
  font-size: 15px;
  font-weight: 700;
 }
 &.is-default .ac-avatar {
  background: var(--tz-ember-deep);
  color: #fff;
 }
 .ac-title {
  min-width: 0;
 }
 .ac-name {
  margin: 0;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  color: var(--tz-ink);
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .ac-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
 }
 .ac-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 700;
  background: var(--tz-line-soft);
  color: var(--tz-ink-soft);
 }
 .ac-chip svg {
  width: 12px;
  height: 12px;
 }
 .ac-chip--default {
  background: var(--tz-ember-deep);
  color: #fff;
 }

 .ac-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
 }
 .ac-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--tz-ink-soft);
  overflow-wrap: anywhere;
 }
 .ac-row svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  color: var(--tz-slate);
 }
 .ac-missing {
  color: var(--tz-slate);
  font-style: italic;
 }

 .ac-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--tz-line);
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  transition: none;
  &:hover {
   transform: none;
  }
 }
`;

const AddCard = styled(Link)`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 gap: 10px;
 min-height: 200px;
 padding: 20px;
 border: 2px dashed var(--tz-line);
 border-radius: 18px;
 color: var(--tz-slate);
 font-size: 14px;
 font-weight: 700;
 text-decoration: none;
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
 animation-delay: calc(var(--i, 0) * 70ms);
 transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;

 .add-plus {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--tz-mist);
  color: var(--tz-slate);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease, color 180ms ease;
 }
 .add-plus svg {
  width: 22px;
  height: 22px;
 }
 small {
  font-size: 12.5px;
  font-weight: 500;
 }

 &:hover {
  border-color: var(--tz-ember);
  background: var(--tz-ember-tint);
  color: var(--tz-ember-deep);
 }
 &:hover .add-plus {
  transform: rotate(90deg);
  background: var(--tz-ember-deep);
  color: #fff;
 }
 &:focus-visible {
  outline: none;
  box-shadow: var(--tz-focus-ring);
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  transition: none;
  .add-plus {
   transition: none;
  }
  &:hover .add-plus {
   transform: none;
  }
 }
`;

const ActionButton = styled.button`
 display: inline-flex;
 align-items: center;
 gap: 6px;
 min-height: 36px;
 padding: 0 14px;
 border: 1px solid var(--tz-line);
 border-radius: 999px;
 background: var(--tz-paper);
 color: var(--tz-ink-soft);
 font-family: inherit;
 font-size: 13px;
 font-weight: 700;
 text-decoration: none;
 cursor: pointer;
 transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;

 svg {
  width: 15px;
  height: 15px;
 }

 &:hover {
  border-color: var(--tz-navy);
  background: var(--tz-navy-tint);
  color: var(--tz-navy);
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

const Skeleton = styled.div`
 height: 200px;
 border-radius: 18px;
 background: linear-gradient(90deg, var(--tz-mist) 0%, var(--tz-line-soft) 50%, var(--tz-mist) 100%);
 background-size: 1000px 100%;
 animation: ${shimmer} 1.3s linear infinite;

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

const Backdrop = styled.div`
 position: fixed;
 inset: 0;
 z-index: 999;
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 16px;
 background-color: rgba(20, 21, 32, 0.45);
 backdrop-filter: blur(4px);
 -webkit-backdrop-filter: blur(4px);
 animation: ${fade} 180ms ease both;

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

const DialogBox = styled.div`
 width: 100%;
 max-width: 420px;
 padding: 24px;
 border-radius: 20px;
 background: var(--tz-paper);
 box-shadow: 0 24px 60px rgba(20, 21, 32, 0.25);
 animation: ${pop} 240ms cubic-bezier(0.22, 1, 0.36, 1) both;

 .dl-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: var(--tz-danger-bg);
  color: var(--tz-danger);
 }
 .dl-icon svg {
  width: 22px;
  height: 22px;
 }
 h3 {
  margin: 0;
  font-family: var(--tz-font-display);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--tz-ink);
 }
 p {
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--tz-slate);
 }
 .dl-target {
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid var(--tz-line-soft);
  border-radius: 12px;
  background: var(--tz-mist);
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--tz-ink-soft);
  overflow-wrap: anywhere;
 }
 .dl-target strong {
  display: block;
  color: var(--tz-ink);
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

const ButtonGroup = styled.div`
 margin-top: 22px;
 display: flex;
 justify-content: flex-end;
 gap: 10px;
`;

const DialogButton = styled.button<{ danger?: boolean }>`
 display: inline-flex;
 align-items: center;
 gap: 8px;
 min-height: 44px;
 padding: 0 20px;
 border: 1px solid ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-line)")};
 border-radius: 12px;
 font-family: inherit;
 font-size: 15px;
 font-weight: 700;
 cursor: pointer;
 background-color: ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-paper)")};
 color: ${({ danger }) => (danger ? "var(--tz-paper)" : "var(--tz-ink)")};

 &:hover:enabled {
  background-color: ${({ danger }) => (danger ? "var(--tz-danger)" : "var(--tz-mist)")};
  opacity: ${({ danger }) => (danger ? 0.9 : 1)};
 }
 &:disabled {
  opacity: 0.7;
  cursor: not-allowed;
 }
 &:focus-visible {
  outline: none;
  box-shadow: var(--tz-focus-ring);
 }

 .spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
 }
`;

// Inline icons (stroke = currentColor)
const Svg = ({ children }: { children: React.ReactNode }) => (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {children}
 </svg>
);
const I = {
 pin: <Svg><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></Svg>,
 phone: <Svg><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Svg>,
 home: <Svg><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></Svg>,
 office: <Svg><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /></Svg>,
 tag: <Svg><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1" /></Svg>,
 star: <Svg><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></Svg>,
 edit: <Svg><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Svg>,
 trash: <Svg><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" /></Svg>,
 plus: <Svg><path d="M12 5v14M5 12h14" /></Svg>,
};

function initialsOf(name?: string) {
 const parts = (name || "").trim().split(/\s+/).filter(Boolean);
 if (!parts.length) return "?";
 return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

// Street, area, city, division, postcode, skipping blanks and repeats
function fullAddress(item: AddressRow) {
 const parts = [item.address, item.area?.area, item.city?.city, item.province?.province, item.postal_code]
  .map((p) => (p == null ? "" : String(p).trim()))
  .filter(Boolean);
 return parts.filter((p, i) => parts.findIndex((q) => q.toLowerCase() === p.toLowerCase()) === i).join(", ");
}

function LabelChip({ label }: { label?: string }) {
 const text = (label || "").trim();
 if (!text) return null;
 const icon = /office|work/i.test(text) ? I.office : /home|house/i.test(text) ? I.home : I.tag;
 return (
  <span className="ac-chip">
   {icon}
   {text}
  </span>
 );
}

function AddressItem({
 item,
 index,
 onDelete,
}: {
 item: AddressRow;
 index: number;
 onDelete: (item: AddressRow) => void;
}) {
 const line = fullAddress(item);
 return (
  <AddressCard
   className={item.is_default ? "is-default" : undefined}
   style={{ ["--i" as any]: index }}
   aria-label={`Address for ${item.name || "unnamed"}`}
  >
   <div className="ac-head">
    <span className="ac-avatar" aria-hidden="true">
     {initialsOf(item.name)}
    </span>
    <div className="ac-title">
     <p className="ac-name">{item.name || <span className="ac-missing">No name</span>}</p>
     <div className="ac-chips">
      <LabelChip label={item.landmark} />
      {item.is_default && (
       <span className="ac-chip ac-chip--default">
        {I.star}
        Default
       </span>
      )}
     </div>
    </div>
   </div>

   <div className="ac-body">
    <p className="ac-row">
     {I.pin}
     <span>{line || <span className="ac-missing">Address not provided</span>}</span>
    </p>
    <p className="ac-row">
     {I.phone}
     <span>{item.phone || <span className="ac-missing">Phone not provided</span>}</span>
    </p>
   </div>

   <div className="ac-actions">
    <Link href={`/address/edit/${item.id}`} style={{ textDecoration: "none" }}>
     <ActionButton as="span">
      {I.edit}
      Edit
     </ActionButton>
    </Link>
    <ActionButton
     type="button"
     className="danger"
     onClick={(e) => {
      e.stopPropagation();
      onDelete(item);
     }}
    >
     {I.trash}
     Delete
    </ActionButton>
   </div>
  </AddressCard>
 );
}

export default function AddressList() {
 const [target, setTarget] = useState<AddressRow | null>(null);
 const [deleting, setDeleting] = useState(false);
 const [addresses, setAddresses] = useState<AddressRow[]>([]);
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
    setAddresses(response.data.address || []);
   } catch (error) {
    console.error("Error fetching addresses:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchAddresses();
 }, [authtoken]);

 // Esc closes the confirm dialog (unless a delete is in progress)
 useEffect(() => {
  if (!target) return;
  const onKey = (e: KeyboardEvent) => {
   if (e.key === "Escape" && !deleting) setTarget(null);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
 }, [target, deleting]);

 const confirmDelete = async () => {
  if (!target) return;
  setDeleting(true);
  try {
   await axios.delete(`${ApiBaseUrl.localApiUrl}user/address/delete/${target.id}`, {
    headers: {
     Authorization: `Bearer ${authtoken}`,
    },
   });
   setAddresses((prev) => prev.filter((a) => a.id !== target.id));
   notifyDashboardCountsChanged();
   toast.success("Address Deleted successfully!");
   setTarget(null);
  } catch (error) {
   toast.error("Failed deleting address.");
  } finally {
   setDeleting(false);
  }
 };

 return (
  <Fragment>
   <DashboardPageHeader
    title="My addresses"
    subtitle={
     !loading && addresses.length
      ? `${addresses.length} saved address${addresses.length > 1 ? "es" : ""}`
      : "Where we deliver your orders"
    }
    iconName="pin_filled"
    button={<AddNewAddress />}
   />

   {loading ? (
    <AddressGrid aria-busy="true" aria-label="Loading addresses">
     <Skeleton />
     <Skeleton />
    </AddressGrid>
   ) : addresses?.length > 0 ? (
    <AddressGrid>
     {addresses.map((item, i) => (
      <AddressItem key={item.id} item={item} index={i} onDelete={setTarget} />
     ))}
     <AddCard href="/address/create" style={{ ["--i" as any]: addresses.length }}>
      <span className="add-plus">{I.plus}</span>
      Add new address
      <small>Home, office or anywhere else</small>
     </AddCard>
    </AddressGrid>
   ) : (
    <EmptyOrders
     title="No saved addresses"
     message="Add an address once and pick it at checkout next time."
     actionLabel="Add new address"
     actionHref="/address/create"
    />
   )}

   {target && (
    <Backdrop
     onClick={(e) => {
      if (e.target === e.currentTarget && !deleting) setTarget(null);
     }}
    >
     <DialogBox role="alertdialog" aria-modal="true" aria-labelledby="dl-title" aria-describedby="dl-desc">
      <span className="dl-icon">{I.trash}</span>
      <h3 id="dl-title">Delete this address?</h3>
      <p id="dl-desc">This can't be undone.</p>
      <div className="dl-target">
       <strong>{target.name || "No name"}</strong>
       {fullAddress(target)}
      </div>
      <ButtonGroup>
       <DialogButton type="button" onClick={() => setTarget(null)} disabled={deleting} autoFocus>
        Cancel
       </DialogButton>
       <DialogButton type="button" danger onClick={confirmDelete} disabled={deleting}>
        {deleting && <span className="spinner" aria-hidden="true" />}
        {deleting ? "Deleting..." : "Delete"}
       </DialogButton>
      </ButtonGroup>
     </DialogBox>
    </Backdrop>
   )}
  </Fragment>
 );
}
