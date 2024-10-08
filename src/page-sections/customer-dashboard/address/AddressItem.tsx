// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// import Icon from "@component/icon/Icon";
// import TableRow from "@component/TableRow";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";
// import Address from "@models/address.model";

// export default function AddressList() {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const authtoken = localStorage.getItem("token"); // Retrieve the auth token

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

//   return (
//     <div>
//       {addresses.map((item) => (
//         <AddressItem key={item.id} item={item} />
//       ))}
//     </div>
//   );
// }

// function AddressItem({ item }: { item: Address }) {
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
//         <Link href={`/address/${item.id}`}>
//           <IconButton>
//             <Icon variant="small" defaultcolor="currentColor">
//               edit
//             </Icon>
//           </IconButton>
//         </Link>

//         <IconButton onClick={(e) => e.stopPropagation()}>
//           <Icon variant="small" defaultcolor="currentColor">
//             delete
//           </Icon>
//         </IconButton>
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
// import Address from "@models/address.model";

// export default function AddressList({}) {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const authtoken = localStorage.getItem("token"); // Retrieve the auth token

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
//     try {
//       await axios.delete(`https://tizaraa.com/api/user/address/delete/${id}`, {
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
//     <div>
//       {addresses.map((item) => (
//         <AddressItem key={item.id} item={item} onDelete={handleDelete} />
//       ))}
//     </div>
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
//         <Link href={`/address/${item.id}`}>
//           <IconButton>
//             <Icon variant="small" defaultcolor="currentColor">
//               edit
//             </Icon>
//           </IconButton>
//         </Link>

//         <IconButton onClick={(e) => {
//           e.stopPropagation();
//           onDelete(item.id); // Call the onDelete handler
//         }}>
//           <Icon variant="small" defaultcolor="currentColor">
//             delete
//           </Icon>
//         </IconButton>
//       </Typography>
//     </TableRow>
//   );
// }

// "use client";

// import { Fragment, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie"; // To check cookies for token verification
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import { AddNewAddress, AddressItem } from "@sections/customer-dashboard/address"; // Components for address listing
// import api from "@utils/__api__/address"; // API for fetching address list

// export default function AddressList() {
//   const router = useRouter();
//   const [addressList, setAddressList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Check if user is authenticated (e.g., check token in cookies)
//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       // Redirect to login if no token is found
//       router.push("/login");
//     } else {
//       // If token is available, fetch the address list
//       fetchAddressList(token);
//     }
//   }, [router]);

//   const fetchAddressList = async (token: string) => {
//     try {
//       // Fetch the address list from the API
//       const addressListResponse = await api.getAddressList(); // Make sure your API accepts the token and verifies it
//       setAddressList(addressListResponse);
//     } catch (error) {
//       console.error("Failed to fetch address list:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Fragment>
//       <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />

//       {/* Render each address */}
//       {addressList.length > 0 ? (
//         addressList.map((item) => (
//           <AddressItem item={item} key={item.id} />
//         ))
//       ) : (
//         <div>No addresses found</div>
//       )}
//     </Fragment>
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
//import { AddressItem } from "@sections/customer-dashboard/address"; // Import AddressItem component
import Address from "@models/address.model"; // Make sure Address model is defined and imported correctly

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const authtoken = typeof window !== "undefined" ? localStorage.getItem("token") : null; // Retrieve the auth token safely

  useEffect(() => {
    if (!authtoken) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `https://tizaraa.com/api/user/address`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
            },
          }
        );
        setAddresses(response.data.addresses || []); // Adjusted based on possible API structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Failed to load addresses.");
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [authtoken]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://tizaraa.com/api/user/address/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
        },
      });
      // Remove the deleted address from the state
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
      setError("Failed to delete address.");
    }
  };

  if (loading) return <div>Loading addresses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {addresses.length > 0 ? (
        addresses.map((item) => (
          <AddressItem key={item.id} item={item} onDelete={handleDelete} />
        ))
      ) : (
        <div>No addresses found</div>
      )}
    </div>
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
        <Link href={`/address/${item.id}`}>
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



