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
//       <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />
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
//       <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />
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
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";
import toast, { Toaster } from "react-hot-toast";
import { Vortex } from "react-loader-spinner";
import { DeleteIcon, EditIcon } from "lucide-react";
import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Dialog from "./Dialog";
import { AddNewAddress } from "@sections/customer-dashboard/address";
import Address from "@models/address.model";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";

// Styled Components
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.125rem;
  margin: 1rem 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.15);
    transform: translateY(-1px);
    border-left: 3px solid #e94560;
  }
`;

const TableCell = styled(Typography)`
  margin: 0.375rem;
  padding: 0.375rem;
  font-size: 0.875rem;
  color: ${({ muted }) => (muted ? "#6B7280" : "#111827")};
  flex: ${({ flex }) => flex || "1"};
  &.highlight {
    color: #e94560;
    font-weight: 500;
  }
`;

const AddressTableCell = styled(TableCell)`
  flex: 1 1 260px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 120px;
`;

const StyledIconButton = styled(IconButton)`
  color: #6b7280;
  transition: all 0.2s ease;
  border-radius: 6px;

  &:hover {
    background: rgba(69, 233, 110, 0.15);
    color: green;
  }

  &.delete-btn:hover {
    background: rgba(233, 69, 96, 0.08);
    color: #e94560;
  }
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${({ active }: { active?: boolean }) =>
    active ? "#E94560" : "#D1D5DB"};
`;

interface StatusIndicatorProps {
  active?: boolean;
}

// AddressItem Component
function AddressItem({
  item,
  onDelete,
}: {
  item: Address;
  onDelete: (id: string) => void;
}) {
  return (
    <StyledTableRow>
      <TableCell
        className={`pre ${!item.name ? "highlight" : ""}`}
        textAlign="left"
      >
        {item.name || "No Name"}
      </TableCell>

      <AddressTableCell textAlign="left">{item.address}</AddressTableCell>

      <TableCell className="pre" textAlign="left">
        {item.phone || <span className="highlight">Not provided</span>}
      </TableCell>
      <ActionCell>
        <Link href={`/address/edit/${item.id}`}>
          <StyledIconButton aria-label="edit">
            <EditIcon fontSize="small" />
          </StyledIconButton>
        </Link>

        <StyledIconButton
          aria-label="delete"
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </StyledIconButton>
      </ActionCell>
    </StyledTableRow>
  );
}

// Main AddressList Component
export default function AddressList() {
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    id: null, // Track the ID to delete
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authtoken = authService.getToken(); // Retrieve the auth token

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isAuthenticated()) {
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}user/address`, {
          headers: {
            Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
          },
        });
        setAddresses(response.data.user); // Assuming the data is structured as shown in the API response
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAddresses();
  }, [authtoken]);

  const handleDelete = async (id: string) => {
    setDialog({
      message: "Are you sure you want to delete?",
      isLoading: true,
      id: id, // Set the ID of the address to delete
    });
  };

  const areYouSureDelete = async (choose: boolean) => {
    if (choose) {
      try {
        await axios.get(
          `${ApiBaseUrl.baseUrl}user/address/delete/${dialog.id}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
            },
          }
        );
        // Remove the deleted address from the state
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== dialog.id)
        );
        toast.success("Address Deleted successfully!");
      } catch (error) {
        toast.error("Failed deleting address.");
      }
    }
    setDialog({ ...dialog, isLoading: false }); // Close the dialog
  };

  return (
    <Fragment>
      <DashboardPageHeader
        title="My Addresses"
        iconName="pin_filled"
        button={<AddNewAddress />}
      />
      {loading ? (
        <LoaderWrapper>
          <Vortex />
        </LoaderWrapper>
      ) : addresses.length > 0 ? (
        addresses.map((item) => (
          <AddressItem key={item.id} item={item} onDelete={handleDelete} />
        ))
      ) : (
        <Typography textAlign="center" m="20px">
          No address found
        </Typography>
      )}
      {/* Show Dialog only if isLoading is true */}
      {dialog.isLoading && (
        <Dialog message={dialog.message} onDialog={areYouSureDelete} />
      )}
    </Fragment>
  );
}
