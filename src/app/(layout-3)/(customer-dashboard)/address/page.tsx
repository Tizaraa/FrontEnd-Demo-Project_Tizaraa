

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
//           `https://tizaraa.com/api/user/address`,
//           {
//             headers: {
//               Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//             },
//           }
//         );
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
//       await axios.get(`https://tizaraa.com/api/user/address/delete/${id}`, {
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

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { Fragment } from "react";
import Dialog from "./Dialog"; // Import the Dialog component
import {  toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner'
import  styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import {
  AddNewAddress,
} from "@sections/customer-dashboard/address"; // Import AddressItem component
import Address from "@models/address.model";
import authService from "services/authService"; // Make sure Address model is defined and imported correctly
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AddressList() {
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    id: null, // Track the ID to delete
  });
  const [addresses, setAddresses] = useState<Address[]>([]);

  const authtoken = authService.getToken(); // Retrieve the auth token

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
        await axios.get(`${ApiBaseUrl.baseUrl}user/address/delete/${dialog.id}`, {
          headers: {
            Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
          },
        });
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
      <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />
      {addresses.length > 0 ? (
        addresses.map((item) => (
          <AddressItem key={item.id} item={item} onDelete={handleDelete} />
        ))
      ) : (
        <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
      )}
      {/* Show Dialog only if isLoading is true */}
      {dialog.isLoading && <Dialog message={dialog.message} onDialog={areYouSureDelete} />}
    </Fragment>
  );
}

function AddressItem({
  item,
  onDelete,
}: {
  item: Address;
  onDelete: (id: string) => void;
}) {
  return (
    <TableRow my="1rem" padding="6px 18px">
      <Typography className="pre" m="6px" textAlign="left">
        {item.name || "No Name"} {/* Display name or fallback */}
      </Typography>

      <Typography
        flex="1 1 260px !important"
        m="6px"
        textAlign="left"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.address}
      </Typography>

      <Typography className="pre" m="6px" textAlign="left">
        {item.phone}
      </Typography>

      <Typography className="pre" textAlign="center" color="text.muted">
        <Link href={`/address/edit/${item.id}`}>
          <IconButton>
            <Icon variant="small" defaultcolor="currentColor">
              edit
            </Icon>
          </IconButton>
        </Link>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id); // Call the onDelete handler
          }}
        >
          <Icon variant="small" defaultcolor="currentColor">
            delete
          </Icon>
        </IconButton>
      </Typography>
    </TableRow>
  );
}



