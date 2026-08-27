// import { Button } from "@component/buttons";
// import FlexBox from "@component/FlexBox";
// import Icon from "@component/icon/Icon";
// import { H3 } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { useState, useEffect } from "react";
// import { Styledbutton } from "./style";
// import toast from 'react-hot-toast';
// import BeatLoader from "react-spinners/BeatLoader";
// import { FaShoppingCart } from "react-icons/fa";

// type AddToCartButtonProps = {
//   productId: string | number;
//   variantId: string | number | null;
//   sellerId: string | number;
//   images: string[];
//   title: string;
//   discountPrice?: number;
//   price?: any;
//   productStock: number;
//   slug?: string;
//   productType: string;
//   sizeColor?: {
//     colorwithsize?: {
//       [color: string]: { size: string; price: string; qty: string }[];
//     };
//     size?: { size: string; price: string; qty: string }[];
//     color?: { color: string; price: string; qty: string }[];
//   };
//   selectedColor?: string | null;
//   selectedSpecification?: string | null;
//   selectedSize?: string | null;
//   selectedPrice?: number | any;
//   currentQuantity?: number;
//   setCurrentQuantity?: (quantity: number) => void;
// };

// const AddToCartButton = ({
//   productId,
//   variantId,
//   sellerId,
//   images,
//   title,
//   discountPrice,
//   price,
//   productStock,
//   slug,
//   productType,
//   sizeColor,
//   selectedColor,
//   selectedSpecification,
//   selectedSize,
//   selectedPrice,
//   currentQuantity,
//   setCurrentQuantity,
// }: AddToCartButtonProps) => {
//   const { state, dispatch } = useAppContext();
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   // Generate a unique key for the product variant
//   const uniqueKey = `${productId}-${variantId || "default"}-${selectedColor || "default"}-${selectedSize || "default"}`;

//   const cartItem = state.cart.find(item => item.id === uniqueKey);

//   useEffect(() => {
//     if (cartItem) {
//       setQuantity(cartItem.qty);
//     }
//   }, [cartItem]);

//   // Calculate the final price based on selected color and size
//   const calculateFinalPrice = () => {
//     if (sizeColor?.colorwithsize && selectedColor && selectedSize) {
//       const selectedProduct = sizeColor.colorwithsize[selectedColor]?.find(
//         (item) => item.size === selectedSize
//       );
//       return selectedProduct ? parseFloat(selectedProduct.price) : selectedPrice || discountPrice || price || 0;
//     }
//     return selectedPrice || discountPrice || price || 0;
//   };

//   // const handleCartAmountChange = (amount: number) => {
//   //   if (amount > productStock) {
//   //     toast.error("Out of Stock");
//   //     return;
//   //   }

//   //   setQuantity(amount);
//   const handleCartAmountChange = (amount: number) => {
//     if (amount > productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     if (setCurrentQuantity) {
//       setCurrentQuantity(amount);
//     }

//     setQuantity(amount);
//     if (setCurrentQuantity) {
//       setCurrentQuantity(amount);
//     }

//     const finalPrice = calculateFinalPrice();

//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: {
//         price: finalPrice,
//         qty: amount,
//         name: title,
//         imgUrl: images[0],
//         productStock: productStock,
//         id: uniqueKey,
//         discountPrice,
//         slug,
//         productId,
//         variantId,
//         sellerId,
//         productType,
//         total_amount: finalPrice * amount,
//         sizeColor,
//         selectedColor,
//         selectedSpecification,
//         selectedSize,
//       },
//     });
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     product: any
//   ) => {
//     const newQty = Math.min(
//       product.productStock,
//       Math.max(1, parseInt(e.target.value))
//     );
//     if (newQty > product.productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: newQty },
//     });
//   };

//   // const handleAddToCart = () => {
//   //   setIsLoading(true);

//   //   setTimeout(() => {
//   //     handleCartAmountChange(1);
//   //     setIsLoading(false);
//   //     toast.success("Added to cart successfully!");
//   //   }, 1000); // Simulate API call delay
//   // };

//   // newly added
//   const handleAddToCart = () => {
//     const existingProductType = state.cart.length > 0 ? state.cart[0].productType : null;

//     if (existingProductType && existingProductType !== productType) {
//       toast.error(`You cannot add ${productType} products to the cart with ${existingProductType} products.`);
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       handleCartAmountChange(1);
//       setIsLoading(false);
//       // toast.success("Added to cart successfully!");
//       toast.success(
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <FaShoppingCart style={{ marginRight: '10px' }} />
//           Added to cart successfully!
//         </div>
//       );
//     }, 1000); // Simulate API call delay
//   };

//   return (
//     <Styledbutton>
//       {!cartItem ? (
//         <Button
//           mb="36px"
//           size="small"
//           color="primary"
//           variant="contained"
//           onClick={handleAddToCart}
//           disabled={isLoading}
//         >
//           {isLoading ? <BeatLoader size={18} color="#fff" /> : 'Add to Cart'}
//         </Button>
//       ) : (
//         <FlexBox alignItems="center" mb="36px" style={{ gap: "10px" }}>
//           <Button
//             p="9px"
//             size="small"
//             color="primary"
//             variant="outlined"
//             onClick={() => handleCartAmountChange(cartItem.qty - 1)}
//             disabled={cartItem.qty <= 1}
//           >
//             <Icon variant="small">minus</Icon>
//           </Button>

//           {/* <H3 fontWeight="600" mx="20px">
//             {cartItem.qty.toString().padStart(2, "0")}
//           </H3> */}
//           {/* <H3 fontWeight="600" mx="20px">
//             {(cartItem.qty ?? 1).toString().padStart(2, "0")}
//           </H3> */}

//           <input
//                   className="no-spin-button"
//                   type="number"
//                   value={cartItem.qty}
//                   min={1}
//                   onChange={(e) => handleInputChange(e, cartItem)}
//                   style={{
//                     textDecoration: "none",
//                     borderRadius: "30px",
//                     scrollBehavior: "unset",
//                     border: "1px solid #E94560",
//                     padding: "8px",
//                     width: "60px",
//                     textAlign: "center",
//                   }}
//                 />

//           <Button
//             p="9px"
//             size="small"
//             color="primary"
//             variant="outlined"
//             onClick={() => handleCartAmountChange(cartItem.qty + 1)}
//           >
//             <Icon variant="small">plus</Icon>
//           </Button>
//         </FlexBox>
//       )}
//     </Styledbutton>
//   );
// };

// export default AddToCartButton;

import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { FaShoppingCart } from "react-icons/fa";
import authService from "services/authService";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
 productId: string | number;
 variantId: string | number | null;
 sellerId: string | number;
 images: string[];
 title: string;
 discountPrice?: number;
 price?: any;
 productStock: number;
 minOrderQty?: number;
 maxOrderQty?: number | null;
 slug?: string;
 productType: string;
 sizeColor?: {
  colorwithsize?: {
   [color: string]: { size: string; price: string; qty: string }[];
  };
  size?: { size: string; price: string; qty: string }[];
  color?: { color: string; price: string; qty: string }[];
 };
 selectedColor?: string | null;
 selectedSpecification?: string | null;
 selectedSize?: string | null;
 selectedPrice?: number | any;
 currentQuantity?: number;
 setCurrentQuantity?: (quantity: number) => void;
};

const AddToCartButton = ({
 productId,
 variantId,
 sellerId,
 images,
 title,
 discountPrice,
 price,
 productStock,
 minOrderQty,
 maxOrderQty,
 slug,
 productType,
 sizeColor,
 selectedColor,
 selectedSpecification,
 selectedSize,
 selectedPrice,
 currentQuantity,
 setCurrentQuantity,
}: AddToCartButtonProps) => {
 const { state, dispatch } = useAppContext();
 const [quantity, setQuantity] = useState(1);
 const [isLoading, setIsLoading] = useState(false);

 // Generate a unique key for the product variant
 const uniqueKey = `${productId}-${variantId || "default"}-${
  selectedColor || "default"
 }-${selectedSize || "default"}`;

 const cartItem = state.cart.find((item) => item.id === uniqueKey);

 const router = useRouter();

 useEffect(() => {
  if (cartItem) {
   setQuantity(cartItem.qty);
  }
 }, [cartItem]);

 // Calculate the final price based on selected color and size
 const calculateFinalPrice = () => {
  if (sizeColor?.colorwithsize && selectedColor && selectedSize) {
   const selectedProduct = sizeColor.colorwithsize[selectedColor]?.find(
    (item) => item.size === selectedSize
   );
   return selectedProduct
    ? parseFloat(selectedProduct.price)
    : selectedPrice || discountPrice || price || 0;
  }
  return selectedPrice || discountPrice || price || 0;
 };

 // const handleCartAmountChange = (amount: number) => {
 //   if (amount > productStock) {
 //     toast.error("Out of Stock");
 //     return;
 //   }

 //   setQuantity(amount);
 // Seller's per-order limits — max null/undefined means unlimited
 const minQty = Math.max(1, Number(minOrderQty ?? 1) || 1);
 const maxQty =
  maxOrderQty === null || maxOrderQty === undefined
   ? null
   : Math.max(minQty, Number(maxOrderQty));

 // Highest quantity the buyer may pick: capped by both stock and the seller's max
 const qtyCeiling = maxQty === null ? productStock : Math.min(maxQty, productStock);

 const handleCartAmountChange = (amount: number): boolean => {
  if (amount > productStock) {
   toast.error("Out of Stock");
   return false; // indicate failure
  }

  if (amount < minQty) {
   toast.error(`Minimum order quantity is ${minQty}.`);
   return false;
  }

  if (maxQty !== null && amount > maxQty) {
   toast.error(`Maximum order quantity is ${maxQty}.`);
   return false;
  }

  if (setCurrentQuantity) {
   setCurrentQuantity(amount);
  }

  setQuantity(amount);

  const finalPrice = calculateFinalPrice();

  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: {
    price: finalPrice,
    qty: amount,
    name: title,
    imgUrl: images[0],
    productStock: productStock,
    minOrderQty: minQty,
    maxOrderQty: maxQty,
    id: uniqueKey,
    discountPrice,
    slug,
    productId,
    variantId,
    sellerId,
    productType,
    total_amount: finalPrice * amount,
    sizeColor,
    selectedColor,
    selectedSpecification,
    selectedSize,
   },
  });

  return true; // indicate success
 };

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  product: any
 ) => {
  const typed = parseInt(e.target.value);
  if (Number.isNaN(typed)) return;

  // Clamp into [minQty, min(maxQty, stock)] so typing can't beat the stepper
  const newQty = Math.min(qtyCeiling, Math.max(minQty, typed));

  if (typed > qtyCeiling) {
   toast.error(
    maxQty !== null && maxQty <= product.productStock
     ? `Maximum order quantity is ${maxQty}.`
     : "Out of Stock"
   );
  }

  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: {
    ...product,
    qty: newQty,
    minOrderQty: minQty,
    maxOrderQty: maxQty,
   },
  });
 };

 // const handleAddToCart = () => {
 //   setIsLoading(true);

 //   setTimeout(() => {
 //     handleCartAmountChange(1);
 //     setIsLoading(false);
 //     toast.success("Added to cart successfully!");
 //   }, 1000); // Simulate API call delay
 // };

 // newly added
 // const handleAddToCart = () => {
 //   const existingProductType = state.cart.length > 0 ? state.cart[0].productType : null;

 //   if (existingProductType && existingProductType !== productType) {
 //     toast.error(`You cannot add ${productType} products to the cart with ${existingProductType} products.`);
 //     return;
 //   }

 //   setIsLoading(true);

 //   setTimeout(() => {
 //     const success = handleCartAmountChange(1); // returns false if out of stock
 //     setIsLoading(false);

 //     if (success) {
 //       toast.success(
 //         <div style={{ display: 'flex', alignItems: 'center' }}>
 //           <FaShoppingCart style={{ marginRight: '10px' }} />
 //           Added to cart successfully!
 //         </div>
 //       );
 //     }
 //   }, 1000);
 // };

 const handleAddToCart = () => {
  // 1. Check if user is logged in
  const isLoggedIn = authService.isAuthenticated(); // or state.user
  if (!isLoggedIn) {
   sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
   toast.error("Login required to add to cart.");
   router.push("/login");
   return;
  }

  // 2. Prevent mixing product types in cart
  const existingProductType =
   state.cart.length > 0 ? state.cart[0].productType : null;
  if (existingProductType && existingProductType !== productType) {
   toast.error(
    `You cannot add ${productType} products with ${existingProductType} products in the cart.`
   );
   return;
  }

  // 3. Add product to cart
  setIsLoading(true);
  setTimeout(() => {
   // Start at the seller's minimum, not a hardcoded 1
   const success = handleCartAmountChange(minQty);
   setIsLoading(false);

   if (success) {
    toast.success(
     <div style={{ display: "flex", alignItems: "center" }}>
      <FaShoppingCart style={{ marginRight: "10px" }} />
      Added to cart successfully!
     </div>
    );
   }
  }, 1000);
 };

 return (
  <Styledbutton>
   {!cartItem ? (
    <Button
     mb="36px"
     size="small"
     color="primary"
     variant="contained"
     onClick={handleAddToCart}
     disabled={isLoading}
    >
     {isLoading ? <BeatLoader size={18} color="#fff" /> : "Add to Cart"}
    </Button>
   ) : (
    <FlexBox alignItems="center" mb="36px" style={{ gap: "10px" }}>
     <Button
      p="9px"
      size="small"
      color="primary"
      variant="outlined"
      onClick={() => handleCartAmountChange(cartItem.qty - 1)}
      disabled={cartItem.qty <= minQty}
     >
      <Icon variant="small">minus</Icon>
     </Button>

     {/* <H3 fontWeight="600" mx="20px">
            {cartItem.qty.toString().padStart(2, "0")}
          </H3> */}
     {/* <H3 fontWeight="600" mx="20px">
            {(cartItem.qty ?? 1).toString().padStart(2, "0")}
          </H3> */}

     <input
      className="no-spin-button"
      type="number"
      value={cartItem.qty}
      min={minQty}
      max={qtyCeiling}
      onChange={(e) => handleInputChange(e, cartItem)}
      style={{
       textDecoration: "none",
       borderRadius: "30px",
       scrollBehavior: "unset",
       border: "1px solid #E94560",
       padding: "8px",
       width: "60px",
       textAlign: "center",
      }}
     />

     <Button
      p="9px"
      size="small"
      color="primary"
      variant="outlined"
      onClick={() => handleCartAmountChange(cartItem.qty + 1)}
      disabled={cartItem.qty >= qtyCeiling}
     >
      <Icon variant="small">plus</Icon>
     </Button>

     {maxQty !== null && (
      <span style={{ fontSize: "12px", color: "#7A8A99" }}>
       Max {maxQty} per order
      </span>
     )}
    </FlexBox>
   )}
  </Styledbutton>
 );
};

export default AddToCartButton;
