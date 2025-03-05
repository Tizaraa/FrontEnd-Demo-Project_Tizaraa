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

export default function CheckoutSummary({ deliveryCharge }) {
  const { state } = useAppContext();
  const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  });
  const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
  });

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
  
    const storedAddress = sessionStorage.getItem("address");
    const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
    const deliveryChargeDisplay =
      selectedAddress?.deliveryCharge || deliveryCharge || 0;
  
    const totalPrice = getTotalPrice();
    const totalWithDelivery = parseFloat(deliveryChargeDisplay);
  
    // Update state and sessionStorage
    if (totalPrice > 0) {
      setSavedTotalPrice(totalPrice);
      sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
    } else {
      setSavedTotalPrice(0);
      sessionStorage.removeItem("savedTotalPrice");
    }
  
    if (totalWithDelivery > 0) {
      setSavedTotalWithDelivery(totalWithDelivery);
      sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
    } else {
      setSavedTotalWithDelivery(0);
      sessionStorage.removeItem("savedTotalWithDelivery");
    }
  
    // Clear sessionStorage if cart is empty
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

      <FlexBox flexDirection="column" mb="1rem">
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
        <Typography color={error ? "red" : message ? "green" : "inherit"} mt="1rem">
          {error || message} {/* Display error if it exists, otherwise display message */}
        </Typography>
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
            - {/* Add VAT calculation if necessary */}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
        <Typography color="text.hint">Discount:</Typography>
        <Typography fontWeight="700">{currency(discount)}</Typography>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
        {currency(newTotal)}
      </Typography>
    </Card1>
  );
}



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
//   const [savedTotalPrice, setSavedTotalPrice] = useState(0);
//   const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(0);

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

//     // Clear sessionStorage if cart is empty
//     if (state.cart.length === 0) {
//       setSavedTotalPrice(0);
//       setSavedTotalWithDelivery(0);
//       sessionStorage.removeItem("savedTotalPrice");
//       sessionStorage.removeItem("savedTotalWithDelivery");
//     }
//   }, [state.cart, state.selectedProducts, deliveryCharge]);

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
//             -
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//         {currency(savedTotalWithDelivery + savedTotalPrice)}
//       </Typography>
//     </Card1>
//   );
// }