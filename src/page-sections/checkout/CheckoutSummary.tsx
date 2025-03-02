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

export default function CheckoutSummary({ deliveryCharge }) {
  const { state } = useAppContext();
  const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  });
  const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
  });

  useEffect(() => {
    // const getTotalPrice = () => {
    //   return state.cart.reduce((accumulator, item) => {
    //     if (state.selectedProducts.includes(item.id)) {
    //       return (
    //         accumulator +
    //         (item.discountPrice ? item.discountPrice : item.price) * item.qty
    //       );
    //     }
    //     return accumulator;
    //   }, 0);
    // };
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

    const storedAddress = sessionStorage.getItem("address");
    const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
    const deliveryChargeDisplay =
      selectedAddress?.deliveryCharge || deliveryCharge || 0;

    const totalPrice = getTotalPrice();
    const totalWithDelivery = parseFloat(deliveryChargeDisplay);

    if (totalPrice > 0) {
      setSavedTotalPrice(totalPrice);
      sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
    }

    if (totalWithDelivery > 0) {
      setSavedTotalWithDelivery(totalWithDelivery);
      sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
    }

    if (state.cart.length === 0) {
      setSavedTotalPrice(0);
      setSavedTotalWithDelivery(0);
      sessionStorage.removeItem("savedTotalPrice");
      sessionStorage.removeItem("savedTotalWithDelivery");
    }
    
  }, [state.cart, deliveryCharge]);
  
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

<FlexBox
  flexDirection="column"
  // border="1px solid #ccc"
  // borderRadius="8px"
  // p="1rem"
  mb="1rem"
>
  <Typography fontWeight="600" mb="0.5rem">
    Promotion
  </Typography>
  <FlexBox justifyContent="space-between" alignItems="center">
    <input
      type="text"
      placeholder="Enter Store/Tizaraa Code"
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
</FlexBox>
       
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(savedTotalPrice)}
          </Typography>
        </FlexBox>
      </FlexBox>

      
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(savedTotalWithDelivery)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">VAT:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          -
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
        <Typography color="text.hint">Discount:</Typography>
        <Typography fontWeight="700">-</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
      </FlexBox>

      <Divider mb="1rem" />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
      {currency(savedTotalWithDelivery + savedTotalPrice)}
      </Typography>
    </Card1>
  );
}





// "use client";
// import { useEffect, useState } from "react";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import { useAppContext } from "@context/app-context";
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
//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(() => {
//     return parseFloat(sessionStorage.getItem("discount") || "0"); // Load any saved discount
//   });

//   // useEffect(() => {
//   //   const getTotalPrice = () => {
//   //     return state.cart.reduce((accumulator, item) => {
//   //       if (state.selectedProducts.includes(item.id)) {
//   //         return (
//   //           accumulator +
//   //           (item.discountPrice ? item.discountPrice : item.price) * item.qty
//   //         );
//   //       }
//   //       return accumulator;
//   //     }, 0);
//   //   };

//   //   const storedAddress = sessionStorage.getItem("address");
//   //   const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
//   //   const deliveryChargeDisplay =
//   //     selectedAddress?.deliveryCharge || deliveryCharge || 0;

//   //   const totalPrice = getTotalPrice();  // Total price of products
//   //   const totalWithDelivery = totalPrice + parseFloat(deliveryChargeDisplay);  // Total price with shipping

//   //   // Save total prices to sessionStorage
//   //   if (totalPrice > 0) {
//   //     setSavedTotalPrice(totalPrice);
//   //     sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
//   //   }

//   //   if (totalWithDelivery > 0) {
//   //     setSavedTotalWithDelivery(totalWithDelivery);
//   //     sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
//   //   }

//   //   if (state.cart.length === 0) {
//   //     setSavedTotalPrice(0);
//   //     setSavedTotalWithDelivery(0);
//   //     sessionStorage.removeItem("savedTotalPrice");
//   //     sessionStorage.removeItem("savedTotalWithDelivery");
//   //   }
//   // }, [state.cart, deliveryCharge]);


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
  
//     const totalPrice = getTotalPrice();  // Calculate total price of selected items
//     const savedAddress = sessionStorage.getItem("address");
//     const selectedAddress = savedAddress ? JSON.parse(savedAddress) : null;
    
//     // Set delivery charge based on the user's address or a default value
//     const deliveryCharge = selectedAddress?.deliveryCharge || 0;
//     const totalWithDelivery = totalPrice + deliveryCharge;  // Add delivery charge to total price
  
//     // Save totalPrice, totalWithDelivery, and cart items in sessionStorage
//     sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
//     sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
//     sessionStorage.setItem("cartItems", JSON.stringify(state.cart));
  
//     // Save the discount amount if applied
//     sessionStorage.setItem("discountAmount", discount.toString());  // Store discount
  

//   }, [state.cart, state.selectedProducts, discount]); // Re-run effect when discount or cart changes
  


//   // Apply Promo
//   const handleApplyPromoCode = () => {
//     const promoCodes = {
//       "DISCOUNT10": 0.1,
//       "SAVE5": 5,
//     };

//     if (promoCodes[promoCode.toUpperCase()]) {
//       const promoValue = promoCodes[promoCode.toUpperCase()];
//       if (typeof promoValue === "number" && promoValue < 1) {
//         const calculatedDiscount = savedTotalPrice * promoValue;  // Percentage discount
//         setDiscount(calculatedDiscount);
//         sessionStorage.setItem("discount", calculatedDiscount.toString()); // Save discount to sessionStorage
//       } else {
//         setDiscount(promoValue);  // Fixed amount discount
//         sessionStorage.setItem("discount", promoValue.toString()); // Save fixed discount to sessionStorage
//       }
//     } else {
//       alert("Invalid promo code");
//       setDiscount(0);  // Reset discount
//       sessionStorage.setItem("discount", "0");  // Clear saved discount
//     }
//   };

//   // Calculate the final total, deducting the discount if available
//   const finalTotal = savedTotalWithDelivery - discount;

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
//             placeholder="Enter Promo Code"
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)} 
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
//             onClick={handleApplyPromoCode}
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
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Subtotal:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {currency(savedTotalPrice)} {/* Product prices only */}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Shipping:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {currency(deliveryCharge)} {/* Shipping charge */}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       {/* VAT */}
//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">VAT:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             - {/* Assuming no VAT in this case */}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       {/* Discount Fee */}
//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Discount:</Typography>
//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {currency(discount)} {/* Discount fee */}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <Divider mb="1rem" />

//       {/* Final Total: Product Price + Shipping - Discount */}
//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//         {currency(finalTotal)} {/* Final total after discount */}
//       </Typography>
//     </Card1>
//   );
// }
