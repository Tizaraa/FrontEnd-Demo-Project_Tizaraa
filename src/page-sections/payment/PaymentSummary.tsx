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
import { it } from "node:test";

export default function PaymentSummary() {
  const { state } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);

  // const getTotalPrice = () => {
  //   return state.cart.reduce((accumulator, item) => 
  //     // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
  //   accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty, 0
  //   ) || 0;
  // };

  useEffect(() => {
    // Load values from sessionStorage
    const savedPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
    const savedShipping = parseFloat(sessionStorage.getItem("deliveryCharge") || "0");
    const savedCart = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

    const savedDiscount = parseFloat(sessionStorage.getItem("discount") || "0");
    const savedNewTotal = parseFloat(
      sessionStorage.getItem("newTotal") || (savedPrice + savedShipping).toString()
    );
    
 
    setTotalPrice(savedPrice);
    setShippingCharge(savedShipping);
    setCartItems(savedCart);

    setDiscount(savedDiscount);
    setNewTotal(savedNewTotal);
  }, [state.cart]);

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
   // User shipping data
      
   let shippingData = sessionStorage.getItem('address');
   let userShippingdata = JSON.parse(shippingData);
   let discountData = sessionStorage.getItem('discount');

   const deliveryChargeDisplay = userShippingdata && userShippingdata.deliveryCharge 
? userShippingdata.deliveryCharge 
: "-";



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
              name={item.name}
              price={item.price}
              productStock={item.productStock}
              imgUrl={item.imgUrl}
              discountPrice={item.discountPrice}
              productId={item.productId}
              sellerId={item.sellerId}
            />
          ))}
       
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {/* {currency(getTotalPrice())} */}
          {currency(totalPrice)}
          </Typography>

          {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
            00
          </Typography> */}
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {/* {deliveryChargeDisplay} */}
            {currency(shippingCharge)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Vat:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          -
          </Typography>

          {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
            00
          </Typography> */}
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Discount:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(discount)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
      {/* {currency(getTotalPrice() + (parseFloat(deliveryChargeDisplay) || 0))} */}
      {currency((totalPrice + shippingCharge)-discount)}

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
// import { it } from "node:test";

// export default function PaymentSummary() {
//   const { state } = useAppContext();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [newTotal, setNewTotal] = useState(0);

//   // const getTotalPrice = () => {
//   //   return state.cart.reduce((accumulator, item) => 
//   //     // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//   //   accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty, 0
//   //   ) || 0;
//   // };

//   useEffect(() => {
//     // Load values from sessionStorage
//     const savedPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
//     const savedShipping = parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
//     const savedDiscount = parseFloat(sessionStorage.getItem("discount") || "0");
//     const savedNewTotal = parseFloat(sessionStorage.getItem("newTotal") || "0");
//     const savedCart = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

//     setTotalPrice(savedPrice);
//     setShippingCharge(savedShipping);
//     setCartItems(savedCart);
//     setDiscount (savedDiscount);
//     setNewTotal(savedNewTotal);
//   }, [state.cart]);

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) => {
//       if (state.selectedProducts.includes(item.id)) {
//         return (
//           accumulator +
//           (item.discountPrice ? item.discountPrice : item.price) * item.qty
//         );
//       }
//       return accumulator;
//     }, 0);
//   };
//    // User shipping data
      
//    let shippingData = sessionStorage.getItem('address');
//    let userShippingdata = JSON.parse(shippingData);

//    const deliveryChargeDisplay = userShippingdata && userShippingdata.deliveryCharge 
// ? userShippingdata.deliveryCharge 
// : "-";



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
//               name={item.name}
//               price={item.price}
//               productStock={item.productStock}
//               imgUrl={item.imgUrl}
//               discountPrice={item.discountPrice}
//               productId={item.productId}
//               sellerId={item.sellerId}
//             />
//           ))}
       
//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Subtotal:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           {/* {currency(getTotalPrice())} */}
//           {currency(totalPrice)}
//           </Typography>

//           {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
//             00
//           </Typography> */}
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Shipping:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//             {/* {deliveryChargeDisplay} */}
//             {currency(shippingCharge)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Vat:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           -
//           </Typography>

//           {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
//             00
//           </Typography> */}
//         </FlexBox>
//       </FlexBox>

//       <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
//         <Typography color="text.hint">Discount:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           {currency(discount)}
//           </Typography>
//         </FlexBox>
//       </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//       {/* {currency(getTotalPrice() + (parseFloat(deliveryChargeDisplay) || 0))} */}
//       {/* {currency(totalPrice + shippingCharge)} */}
//       {currency(newTotal)}

//       </Typography>

//       {/* <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
//         <Typography color="text.hint">Discount:</Typography>
//         <Typography fontWeight="700">{currency(discount)}</Typography>
//       </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//         {currency(newTotal)}
//       </Typography> */}
//     </Card1>
//   );
// }