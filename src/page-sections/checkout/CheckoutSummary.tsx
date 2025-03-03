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
  const authtoken = authService.getToken();
  const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  });
  const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
  });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(savedTotalPrice + savedTotalWithDelivery);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTotalPrice = () => {
      return state.cart.reduce((accumulator, item) => {
        if (state.selectedProducts.includes(item.id)) {
          return (
            accumulator +
            (item.discountPrice ? item.discountPrice : item.price) * item.qty
          );
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

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setError("");
    setMessage("");
  };

  // const applyPromoCode = async () => {
  //   if (!promoCode) {
  //     setError("Please enter a promo code.");
  //     return;
  //   }

  //   // Prepare the request body
  //   const requestBody = {
  //     code: promoCode,
  //     products: state.cart.map((item) => ({
  //       price: item.price,
  //       qty: item.qty,
  //       name: item.name,
  //       imgUrl: item.imgUrl,
  //       productStock: item.productStock,
  //       id: item.id,
  //       discountPrice: item.discountPrice,
  //       slug: item.slug,
  //       productId: item.productId,
  //       sellerId: item.sellerId,
  //       b2bPricing: item.b2bPricing || [],
  //       productType: item.productType || "General",
  //       total_amount: (item.discountPrice || item.price) * item.qty,
  //     })),
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
  //     console.log("API Data:", data);

  //     // Handle the success case
  //     if (response.ok) {
  //       setMessage(data.message); // Set the success message
  //       setDiscount(parseFloat(data.discount));
  //       setNewTotal(parseFloat(data.new_total));
  //       // setError(data.error);
  //     } else {
  //       setError(data.error);
  //       setDiscount(0);
  //       setNewTotal(savedTotalPrice + savedTotalWithDelivery);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     setError(error.message || "An error occurred. Please try again.");
  //     setDiscount(0);
  //     setNewTotal(savedTotalPrice + savedTotalWithDelivery);
  //   }
  // };



  const applyPromoCode = async () => {
    if (!promoCode) {
      setError("Please enter a promo code.");
      return;
    }
  
    // Prepare the request body
    const requestBody = {
      code: promoCode,
      products: state.cart.map((item) => ({
        price: item.price,
        qty: item.qty,
        name: item.name,
        imgUrl: item.imgUrl,
        productStock: item.productStock,
        id: item.id,
        discountPrice: item.discountPrice,
        slug: item.slug,
        productId: item.productId,
        sellerId: item.sellerId,
        b2bPricing: item.b2bPricing || [],
        productType: item.productType || "General",
        total_amount: (item.discountPrice || item.price) * item.qty,
        sizeColor: item.sizeColor || { nosize: [] },
        selectedColor: item.selectedColor || null,
        selectedSize: item.selectedSize || null,
      })),
    };
  
    try {
      const response = await fetch("https://frontend.tizaraa.shop/api/promo/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Unexpected response:", text);
        throw new Error("The server returned an invalid response. Please try again later.");
      }
  
      const data = await response.json();
      console.log("API Data:", data);
  
      // Handle the response
      if (response.ok) {
        // Success case
        setMessage(data.message || "Promo code applied successfully!"); // Set success message or fallback
        setDiscount(parseFloat(data.discount));
        setNewTotal(parseFloat(data.new_total));
      } else {
        // Error case
        setError(data.message || data.error || "An error occurred. Please try again."); // Check for error messages
        setDiscount(0);
        setNewTotal(savedTotalPrice + savedTotalWithDelivery);
      }
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "An error occurred. Please try again.");
      setDiscount(0);
      setNewTotal(savedTotalPrice + savedTotalWithDelivery);
    }
  };
  
  

  
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
