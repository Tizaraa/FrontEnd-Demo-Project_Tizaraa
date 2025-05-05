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
// import { Truck, TruckIcon } from "lucide-react";
// import { FaTruckFast } from "react-icons/fa6";

// export default function CheckoutAddress({ setDeliveryCharge, onAddressChange }) {
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
//         const fetchedAddresses = response.data.user;
//         setAddresses(fetchedAddresses);
//         onAddressChange(fetchedAddresses.length > 0, true);

//         // Load the selected address from sessionStorage
//         const storedAddress = sessionStorage.getItem("address");
//         if (storedAddress) {
//           const parsedAddress = JSON.parse(storedAddress);
//           const matchingAddress = fetchedAddresses.find((addr) => addr.id === parsedAddress.id);
//           if (matchingAddress) {
//             handleSelect(matchingAddress, true); // Auto-select the stored address
//             return;
//           }
//         }

//         onAddressChange(fetchedAddresses.length > 0, false);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//         onAddressChange(false, false);
//       }
//     };

//     fetchAddresses();
//     fetchProvince(); // Fetch provinces when the component mounts
//   }, [authtoken, onAddressChange]);

//   // Calculate delivery charge when selectedAddress or selectedProducts change
//   useEffect(() => {
//     if (selectedAddress) {
//       // Fetch the product data from sessionStorage
//       const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

//       // Prepare the product data for the API request
//       const products = selectedProducts.map((product) => ({
//         id: `${product.productId}-${product.productType}`,
//         name: product.name,
//         price: product.discountPrice || product.price,
//         productId: product.productId,
//         productStock: product.productStock,
//         productType: product.productType,
//         qty: product.qty,
//         sellerId: product.sellerId,
//         slug: product.slug,
//         total_amount: product.qty * (product.discountPrice || product.price),
//       }));

//       if (selectedAddress && selectedAddress.province_id) {
//         const selectedProvince = province.find((prov: any) => prov.id === selectedAddress.province_id);
//         if (selectedProvince) {
//           // Call the API to get the delivery charge
//           axios.post(
//             `${ApiBaseUrl.baseUrl}delivery/charge/apply`,
//             {
//               province: selectedAddress.province_id,
//               city: selectedAddress.city_id,
//               area: selectedAddress.area_id,
//               products: products,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${authtoken}`,
//               },
//             }
//           )
//             .then((response) => {
//               const totalDeliveryCost = response.data.totalDeliveryCost;
//               setDeliveryCharge(totalDeliveryCost);
//               sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString()); // Store in sessionStorage
//             })
//             .catch((error) => {
//               console.error("Error fetching delivery charge:", error);
//             });
//         }
//       }
//     }
//   }, [selectedAddress, province]); // Dependencies to trigger recalculation

//   // Handle selection of an address and fetch shipping fee
//   const handleSelect = async (item: Address, isAutoSelect = false) => {
//     const selectedProvince = province.find((prov: any) => prov.id === item.province_id);

//     // Fetch the product data from sessionStorage
//     const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

//     // Prepare the product data for the API request
//     const products = selectedProducts.map((product) => ({
//       id: `${product.productId}-${product.productType}`,
//       name: product.name,
//       price: product.discountPrice || product.price,
//       productId: product.productId,
//       productStock: product.productStock,
//       productType: product.productType,
//       qty: product.qty,
//       sellerId: product.sellerId,
//       slug: product.slug,
//       total_amount: product.qty * (product.discountPrice || product.price),
//     }));

//     if (selectedProvince) {
//       try {
//         const response = await axios.post(
//           `${ApiBaseUrl.baseUrl}delivery/charge/apply`,
//           {
//             province: item.province_id,
//             city: item.city_id,
//             area: item.area_id,
//             products: products,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${authtoken}`, // Added Authorization header
//             },
//           }
//         );

//         const totalDeliveryCost = response.data.totalDeliveryCost;
//         setDeliveryCharge(totalDeliveryCost);
//         sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString()); // Store in sessionStorage

//         item.deliveryCharge = totalDeliveryCost; // Add deliveryCharge to the selected item
//       } catch (error) {
//         console.error("Error fetching delivery charge:", error);
//       }
//     }

//     setSelectedAddress(item);
//     if (!isAutoSelect) {
//       sessionStorage.setItem("address", JSON.stringify(item)); // Store in sessionStorage only on manual selection
//     }

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
//       <FlexBox flexDirection="column" mb="1rem" p="0.5rem" border="1px solid #ddd" borderRadius="8px" backgroundColor="#f9f9f9">
//         <Grid container spacing={2} alignItems="center">

//           <Grid item xs={6}>
//             <FlexBox alignItems="center">
//             <FaTruckFast style={{ fontSize: "24px", color: "#E94560" }} />
//               <label htmlFor="expressDelivery" style={{ marginLeft: "0.5rem", fontSize: "14px", fontWeight: "500", color: "#333" }}>
//                 <span style={{ color: "#E94560", fontWeight: "600" }}>Delivery Options</span>
//               </label>
//             </FlexBox>
//           </Grid>

//           <Grid item xs={6}>
//             <FlexBox alignItems="center" justifyContent="flex-end">
//               <input
//                 type="checkbox"
//                 id="expressDelivery"
//                 style={{ cursor: "pointer", accentColor: "#E94560" }}
//               />
//               <label htmlFor="expressDelivery" style={{ marginLeft: "0.5rem", fontSize: "14px", fontWeight: "500", color: "#333" }}>
//                 <span style={{ color: "#E94560", fontWeight: "600" }}>Express Delivery</span>
//               </label>
//             </FlexBox>
//           </Grid>

//         </Grid>
//       </FlexBox>

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
//         <FlexBox justifyContent="center" alignItems="center" width="100%">
//           <SemiSpan>No addresses found</SemiSpan>
//         </FlexBox>
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
//       }}
//     >
//       <FlexBox my="0.5rem" padding="1px 14px">
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

//       <FlexBox m="6px" textAlign="left" fontWeight="600">
//         <Chip p="0.35rem 1rem" bg="#4CAF50">
//           <Small color="white">{landmarkLabel}</Small>
//         </Chip>

//         <Typography className="pre" m="6px" textAlign="left">
//           {item.address}
//         </Typography>
//       </FlexBox>
//     </Grid>
//   );
// }

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
import { FaTruckFast } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import { CreditCardIcon, InfoIcon } from "lucide-react";
import { Tooltip } from "@mui/material";

export default function CheckoutAddress({
  setDeliveryCharge,
  onAddressChange,
}) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [province, setProvince] = useState([]);
  const authtoken = authService.getToken();
  const [expressDelivery, setExpressDelivery] = useState(false);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    number | null
  >(null);
  const [advancePaymentAmount, setAdvancePaymentAmount] = useState<
    number | null
  >(null);

  const handlePaymentOptionSelect = async (percentage: number) => {
    setSelectedPaymentOption(percentage);

    // Calculate advance payment
    const selectedProducts = JSON.parse(
      sessionStorage.getItem("selectedProducts") || "[]"
    );
    const totalAmount = selectedProducts.reduce(
      (sum, product) => sum + product.qty * product.price,
      0
    );

    if (selectedAddress && totalAmount > 0) {
      try {
        const payload = {
          total_ammount: totalAmount,
        };

        const response = await axios.post(
          `${ApiBaseUrl.baseUrl}otc/price/percentage?total=${totalAmount}&percentage=${percentage}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );

        const newTotal = response.data.newtotal;
        setAdvancePaymentAmount(newTotal);
        sessionStorage.setItem("otcAdvancePaymentAmount", newTotal.toString());
      } catch (error) {
        console.error("Error calculating advance payment:", error);
        toast.error("Failed to calculate advance payment");
      }
    } else {
      toast.warning("Please select an address and ensure products are added");
    }
  };

  // Fetch provinces data
  const fetchProvince = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${ApiBaseUrl.baseUrl}checkout/address`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setProvince(response.data);
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
          const matchingAddress = fetchedAddresses.find(
            (addr) => addr.id === parsedAddress.id
          );
          if (matchingAddress) {
            handleSelect(matchingAddress, true);
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
    fetchProvince();
  }, [authtoken, onAddressChange]);

  // Recalculate delivery charge when selectedAddress or expressDelivery changes
  useEffect(() => {
    if (selectedAddress) {
      const selectedProducts = JSON.parse(
        sessionStorage.getItem("selectedProducts") || "[]"
      );
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

      if (selectedAddress.province_id) {
        const selectedProvince = province.find(
          (prov: any) => prov.id === selectedAddress.province_id
        );
        if (selectedProvince) {
          const payload = {
            express_delivery: expressDelivery ? 1 : 0,
            province: selectedAddress.province_id,
            city: selectedAddress.city_id,
            area: selectedAddress.area_id,
            products: products,
          };
          axios
            .post(`${ApiBaseUrl.baseUrl}delivery/charge/apply`, payload, {
              headers: {
                Authorization: `Bearer ${authtoken}`,
              },
            })
            .then((response) => {
              // const totalDeliveryCost = response.data.totalDeliveryCost;
              const totalDeliveryCost = Math.round(
                response.data.totalDeliveryCost
              );
              setDeliveryCharge(totalDeliveryCost);
              sessionStorage.setItem(
                "deliveryCharge",
                totalDeliveryCost.toString()
              );
            })
            .catch((error) => {
              console.error("Error fetching delivery charge:", error);
            });
        }
      }
    }
  }, [
    selectedAddress,
    expressDelivery,
    province,
    authtoken,
    setDeliveryCharge,
  ]);

  // Handle selection of an address
  const handleSelect = async (item: Address, isAutoSelect = false) => {
    setSelectedAddress(item);
    if (!isAutoSelect) {
      sessionStorage.setItem("address", JSON.stringify(item));
    }
    onAddressChange(true, true);
  };

  // Handle express delivery checkbox change
  const handleExpressDeliveryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const storedAddress = JSON.parse(sessionStorage.getItem("address"));

    if (!storedAddress) {
      toast.warning("Please select an address first!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "rgb(245, 124, 0)",
          color: "#000",
          fontSize: "16px",
          border: "2px solid #fff",
          boxShadow: "0 0 10px rgba(255, 152, 0, 0.7)",
        },
        icon: (
          <FaExclamationTriangle style={{ color: "#000", fontSize: "20px" }} />
        ), // Custom icon
        progressStyle: {
          background: "#fff",
        },
      });
      return;
    }

    const isChecked = event.target.checked;
    setExpressDelivery(isChecked);
  };

  // Load stored address and delivery charge on component mount
  useEffect(() => {
    const storedAddress = sessionStorage.getItem("address");
    const storedCharge = sessionStorage.getItem("deliveryCharge");
    const storedAdvancePayment = sessionStorage.getItem("otcAdvancePaymentAmount");

    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }

    if (storedCharge) {
      setDeliveryCharge(parseFloat(storedCharge));
    }

    if (storedAdvancePayment) {
      setAdvancePaymentAmount(parseFloat(storedAdvancePayment));
    }
  }, [setDeliveryCharge]);

  return (
    <Fragment>
      {(() => {
        const selectedProducts = JSON.parse(
          sessionStorage.getItem("selectedProducts") || "[]"
        );
        const hasAbroadProduct = selectedProducts.some(
          (product: any) => product.productType === "Abroad"
        );

        if (hasAbroadProduct) {
          return (
            <FlexBox
              flexDirection="column"
              mb="1rem"
              p="1rem"
              border="1px solid #ddd"
              borderRadius="8px"
              backgroundColor="#f7f7f7"
            >
              <FlexBox alignItems="center" style={{ gap: "8px" }}>
                <Tooltip title="Select your preferred advance payment percentage. The remaining amount will be paid later.">
                  <InfoIcon
                    style={{
                      color: "#E94560",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="h6"
                  style={{ color: "#E94560", fontWeight: "600" }}
                >
                  Advance Payment Options
                </Typography>
              </FlexBox>
              <Typography
                style={{
                  marginBottom: "1rem",
                  fontSize: "13px",
                  color: "#333",
                }}
              >
                Select your advance payment from the options below
              </Typography>

              {/* Display Advance Payment Amount */}
              {advancePaymentAmount !== null && (
                <Typography
                  style={{
                    marginBottom: "1rem",
                    fontSize: "16px",
                    color: "#E94560",
                    fontWeight: "600",
                  }}
                >
                  Advance Payment Amount: BDT&nbsp;
                  {advancePaymentAmount.toFixed(2)}
                </Typography>
              )}

              <Grid container spacing={2}>
                {/* Option 1 - 50% */}
                <Grid item xs={12} sm={4}>
                  <FlexBox
                    flexDirection="column"
                    p="1rem"
                    border={`1px solid ${
                      selectedPaymentOption === 50 ? "rgb(233, 69, 96)" : "#ddd"
                    }`}
                    borderRadius="8px"
                    backgroundColor={
                      selectedPaymentOption === 50
                        ? "rgb(233, 69, 96)"
                        : "white"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePaymentOptionSelect(50)}
                  >
                    <FlexBox alignItems="center">
                      <CreditCardIcon
                        style={{
                          color:
                            selectedPaymentOption === 50 ? "white" : "#333",
                          marginRight: "8px",
                        }}
                      />
                      <Typography
                        style={{
                          fontWeight: "600",
                          color:
                            selectedPaymentOption === 50 ? "white" : "#333",
                        }}
                      >
                        Pay Now 50%
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </Grid>

                {/* Option 2 - 80% */}
                <Grid item xs={12} sm={4}>
                  <FlexBox
                    flexDirection="column"
                    p="1rem"
                    border={`1px solid ${
                      selectedPaymentOption === 80 ? "rgb(233, 69, 96)" : "#ddd"
                    }`}
                    borderRadius="8px"
                    backgroundColor={
                      selectedPaymentOption === 80
                        ? "rgb(233, 69, 96)"
                        : "white"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePaymentOptionSelect(80)}
                  >
                    <FlexBox alignItems="center">
                      <CreditCardIcon
                        style={{
                          color:
                            selectedPaymentOption === 80 ? "white" : "#333",
                          marginRight: "8px",
                        }}
                      />
                      <Typography
                        style={{
                          fontWeight: "600",
                          color:
                            selectedPaymentOption === 80 ? "white" : "#333",
                        }}
                      >
                        Pay Now 80%
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </Grid>

                {/* Option 3 - 100% */}
                <Grid item xs={12} sm={4}>
                  <FlexBox
                    flexDirection="column"
                    p="1rem"
                    border={`1px solid ${
                      selectedPaymentOption === 100
                        ? "rgb(233, 69, 96)"
                        : "#ddd"
                    }`}
                    borderRadius="8px"
                    backgroundColor={
                      selectedPaymentOption === 100
                        ? "rgb(233, 69, 96)"
                        : "white"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePaymentOptionSelect(100)}
                  >
                    <FlexBox alignItems="center">
                      <CreditCardIcon
                        style={{
                          color:
                            selectedPaymentOption === 100 ? "white" : "#333",
                          marginRight: "8px",
                        }}
                      />
                      <Typography
                        style={{
                          fontWeight: "600",
                          color:
                            selectedPaymentOption === 100 ? "white" : "#333",
                        }}
                      >
                        Pay Now 100%
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </Grid>
              </Grid>
            </FlexBox>
          );
        } else {
          return (
            <FlexBox
              flexDirection="column"
              mb="1rem"
              p="0.5rem"
              border="1px solid #ddd"
              borderRadius="8px"
              backgroundColor="#f7eded"
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <FlexBox alignItems="center">
                    <FaTruckFast
                      style={{ fontSize: "24px", color: "#E94560" }}
                    />
                    <label
                      htmlFor="expressDelivery"
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      <span style={{ color: "#E94560", fontWeight: "600" }}>
                        Delivery Options
                      </span>
                    </label>
                  </FlexBox>
                </Grid>
                <Grid item xs={6}>
                  <FlexBox alignItems="center" justifyContent="flex-end">
                    <input
                      checked={expressDelivery}
                      onChange={handleExpressDeliveryChange}
                      type="checkbox"
                      id="expressDelivery"
                      style={{ cursor: "pointer", accentColor: "#E94560" }}
                    />
                    <label
                      htmlFor="expressDelivery"
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      <span style={{ color: "#E94560", fontWeight: "600" }}>
                        Express Delivery
                      </span>
                    </label>
                  </FlexBox>
                </Grid>
              </Grid>
            </FlexBox>
          );
        }
      })()}

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
