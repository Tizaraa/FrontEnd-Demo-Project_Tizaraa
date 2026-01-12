
"use client";

import { useEffect, useState } from "react";
import axios from "@lib/axiosClient";
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
import { CircularProgress, LinearProgress, Tooltip } from "@mui/material";

export default function CheckoutAddress({
 setDeliveryCharge,
 onAddressChange,
 seller_type
}) {
 const [addresses, setAddresses] = useState<Address[]>([]);
 const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
 const [province, setProvince] = useState([]);
 const authtoken = authService.getToken();
 const [expressDelivery, setExpressDelivery] = useState(false);

 const [loading, setLoading] = useState(false);
 const [selectedPaymentOption, setSelectedPaymentOption] = useState<
  number | null
 >(100);
 const [advancePaymentAmount, setAdvancePaymentAmount] = useState<
  number | null
 >(null);

 const handlePaymentOptionSelect = async (percentage) => {
  // Log the selected percentage
  console.log("Selected payment option:", percentage);

  // Store the selected percentage in sessionStorage
  sessionStorage.setItem("selectedPaymentOption", percentage.toString());

  const selectedProducts = JSON.parse(
   sessionStorage.getItem("selectedProducts") || "[]"
  );
  const totalAmount = selectedProducts.reduce(
   (sum, product) => sum + product.qty * product.price,
   0
  );
  setSelectedPaymentOption(percentage);
  setLoading(true);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
   const { data } = await axios.post(
    `otc/price/percentage`,
    { total_ammount: totalAmount },
    {
     params: { total: totalAmount, percentage },
     signal: controller.signal,
    }
   );

   // Update state and sessionStorage synchronously
   setAdvancePaymentAmount(data.newtotal);
   sessionStorage.setItem("otcAdvancePaymentAmount", data.newtotal.toString());
  } catch (error) {
   error.name === "AbortError"
    ? toast.error("Your internet seems slow. Please try again.")
    : toast.error("Your internet seems slow. Please try again.");
  } finally {
   clearTimeout(timeoutId);
   setLoading(false);
  }
 };

 // ✅ Trigger 50% advance payment API call on page load
 useEffect(() => {
  const selectedProducts = JSON.parse(
   sessionStorage.getItem("selectedProducts") || "[]"
  );
  const hasProducts = selectedProducts.length > 0;

  if (hasProducts && selectedPaymentOption === 100) {
   handlePaymentOptionSelect(100);
  }
 }, []); // Empty dependency array to run only on mount

 // Fetch provinces data
 const fetchProvince = async () => {
  const authtoken = localStorage.getItem("token");
  try {
   const response = await axios.get(`checkout/address`);

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
    const response = await axios.get(`user/address`,{
      params:{seller_type}
    });
    const fetchedAddresses = response.data?.address || [];
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
      express_delivery: expressDelivery ? 1 : 2,
      province: selectedAddress.province_id,
      city: selectedAddress.city_id,
      area: selectedAddress.area_id,
      products: products,
     };
     axios
      .post(`delivery/charge/apply`, payload)
      .then((response) => {
       // const totalDeliveryCost = response.data.totalDeliveryCost;
       const totalDeliveryCost = Math.round(response.data.totalDeliveryCost);
       setDeliveryCharge(totalDeliveryCost);
       sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString());
      })
      .catch((error) => {
       console.error("Error fetching delivery charge:", error);
      });
    }
   }
  }
 }, [selectedAddress, expressDelivery, province, authtoken, setDeliveryCharge]);

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
    icon: <FaExclamationTriangle style={{ color: "#000", fontSize: "20px" }} />, // Custom icon
    progressStyle: {
     background: "#fff",
    },
   });
   return;
  }

  const isChecked = event.target.checked;
  setExpressDelivery(isChecked);

  // ✅ Store in session as 1 or 2
  sessionStorage.setItem("expressDelivery", isChecked ? "2" : "1");
 };

 // Load stored address and delivery charge on component mount
 useEffect(() => {
  const storedAddress = sessionStorage.getItem("address");
  const storedCharge = sessionStorage.getItem("deliveryCharge");
  const storedAdvancePayment = sessionStorage.getItem(
   "otcAdvancePaymentAmount"
  );

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
        <Tooltip title="100% advance payment is required for abroad products">
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
         Advance Payment Details
        </Typography>
       </FlexBox>
       <Typography
        style={{
         marginBottom: "1rem",
         fontSize: "13px",
         color: "#333",
        }}
       >
        100% advance payment is required to proceed with your abroad order.
       </Typography>

       <Grid container spacing={2}>
        {/* Option 3 - 100% */}
        <Grid item xs={12}>
         <FlexBox
          flexDirection="column"
          p="1rem"
          border={`1px solid ${
           selectedPaymentOption === 100 ? "rgb(233, 69, 96)" : "#ddd"
          }`}
          borderRadius="8px"
          backgroundColor={
           selectedPaymentOption === 100 ? "rgb(233, 69, 96)" : "white"
          }
          style={{
           cursor:
            loading && selectedPaymentOption === 100 ? "wait" : "pointer",
           position: "relative",
           overflow: "hidden",
           opacity: loading && selectedPaymentOption !== 100 ? 0.7 : 1,
           transition: "all 0.3s ease",
          }}
          // onClick={() => !loading && handlePaymentOptionSelect(100)}
         >
          {loading && selectedPaymentOption === 100 && (
           <LinearProgress
            sx={{
             position: "absolute",
             top: 0,
             left: 0,
             right: 0,
             height: "2px",
             backgroundColor: "rgba(255, 255, 255, 0.3)",
             "& .MuiLinearProgress-bar": {
              backgroundColor: "white",
             },
            }}
           />
          )}

          <FlexBox alignItems="center" justifyContent="center">
           {loading && selectedPaymentOption === 100 ? (
            <CircularProgress
             size={20}
             thickness={5}
             style={{
              color: "white",
              marginRight: "8px",
             }}
            />
           ) : (
            <CreditCardIcon
             style={{
              color: selectedPaymentOption === 100 ? "white" : "#333",
              marginRight: "8px",
              transition: "color 0.3s ease",
             }}
            />
           )}
           <Typography
            style={{
             fontWeight: "600",
             color: selectedPaymentOption === 100 ? "white" : "#333",
             transition: "color 0.3s ease",
            }}
           >
            {loading && selectedPaymentOption === 100
             ? "Processing..."
             : "Pay Now 100%"}
           </Typography>
          </FlexBox>
         </FlexBox>
        </Grid>
       </Grid>
      </FlexBox>
     );
    } else {
     return (
    <>
    {seller_type.toLocaleLowerCase() !== "corporate" &&
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
          <FaTruckFast style={{ fontSize: "24px", color: "#E94560" }} />
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
    }
    </>
     );
    }
   })()}

   {addresses?.length > 0 ? (
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
  3: "Pickup Point",
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
