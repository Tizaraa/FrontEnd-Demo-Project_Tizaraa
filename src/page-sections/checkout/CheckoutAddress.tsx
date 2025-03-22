// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Fragment } from "react";
// import CheckBox from "@component/CheckBox";
// import FlexBox from "@component/FlexBox";
// import Grid from "@component/grid/Grid";
// import { Chip } from "@component/Chip";
// import { Small } from "@component/Typography";
// import Typography from "@component/Typography";
// import authService from "services/authService";
// import Address from "@models/address.model";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import { SemiSpan } from "@component/Typography";
// export default function CheckoutAddress({ setDeliveryCharge,onAddressChange }) {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
//   const [province, setProvince] = useState([]); // State for storing provinces
//   const authtoken = authService.getToken();

//   // Fetch provinces data
//   const fetchProvince = async () => {
//     const authtoken = localStorage.getItem("token");
//     try {
//       const response = await axios.get(`${ApiBaseUrl.baseUrl}checkout/address`, {
//         headers: {
//           Authorization: `Bearer ${authtoken}`,
//         },
//       });
//       // console.log("Provinces data:", response.data);

//       if (Array.isArray(response.data)) {
//         setProvince(response.data); // Set province data
//       }
//     } catch (error) {
//       console.error("Error fetching provinces:", error);
//     }
//   };

//   // Fetch addresses data
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get(`${ApiBaseUrl.baseUrl}user/address`, {
//           headers: {
//             Authorization: `Bearer ${authtoken}`,
//           },
//         });
//         // console.log("Address data:", response.data);
//         const fetchedAddresses = response.data.user;
//         setAddresses(fetchedAddresses);
//         onAddressChange(fetchedAddresses.length > 0,true);

//         // Load the selected address from sessionStorage
//         const storedAddress = sessionStorage.getItem("address");
//         if (storedAddress) {
//           const parsedAddress = JSON.parse(storedAddress);
//           // Check if the parsed address is in the fetched addresses
//           const matchingAddress = fetchedAddresses.find((addr) => addr.id === parsedAddress.id);
//           if (matchingAddress) {
//             handleSelect(matchingAddress, true); // Auto-select the stored address
//             return;
//           }
//         }
        
//         //onAddressChange(fetchedAddresses.length > 0, fetchedAddresses.length > 0);
//         onAddressChange(response.data.user.length > 0, false);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//         onAddressChange(false, false);
//       }
//     };

//     fetchAddresses();
//     fetchProvince(); // Fetch provinces when the component mounts
//   }, [authtoken,onAddressChange]);

//   // Handle automatic selection of the first address and set delivery charge in sessionStorage
//   // const handleAutoSelect = (item: Address) => {
//   //   // Find the corresponding province to get the delivery charge
//   //   const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

//   //   if (selectedProvince && selectedProvince.delivery_charge) {
//   //     item.deliveryCharge = selectedProvince.delivery_charge; // Add deliveryCharge to the selected item
//   //     sessionStorage.setItem("deliveryCharge", JSON.stringify(item.deliveryCharge)); // Store in sessionStorage
//   //   }

//   //   setSelectedAddress(item);

//   //   // console.log("Auto-selected Address:", item);
//   //   // console.log("Delivery Charge stored in sessionStorage:", item.deliveryCharge || "Delivery charge not available");
//   // };

//   // Handle manual selection of an address
//   const handleSelect = (item: Address, isAutoSelect = false) => {
//     // Find the corresponding province to get the delivery charge
//     const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

//     if (selectedProvince && selectedProvince.delivery_charge) {
//       setDeliveryCharge(selectedProvince.delivery_charge);
//       item.deliveryCharge = selectedProvince.delivery_charge; // Add deliveryCharge to the selected item
//       sessionStorage.setItem("deliveryCharge", selectedProvince.delivery_charge.toString());
     
//     }

//     setSelectedAddress(item);
//     if (!isAutoSelect) {
//       sessionStorage.setItem("address", JSON.stringify(item)); // Store in localStorage only on manual selection
//     } // Only store in sessionStorage when manually selected

//     // Log the selected address and delivery charge
//     // console.log("Manually Selected Address:", item);
//     // console.log("Delivery Charge:", item.deliveryCharge || "Delivery charge not available");
//     onAddressChange(true, true);
//   };

//   useEffect(() => {
//     const storedAddress = sessionStorage.getItem("address");
//     const storedCharge = sessionStorage.getItem("deliveryCharge");

//     if (storedAddress) {
//       setSelectedAddress(JSON.parse(storedAddress));
//     }

//     if (storedCharge) {
//       setDeliveryCharge(parseFloat(storedCharge));
//     }
//   }, [setDeliveryCharge]);


  
//   return (
//     <Fragment>
//       {addresses.length > 0 ? (
//         addresses.map((item) => (
//           <AddressItem
//             key={item.id}
//             item={item}
//             isSelected={selectedAddress?.id === item.id}
//             onSelect={handleSelect}
//           />
//         ))
//       ) : (
//         // <div>No addresses found</div>
//         <FlexBox justifyContent="center" alignItems="center" width="100%">
//             <SemiSpan>No addresses found</SemiSpan>
//           </FlexBox>
//       )}
//     </Fragment>
//   );
// }

// interface AddressItemProps {
//   item: Address;
//   isSelected: boolean;
//   onSelect: (item: Address, isAutoSelect?: boolean) => void;
// }

// function AddressItem({ item, isSelected, onSelect }: AddressItemProps) {
//   const handleCheckboxChange = () => {
//     onSelect(item);
//   };

//   const landmarkMap: { [key: number]: string } = {
//     1: "Home",
//     2: "Office",
//   };

//   const landmarkLabel = landmarkMap[item.landmark] || "Other";

//   return (
//     <Grid
//       style={{
//         border: "0.5px solid #E94560",
//         marginBottom: "1rem",
//         borderRadius: "1rem",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
//         // padding: "0.5rem 0.5rem"
    
//       }}
//     >
//       <FlexBox
//         my="0.5rem"
//         padding="1px 14px"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           // gap: "1rem",
//         }}
//       >
//         <CheckBox checked={isSelected} onChange={handleCheckboxChange} />

//         <FlexBox fontWeight="600">
//           <Typography className="pre" m="6px" textAlign="left">
//             {item.name || "No Name"}
//           </Typography>
//           <Typography className="pre" m="6px" textAlign="left">
//             {item.phone}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox
//         flex="1 1 260px !important"
//         // padding="1px 5px"
//         m="6px"
//         textAlign="left"
//         fontWeight="600"
//         style={{
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//         }}
//       >
//         <Chip p="0.35rem 1rem" bg="#4CAF50">
//           <Small color="white">{landmarkLabel}</Small>
//         </Chip>

//         <Typography className="pre" m="6px" textAlign="left">
//           {item.address}
//            {/* {item.province_id}, {item.city_id}, {item.area_id} */}
//         </Typography>
//       </FlexBox>
//     </Grid>
//   );
// }


//  ==============================================================


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import CheckBox from "@component/CheckBox";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { Chip } from "@component/Chip";
import { Small } from "@component/Typography";
import Typography from "@component/Typography";
import authService from "services/authService";
import Address from "@models/address.model";
import ApiBaseUrl from "api/ApiBaseUrl";
import { SemiSpan } from "@component/Typography";
import { Truck, TruckIcon } from "lucide-react";
import { FaTruckFast } from "react-icons/fa6";

export default function CheckoutAddress({ setDeliveryCharge, onAddressChange }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [province, setProvince] = useState([]); // State for storing provinces
  const authtoken = authService.getToken();

  // Fetch provinces data
  const fetchProvince = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.get(`${ApiBaseUrl.baseUrl}checkout/address`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });

      if (Array.isArray(response.data)) {
        setProvince(response.data); // Set province data
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetch addresses data
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}user/address`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        });
        const fetchedAddresses = response.data.user;
        setAddresses(fetchedAddresses);
        onAddressChange(fetchedAddresses.length > 0, true);

        // Load the selected address from sessionStorage
        const storedAddress = sessionStorage.getItem("address");
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          const matchingAddress = fetchedAddresses.find((addr) => addr.id === parsedAddress.id);
          if (matchingAddress) {
            handleSelect(matchingAddress, true); // Auto-select the stored address
            return;
          }
        }

        onAddressChange(fetchedAddresses.length > 0, false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        onAddressChange(false, false);
      }
    };

    fetchAddresses();
    fetchProvince(); // Fetch provinces when the component mounts
  }, [authtoken, onAddressChange]);

  // Calculate delivery charge when selectedAddress or selectedProducts change
  useEffect(() => {
    if (selectedAddress) {
      // Fetch the product data from sessionStorage
      const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

      // Prepare the product data for the API request
      const products = selectedProducts.map((product) => ({
        id: `${product.productId}-${product.productType}`,
        name: product.name,
        price: product.discountPrice || product.price,
        productId: product.productId,
        productStock: product.productStock,
        productType: product.productType,
        qty: product.qty,
        sellerId: product.sellerId,
        slug: product.slug,
        total_amount: product.qty * (product.discountPrice || product.price),
      }));

      if (selectedAddress && selectedAddress.province_id) {
        const selectedProvince = province.find((prov: any) => prov.id === selectedAddress.province_id);
        if (selectedProvince) {
          // Call the API to get the delivery charge
          axios.post(
            `${ApiBaseUrl.baseUrl}delivery/charge/apply`,
            {
              province: selectedAddress.province_id,
              city: selectedAddress.city_id,
              area: selectedAddress.area_id,
              products: products,
            },
            {
              headers: {
                Authorization: `Bearer ${authtoken}`,
              },
            }
          )
            .then((response) => {
              const totalDeliveryCost = response.data.totalDeliveryCost;
              setDeliveryCharge(totalDeliveryCost);
              sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString()); // Store in sessionStorage
            })
            .catch((error) => {
              console.error("Error fetching delivery charge:", error);
            });
        }
      }
    }
  }, [selectedAddress, province]); // Dependencies to trigger recalculation

  // Handle selection of an address and fetch shipping fee
  const handleSelect = async (item: Address, isAutoSelect = false) => {
    const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

    // Fetch the product data from sessionStorage
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

    // Prepare the product data for the API request
    const products = selectedProducts.map((product) => ({
      id: `${product.productId}-${product.productType}`,
      name: product.name,
      price: product.discountPrice || product.price,
      productId: product.productId,
      productStock: product.productStock,
      productType: product.productType,
      qty: product.qty,
      sellerId: product.sellerId,
      slug: product.slug,
      total_amount: product.qty * (product.discountPrice || product.price),
    }));

    if (selectedProvince) {
      try {
        const response = await axios.post(
          `${ApiBaseUrl.baseUrl}delivery/charge/apply`,
          {
            province: item.province_id,
            city: item.city_id,
            area: item.area_id,
            products: products,
          },
          {
            headers: {
              Authorization: `Bearer ${authtoken}`, // Added Authorization header
            },
          }
        );

        const totalDeliveryCost = response.data.totalDeliveryCost;
        setDeliveryCharge(totalDeliveryCost);
        sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString()); // Store in sessionStorage

        item.deliveryCharge = totalDeliveryCost; // Add deliveryCharge to the selected item
      } catch (error) {
        console.error("Error fetching delivery charge:", error);
      }
    }

    setSelectedAddress(item);
    if (!isAutoSelect) {
      sessionStorage.setItem("address", JSON.stringify(item)); // Store in sessionStorage only on manual selection
    }

    onAddressChange(true, true);
  };

  useEffect(() => {
    const storedAddress = sessionStorage.getItem("address");
    const storedCharge = sessionStorage.getItem("deliveryCharge");

    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }

    if (storedCharge) {
      setDeliveryCharge(parseFloat(storedCharge));
    }
  }, [setDeliveryCharge]);

  return (
    <Fragment>
      <FlexBox flexDirection="column" mb="1rem" p="0.5rem" border="1px solid #ddd" borderRadius="8px" backgroundColor="#f9f9f9">
        <Grid container spacing={2} alignItems="center">

          <Grid item xs={6}>
            <FlexBox alignItems="center">
            <FaTruckFast style={{ fontSize: "24px", color: "#E94560" }} />
              <label htmlFor="expressDelivery" style={{ marginLeft: "0.5rem", fontSize: "14px", fontWeight: "500", color: "#333" }}>
                <span style={{ color: "#E94560", fontWeight: "600" }}>Delivery Options</span>
              </label>
            </FlexBox>
          </Grid>

          <Grid item xs={6}>
            <FlexBox alignItems="center" justifyContent="flex-end">
              <input
                type="checkbox"
                id="expressDelivery"
                style={{ cursor: "pointer", accentColor: "#E94560" }}
              />
              <label htmlFor="expressDelivery" style={{ marginLeft: "0.5rem", fontSize: "14px", fontWeight: "500", color: "#333" }}>
                <span style={{ color: "#E94560", fontWeight: "600" }}>Express Delivery</span>
              </label>
            </FlexBox>
          </Grid>

        </Grid>
      </FlexBox>


      {addresses.length > 0 ? (
        addresses.map((item) => (
          <AddressItem
            key={item.id}
            item={item}
            isSelected={selectedAddress?.id === item.id}
            onSelect={handleSelect}
          />
        ))
      ) : (
        <FlexBox justifyContent="center" alignItems="center" width="100%">
          <SemiSpan>No addresses found</SemiSpan>
        </FlexBox>
      )}
    </Fragment>
  );
}

interface AddressItemProps {
  item: Address;
  isSelected: boolean;
  onSelect: (item: Address, isAutoSelect?: boolean) => void;
}

function AddressItem({ item, isSelected, onSelect }: AddressItemProps) {
  const handleCheckboxChange = () => {
    onSelect(item);
  };

  const landmarkMap: { [key: number]: string } = {
    1: "Home",
    2: "Office",
  };

  const landmarkLabel = landmarkMap[item.landmark] || "Other";

  return (
    <Grid
      style={{
        border: "0.5px solid #E94560",
        marginBottom: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <FlexBox my="0.5rem" padding="1px 14px">
        <CheckBox checked={isSelected} onChange={handleCheckboxChange} />
        <FlexBox fontWeight="600">
          <Typography className="pre" m="6px" textAlign="left">
            {item.name || "No Name"}
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            {item.phone}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox m="6px" textAlign="left" fontWeight="600">
        <Chip p="0.35rem 1rem" bg="#4CAF50">
          <Small color="white">{landmarkLabel}</Small>
        </Chip>

        <Typography className="pre" m="6px" textAlign="left">
          {item.address}
        </Typography>
      </FlexBox>
    </Grid>
  );
}

