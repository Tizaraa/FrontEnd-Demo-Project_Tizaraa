// "use client";
// import { useEffect, useState } from "react";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Typography from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import Grid from "@component/grid/Grid";
// import { ProductCard2, ProductCard7 } from "@component/product-cards";
// import { currency } from "@utils/utils";
// import ProductCard20 from "@component/product-cards/ProductCard20";

// export default function CheckoutSummary({ deliveryCharge }) {
//   const { state } = useAppContext();
//   const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
//     return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
//   });
//   const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
//     return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
//   });

//   useEffect(() => {
//     const getTotalPrice = () => {
//       return state.cart.reduce((accumulator, item) => {
//         if (state.selectedProducts.includes(item.id)) {
//           return (
//             accumulator +
//             (item.discountPrice ? item.discountPrice : item.price) * item.qty
//           );
//         }
//         return accumulator;
//       }, 0);
//     };

//     const storedAddress = sessionStorage.getItem("address");
//     const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
//     const deliveryChargeDisplay =
//       selectedAddress?.deliveryCharge || deliveryCharge || 0;

//     const totalPrice = getTotalPrice();
//     const totalWithDelivery = parseFloat(deliveryChargeDisplay);

//     if (totalPrice > 0) {
//       setSavedTotalPrice(totalPrice);
//       sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
//     }

//     if (totalWithDelivery > 0) {
//       setSavedTotalWithDelivery(totalWithDelivery);
//       sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
//     }

//     if (state.cart.length === 0) {
//       setSavedTotalPrice(0);
//       setSavedTotalWithDelivery(0);
//       sessionStorage.removeItem("savedTotalPrice");
//       sessionStorage.removeItem("savedTotalWithDelivery");
//     }

//   }, [state.cart, deliveryCharge]);

//   return (
//     <Card1>
//           {state.cart.map((item) => (
//             <ProductCard20
//             margin={0}
//               mb="1.5rem"
//               id={item.id}
//               key={item.id}
//               qty={item.qty}
//               slug={item.slug}
//               productStock={item.productStock}
//               name={item.name}
//               price={item.price}
//               imgUrl={item.imgUrl}
//               discountPrice={item.discountPrice}
//               productId={item.productId}
//               sellerId={item.sellerId}
//             />
//           ))}

// <FlexBox
//   flexDirection="column"
//   // border="1px solid #ccc"
//   // borderRadius="8px"
//   // p="1rem"
//   mb="1rem"
// >
//   <Typography fontWeight="600" mb="0.5rem">
//     Promotion
//   </Typography>
//   <FlexBox justifyContent="space-between" alignItems="center">
//     <input
//       type="text"
//       placeholder="Enter Store/Tizaraa Code"
//       style={{
//         flex: 1,
//         padding: "0.5rem",
//         border: "1px solid #ddd",
//         borderRadius: "4px",
//         marginRight: "0.5rem",
//         fontSize: "14px",
//       }}
//     />
//     <button
//       style={{
//         backgroundColor: "#E94560",
//         color: "#fff",
//         padding: "0.5rem 1rem",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "14px",
//       }}
//     >
//       APPLY
//     </button>
//   </FlexBox>
// </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Subtotal:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           {currency(savedTotalPrice)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Shipping:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           {currency(savedTotalWithDelivery)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">VAT:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           -
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
//         <Typography color="text.hint">Discount:</Typography>
//         <Typography fontWeight="700">-</Typography>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
//       </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//       {currency(savedTotalWithDelivery + savedTotalPrice)}
//       </Typography>
//     </Card1>
//   );
// }

// ================================================================

// import { useEffect, useState } from "react";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Typography from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import Grid from "@component/grid/Grid";
// import { ProductCard2, ProductCard7 } from "@component/product-cards";
// import { currency } from "@utils/utils";
// import ProductCard20 from "@component/product-cards/ProductCard20";
// import authService from "services/authService";
// import { toast } from "react-toastify";

// export default function CheckoutSummary({ deliveryCharge }) {
//   const { state } = useAppContext();
//   const authtoken = authService.getToken();

//   // const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
//   //   return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
//   // });
//   // const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
//   //   return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
//   // });

//   const [savedTotalPrice, setSavedTotalPrice] = useState(0);
//   const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(0);
//   const [promoCode, setPromoCode] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const [discount, setDiscount] = useState(0);
//   const [newTotal, setNewTotal] = useState(0);

//   useEffect(() => {
//     const getTotalPrice = () => {
//       return state.cart.reduce((accumulator, item) => {
//         if (state.selectedProducts.includes(item.id)) {
//           const price =
//             item.sizeColor?.nosize?.length === 0 && item.discountPrice
//               ? item.discountPrice
//               : item.price;

//           return accumulator + price * item.qty;
//         }
//         return accumulator;
//       }, 0);
//     };

//     const storedAddress = sessionStorage.getItem("address");
//     const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
//     const deliveryChargeDisplay =
//       selectedAddress?.deliveryCharge || deliveryCharge || 0;

//     const totalPrice = getTotalPrice();
//     const totalWithDelivery = parseFloat(deliveryChargeDisplay);

//     // Update state and sessionStorage
//     if (totalPrice > 0) {
//       setSavedTotalPrice(totalPrice);
//       sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
//     } else {
//       setSavedTotalPrice(0);
//       sessionStorage.removeItem("savedTotalPrice");
//     }

//     if (totalWithDelivery > 0) {
//       setSavedTotalWithDelivery(totalWithDelivery);
//       sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
//     } else {
//       setSavedTotalWithDelivery(0);
//       sessionStorage.removeItem("savedTotalWithDelivery");
//     }

//     // Reset discount and newTotal when selectedProducts change
//     setDiscount(0);
//     setNewTotal(totalPrice + totalWithDelivery); // Reset to total without discount
//     sessionStorage.setItem("discount", "0");
//     sessionStorage.setItem("newTotal", (totalPrice + totalWithDelivery).toString());
//     setPromoCode("");
//     setMessage("");
//     setError("");

//     // Clear sessionStorage if cart is empty
//     if (state.cart.length === 0) {
//       setSavedTotalPrice(0);
//       setSavedTotalWithDelivery(0);
//       setDiscount(0);
//       setNewTotal(0); // Reset newTotal
//       sessionStorage.removeItem("savedTotalPrice");
//       sessionStorage.removeItem("savedTotalWithDelivery");
//       sessionStorage.removeItem("discount"); // Clear discount
//       sessionStorage.removeItem("newTotal"); // Clear newTotal
//     }
//   }, [state.cart, state.selectedProducts, deliveryCharge]);

//   const handlePromoCodeChange = (e) => {
//     setPromoCode(e.target.value);
//     setError("");
//     setMessage("");
//   };

//   const applyPromoCode = async () => {
//     if (!promoCode) {
//       // setError("Please enter a promo code.");
//       toast.warning("Please Enter a Promo Code !"); // Show message as a toast alert
//       return;
//     }

//   // Filter cart items to include only those that are in selectedProducts
//   const selectedItems = state.cart.filter((item) => state.selectedProducts.includes(item.id));

//   // Prepare the request body for only selected items
//   const requestBody = {
//     code: promoCode,
//     products: selectedItems.map((item) => {
//       let price = item.discountPrice ? item.discountPrice : item.price;

//       if (item.sizeColor && item.selectedSize) {
//         const selectedSize = item.sizeColor.size?.find(
//           (sizeOption) => sizeOption.size === item.selectedSize
//         );

//         if (selectedSize && selectedSize.price) {
//           price = selectedSize.price;
//         } else {
//           price = item.price;
//         }
//       }

//       if (item.selectedColor) {
//         const selectedColor = item.sizeColor?.color?.find(
//           (colorOption) => colorOption.color === item.selectedColor
//         );

//         if (selectedColor && selectedColor.price) {
//           price = parseFloat(selectedColor.price);
//         } else {
//           price = item.price;
//         }
//       }

//       if (item.discountPrice && (!item.selectedColor || !item.selectedSize)) {
//         price = item.discountPrice;
//       }

//       const totalAmount = price * item.qty;

//       return {
//         price: price,
//         qty: item.qty,
//         total_amount: totalAmount,
//         name: item.name,
//         imgUrl: item.imgUrl,
//         productStock: item.productStock,
//         id: item.id,
//         discountPrice: item.discountPrice,
//         slug: item.slug,
//         productId: item.productId,
//         sellerId: item.sellerId,
//         productType: item.productType || "General",
//         sizeColor: item.sizeColor || { colorwithsize: {} },
//         selectedColor: item.selectedColor || null,
//         selectedSize: item.selectedSize || null,
//       };
//     }),
//   };

//   try {
//     const response = await fetch("https://frontend.tizaraa.shop/api/promo/apply", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${authtoken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const text = await response.text();
//       console.error("Unexpected response:", text);
//       throw new Error("The server returned an invalid response. Please try again later.");
//     }

//     const data = await response.json();

//     if (response.ok) {
//       // setMessage(data.message || "Promo code applied successfully!");
//       toast.success(data.message); // Show message as a toast alert
//       const discountValue = parseFloat(data.discount);
//       setDiscount(discountValue);

//       const totalPrice = savedTotalPrice;
//       const shippingCharge = savedTotalWithDelivery;
//       const finalPrice = totalPrice + shippingCharge - discountValue;

//       setNewTotal(finalPrice);

//       // Save discount, newTotal, and promoCode to sessionStorage
//       sessionStorage.setItem("discount", discountValue.toString());
//       sessionStorage.setItem("newTotal", finalPrice.toString());
//     }
//     else {
//       const errorMsg = data.message || data.error || "An error occurred. Please try again.";
//       // setError("All products must be from the same seller!");
//       toast.error(errorMsg);
//       console.error(" Error:", data.error);

//       setDiscount(0);
//       setNewTotal(savedTotalPrice + savedTotalWithDelivery);  // Use saved totals (without promo)
//       sessionStorage.setItem("discount", "0"); // Reset discount
//       sessionStorage.setItem("newTotal", (savedTotalPrice + savedTotalWithDelivery).toString());
//   }

//   }
//   catch (error) {
//     console.error("API Error:", error.message);
//     // Check if the error is a fetch failure or a specific condition
//     if (error.message === "Failed to fetch") {
//         // setError("Wrong Promo"); // Set the error message to "Wrong Promo"
//         toast.error("Wrong Promo !"); // Show message as a toast alert
//     } else {
//         setError(error.message || "Wrong Promo");
//     }
//     setDiscount(0);
//     setNewTotal(savedTotalPrice + savedTotalWithDelivery);  // Use saved totals (without promo)
//     sessionStorage.setItem("discount", "0"); // Reset discount
//     sessionStorage.setItem("newTotal", (savedTotalPrice + savedTotalWithDelivery).toString());
// }
// };

//   return (
//     <Card1>
//       {state.cart.map((item) => (
//         <ProductCard20
//           margin={0}
//           mb="1.5rem"
//           id={item.id}
//           key={item.id}
//           qty={item.qty}
//           slug={item.slug}
//           productStock={item.productStock}
//           name={item.name}
//           price={item.price}
//           imgUrl={item.imgUrl}
//           discountPrice={item.discountPrice}
//           productId={item.productId}
//           sellerId={item.sellerId}
//         />
//       ))}

//       <FlexBox flexDirection="column" mb="1rem">
//         <Typography fontWeight="600" mb="0.5rem">
//           Promotion
//         </Typography>
//         <FlexBox justifyContent="space-between" alignItems="center">
//           <input
//             type="text"
//             placeholder="Enter Store/Tizaraa Code"
//             value={promoCode}
//             onChange={handlePromoCodeChange}
//             style={{
//               flex: 1,
//               padding: "0.5rem",
//               border: "1px solid #ddd",
//               borderRadius: "4px",
//               marginRight: "0.5rem",
//               fontSize: "14px",
//             }}
//           />
//           <button
//             onClick={applyPromoCode}
//             style={{
//               backgroundColor: "#E94560",
//               color: "#fff",
//               padding: "0.5rem 1rem",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//             }}
//           >
//             APPLY
//           </button>
//         </FlexBox>

//         {/* Display error or message */}
//         <Typography color={error ? "red" : message ? "green" : "inherit"} mt="1rem">
//           {error || message} {/* Display error if it exists, otherwise display message */}
//         </Typography>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Subtotal:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {currency(savedTotalPrice)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Shipping:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {currency(savedTotalWithDelivery)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">VAT:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             BDT 0.00
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
//         <Typography color="text.hint">Discount:</Typography>
//         <Typography fontWeight="700">{currency(discount)}</Typography>
//       </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//         {currency((savedTotalWithDelivery + savedTotalPrice)-discount)}
//       </Typography>
//     </Card1>
//   );
// }

// ======================================================================

"use client";
import { useEffect, useState } from "react";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Grid from "@component/grid/Grid";
import { ProductCard2, ProductCard7 } from "@component/product-cards";
import { currency } from "@utils/utils";
import ProductCard20 from "@component/product-cards/ProductCard20";
import authService from "services/authService";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import { Box, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function CheckoutSummary({ deliveryCharge }) {
  const { state } = useAppContext();
  const authtoken = authService.getToken();

  const [savedTotalPrice, setSavedTotalPrice] = useState(0);
  const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);

  // newly added
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);

  // State for otcAdvancePaymentAmount
  const [otcAdvancePaymentAmount, setOtcAdvancePaymentAmount] = useState<
    number | null
  >(null);

  // Load otcAdvancePaymentAmount from sessionStorage on mount and poll for updates
  useEffect(() => {
    // Initial load
    const storedAdvancePayment = sessionStorage.getItem(
      "otcAdvancePaymentAmount"
    );
    if (storedAdvancePayment) {
      setOtcAdvancePaymentAmount(parseFloat(storedAdvancePayment));
    }

    // Poll sessionStorage every 500ms
    const intervalId = setInterval(() => {
      const updatedAdvancePayment = sessionStorage.getItem(
        "otcAdvancePaymentAmount"
      );
      if (updatedAdvancePayment) {
        setOtcAdvancePaymentAmount(parseFloat(updatedAdvancePayment));
      } else {
        setOtcAdvancePaymentAmount(null);
      }
    }, 200);

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   const getTotalPrice = () => {
  //     return state.cart.reduce((accumulator, item) => {
  //       if (state.selectedProducts.includes(item.id)) {
  //         const price =
  //           item.sizeColor?.nosize?.length === 0 && item.discountPrice
  //             ? item.discountPrice
  //             : item.price;
  //         return accumulator + price * item.qty;
  //       }
  //       return accumulator;
  //     }, 0);
  //   };

  //   const deliveryChargeDisplay = deliveryCharge || 0;
  //   const totalPrice = getTotalPrice();
  //   const totalWithDelivery =
  //     parseFloat(deliveryChargeDisplay) + (isExpressDelivery ? 10 : 0);

  //   // Check if all products are abroad
  //   const hasAbroadProduct = state.cart.every(
  //     (product: any) => product.productType === "Abroad"
  //   );

  //   // Update state and sessionStorage
  //   setSavedTotalPrice(totalPrice);
  //   setSavedTotalWithDelivery(totalWithDelivery);
  //   sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
  //   sessionStorage.setItem(
  //     "savedTotalWithDelivery",
  //     totalWithDelivery.toString()
  //   );

  //   // Reset discount and newTotal
  //   setDiscount(0);

  //   // Set newTotal based on product type
  //   if (hasAbroadProduct) {
  //     const advancePayment = otcAdvancePaymentAmount || 0;
  //     setNewTotal(advancePayment);
  //     sessionStorage.setItem("newTotal", advancePayment.toString());
  //   } else {
  //     const regularTotal = totalPrice + totalWithDelivery;
  //     setNewTotal(regularTotal);
  //     sessionStorage.setItem("newTotal", regularTotal.toString());
  //   }

  //   // Clear sessionStorage if cart is empty
  //   if (state.cart.length === 0) {
  //     setSavedTotalPrice(0);
  //     setSavedTotalWithDelivery(0);
  //     setDiscount(0);
  //     setNewTotal(0);
  //     sessionStorage.removeItem("savedTotalPrice");
  //     sessionStorage.removeItem("savedTotalWithDelivery");
  //     sessionStorage.removeItem("discount");
  //     sessionStorage.removeItem("newTotal");
  //     sessionStorage.removeItem("promoCode");
  //     setPromoCode("");
  //   }
  // }, [
  //   state.cart,
  //   state.selectedProducts,
  //   deliveryCharge,
  //   isExpressDelivery,
  //   otcAdvancePaymentAmount,
  // ]);

  useEffect(() => {
    const getTotalPrice = () => {
      return state.cart.reduce((accumulator, item) => {
        if (state.selectedProducts.includes(item.id)) {
          const price =
            item.sizeColor?.nosize?.length === 0 && item.discountPrice
              ? item.discountPrice
              : item.price;
          return accumulator + price * item.qty;
        }
        return accumulator;
      }, 0);
    };

    // Check if all products are abroad
    const hasAbroadProduct = state.cart.every(
      (product: any) => product.productType === "Abroad"
    );

    // Set delivery charge to 0 if all products are abroad
    const deliveryChargeDisplay = hasAbroadProduct ? 0 : deliveryCharge || 0;

    const totalPrice = getTotalPrice();
    const totalWithDelivery =
      parseFloat(deliveryChargeDisplay.toString()) +
      (isExpressDelivery && !hasAbroadProduct ? 10 : 0);

    // Update state and sessionStorage
    setSavedTotalPrice(totalPrice);
    setSavedTotalWithDelivery(totalWithDelivery);
    sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
    sessionStorage.setItem(
      "savedTotalWithDelivery",
      totalWithDelivery.toString()
    );

    // Reset discount and newTotal
    setDiscount(0);

    // Set newTotal based on product type
    if (hasAbroadProduct) {
      const advancePayment = otcAdvancePaymentAmount || 0;
      setNewTotal(advancePayment);
      sessionStorage.setItem("newTotal", advancePayment.toString());
    } else {
      const regularTotal = totalPrice + totalWithDelivery;
      setNewTotal(regularTotal);
      sessionStorage.setItem("newTotal", regularTotal.toString());
    }

    // Clear sessionStorage if cart is empty
    if (state.cart.length === 0) {
      setSavedTotalPrice(0);
      setSavedTotalWithDelivery(0);
      setDiscount(0);
      setNewTotal(0);
      sessionStorage.removeItem("savedTotalPrice");
      sessionStorage.removeItem("savedTotalWithDelivery");
      sessionStorage.removeItem("discount");
      sessionStorage.removeItem("newTotal");
      sessionStorage.removeItem("promoCode");
      setPromoCode("");
    }
  }, [
    state.cart,
    state.selectedProducts,
    deliveryCharge,
    isExpressDelivery,
    otcAdvancePaymentAmount,
  ]);

  const handlePromoCodeChange = (e) => {
    const newPromoCode = e.target.value;
    setPromoCode(newPromoCode);
    sessionStorage.setItem("promoCode", newPromoCode);
    setError("");
    setMessage("");
  };

  const applyPromoCode = async () => {
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

    // Check if all products are abroad
    const hasAbroadProduct = state.cart.every(
      (product: any) => product.productType === "Abroad"
    );

    if (hasAbroadProduct) {
      toast.warning("Promo codes cannot be applied to abroad products");
      return;
    }

    if (!promoCode) {
      toast.warning("Please Enter a Promo Code !");
      return;
    }

    // Filter cart items to include only those that are in selectedProducts
    const selectedItems = state.cart.filter((item) =>
      state.selectedProducts.includes(item.id)
    );

    // Prepare the request body for only selected items
    const requestBody = {
      code: promoCode,
      products: selectedItems.map((item) => {
        let price = item.discountPrice ? item.discountPrice : item.price;

        if (item.sizeColor && item.selectedSize) {
          const selectedSize = item.sizeColor.size?.find(
            (sizeOption) => sizeOption.size === item.selectedSize
          );

          if (selectedSize && selectedSize.price) {
            price = selectedSize.price;
          } else {
            price = item.price;
          }
        }

        if (item.selectedColor) {
          const selectedColor = item.sizeColor?.color?.find(
            (colorOption) => colorOption.color === item.selectedColor
          );

          if (selectedColor && selectedColor.price) {
            price = parseFloat(selectedColor.price);
          } else {
            price = item.price;
          }
        }

        if (item.discountPrice && (!item.selectedColor || !item.selectedSize)) {
          price = item.discountPrice;
        }

        const totalAmount = price * item.qty;

        return {
          price: price,
          qty: item.qty,
          total_amount: totalAmount,
          name: item.name,
          imgUrl: item.imgUrl,
          productStock: item.productStock,
          id: item.id,
          discountPrice: item.discountPrice,
          slug: item.slug,
          productId: item.productId,
          sellerId: item.sellerId,
          productType: item.productType || "General",
          sizeColor: item.sizeColor || { colorwithsize: {} },
          selectedColor: item.selectedColor || null,
          selectedSize: item.selectedSize || null,
        };
      }),
    };

    try {
      const response = await fetch(
        "https://frontend.tizaraa.shop/api/promo/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Unexpected response:", text);
        throw new Error(
          "The server returned an invalid response. Please try again later."
        );
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        const discountValue = parseFloat(data.discount);
        setDiscount(discountValue);

        // Skip discount calculation for abroad products start
        if (hasAbroadProduct) {
          const advancePayment = otcAdvancePaymentAmount || 0;
          setNewTotal(advancePayment);
          sessionStorage.setItem("newTotal", advancePayment.toString());
        } else {
          const totalPrice = savedTotalPrice;
          const shippingCharge = savedTotalWithDelivery;
          const finalPrice = totalPrice + shippingCharge - discountValue;

          setNewTotal(finalPrice);
          sessionStorage.setItem("newTotal", finalPrice.toString());
        }
        // Skip discount calculation for abroad products end

        const totalPrice = savedTotalPrice;
        const shippingCharge = savedTotalWithDelivery;
        const finalPrice = totalPrice + shippingCharge - discountValue;

        setNewTotal(finalPrice);

        // Save discount and newTotal to sessionStorage
        sessionStorage.setItem("discount", discountValue.toString());
        sessionStorage.setItem("newTotal", finalPrice.toString());

        // Handle promoCode in session based on discount
        if (discountValue === 0) {
          sessionStorage.removeItem("promoCode");
          setPromoCode("");
        } else {
          sessionStorage.setItem("promoCode", promoCode);
        }

        // ✅ After success, reset promo code in storage and UI
        // sessionStorage.removeItem("promoCode");
        // setPromoCode("");
      } else {
        const errorMsg =
          data.message || data.error || "An error occurred. Please try again.";
        toast.error(errorMsg);
        console.error("Error:", data.error);

        setDiscount(0);
        setNewTotal(savedTotalPrice + savedTotalWithDelivery);
        sessionStorage.setItem("discount", "0");
        sessionStorage.setItem(
          "newTotal",
          (savedTotalPrice + savedTotalWithDelivery).toString()
        );

        // If there's an error, set promoCode to empty string in session
        sessionStorage.setItem("promoCode", "");
        setPromoCode(""); // Also clear the input field
      }
    } catch (error) {
      console.error("API Error:", error.message);
      if (error.message === "Failed to fetch") {
        toast.error("Wrong Promo !");
      } else {
        setError(error.message || "Wrong Promo");
      }
      setDiscount(0);
      setNewTotal(savedTotalPrice + savedTotalWithDelivery);
      sessionStorage.setItem("discount", "0");
      sessionStorage.setItem(
        "newTotal",
        (savedTotalPrice + savedTotalWithDelivery).toString()
      );

      // If there's an error, set promoCode to empty string in session
      sessionStorage.setItem("promoCode", "");
      setPromoCode(""); // Also clear the input field
    }
  };

  const hasAbroadProduct = state.cart.every(
    (product: any) => product.productType === "Abroad"
  );

  return (
    <Card1>
      {state.cart.map((item) => (
        <ProductCard20
          margin={0}
          mb="1.5rem"
          id={item.id}
          key={item.id}
          qty={item.qty}
          slug={item.slug}
          productStock={item.productStock}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
          discountPrice={item.discountPrice}
          productId={item.productId}
          sellerId={item.sellerId}
        />
      ))}

      <FlexBox flexDirection="column">
        <Typography fontWeight="600" mb="0.5rem">
          Promotion
        </Typography>
        <FlexBox justifyContent="space-between" alignItems="center">
          <input
            type="text"
            placeholder="Enter Store/Tizaraa Code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            style={{
              flex: 1,
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginRight: "0.5rem",
              fontSize: "14px",
            }}
          />
          <button
            onClick={applyPromoCode}
            style={{
              backgroundColor: "#E94560",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            APPLY
          </button>
        </FlexBox>

        {/* Display error or message */}
        <Typography
          color={error ? "red" : message ? "green" : "inherit"}
          mt="1rem"
        >
          {error || message}{" "}
          {/* Display error if it exists, otherwise display message */}
        </Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {currency(savedTotalPrice)}
            {/* {currency(Math.ceil(savedTotalPrice))} */}
          </Typography>
        </FlexBox>
      </FlexBox>

      {hasAbroadProduct && (
        <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Typography color="#E94560">Pay Now (Advance):</Typography>
          <FlexBox alignItems="flex-end">
            <Typography
              color="#E94560"
              fontSize="18px"
              fontWeight="600"
              lineHeight="1"
            >
              {otcAdvancePaymentAmount !== null
                ? currency(otcAdvancePaymentAmount)
                : "BDT 0.00"}
            </Typography>
          </FlexBox>
        </FlexBox>
      )}

      {!hasAbroadProduct && (
        <>
          <FlexBox
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="text.hint">Shipping:</Typography>
            <FlexBox alignItems="flex-end">
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(savedTotalWithDelivery)}
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="text.hint">VAT:</Typography>
            <FlexBox alignItems="flex-end">
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                BDT 0.00
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox
            justifyContent="space-between"
            alignItems="center"
            mb="1.5rem"
          >
            <Typography color="text.hint">Discount:</Typography>
            <Typography fontWeight="700">{currency(discount)}</Typography>
          </FlexBox>
        </>
      )}

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb="1.5rem"
      >
        {hasAbroadProduct
          ? currency(otcAdvancePaymentAmount || 0)
          : currency(savedTotalWithDelivery + savedTotalPrice - discount)}
      </Typography>

      <Divider mb="1rem" />

      {hasAbroadProduct && (
        // <Typography fontSize="13px" color="text.hint" display="block" fontWeight="600">
        //   Pay on Delivery {currency(savedTotalPrice)} + Shipping & Courier
        //   Charge
        // </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip
                title={
                  <>
                    Shipping & Courier Charge will be calculated based on actual
                    weight & dimensions when the product is in-house by Tizaraa
                    <br />
                    -
                    <br />
                    পণ্যটি Tizaraa-তে পৌঁছানোর পর, প্রকৃত ওজন ও মাত্রার ভিত্তিতে
                    শিপিং ও কুরিয়ার চার্জ নির্ধারণ করা হবে
                  </>
                }
                arrow
                placement="top"
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  style={{ color: "#E94560" }}
                  sx={{ opacity: 0.7 }}
                />
              </Tooltip>
              <Typography fontSize="13px" color="text.primary">
                Pay on Delivery {currency(Math.ceil(savedTotalPrice))} +
                Shipping & Courier Charge
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb="1.5rem"
      >
        {currency(savedTotalWithDelivery + savedTotalPrice - discount)}
      </Typography> */}
    </Card1>
  );
}
