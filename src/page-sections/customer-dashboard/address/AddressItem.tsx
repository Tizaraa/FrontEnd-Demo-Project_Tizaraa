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

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import Address from "@models/address.model";

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const authtoken = localStorage.getItem("token"); // Retrieve the auth token

  useEffect(() => {
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
        setAddresses(response.data.user); // Assuming the data is structured as shown in the API response
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [authtoken]);

  const handleDelete = async (id: String) => {
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
    }
  };

  return (
    <div>
      {addresses.map((item) => (
        <AddressItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}

function AddressItem({
  item,
  onDelete,
}: {
  item: Address;
  onDelete: (id: String) => void;
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

        <IconButton onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id); // Call the onDelete handler
        }}>
          <Icon variant="small" defaultcolor="currentColor">
            delete
          </Icon>
        </IconButton>
      </Typography>
    </TableRow>
  );
}

