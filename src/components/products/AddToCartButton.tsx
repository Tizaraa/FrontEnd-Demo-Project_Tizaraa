import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import toast from 'react-hot-toast';
import BeatLoader from "react-spinners/BeatLoader";
import { FaShoppingCart } from "react-icons/fa";

type AddToCartButtonProps = {
  productId: string | number;
  variantId: string | number | null;
  sellerId: string | number;
  images: string[];
  title: string;
  discountPrice?: number;
  price?: any;
  productStock: number;
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
  const uniqueKey = `${productId}-${variantId || "default"}-${selectedColor || "default"}-${selectedSize || "default"}`;

  const cartItem = state.cart.find(item => item.id === uniqueKey);

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
      return selectedProduct ? parseFloat(selectedProduct.price) : selectedPrice || discountPrice || price || 0;
    }
    return selectedPrice || discountPrice || price || 0;
  };

  // const handleCartAmountChange = (amount: number) => {
  //   if (amount > productStock) {
  //     toast.error("Out of Stock");
  //     return;
  //   }

  //   setQuantity(amount);
  const handleCartAmountChange = (amount: number) => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }
    if (setCurrentQuantity) {
      setCurrentQuantity(amount);
    }

    setQuantity(amount);
    if (setCurrentQuantity) {
      setCurrentQuantity(amount);
    }

    const finalPrice = calculateFinalPrice();

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: finalPrice,
        qty: amount,
        name: title,
        imgUrl: images[0],
        productStock: productStock,
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
  };



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: any
  ) => {
    const newQty = Math.min(
      product.productStock,
      Math.max(1, parseInt(e.target.value))
    );
    if (newQty > product.productStock) {
      toast.error("Out of Stock");
      return;
    }
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: newQty },
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
  const handleAddToCart = () => {
    const existingProductType = state.cart.length > 0 ? state.cart[0].productType : null;
  
    if (existingProductType && existingProductType !== productType) {
      toast.error(`You cannot add ${productType} products to the cart with ${existingProductType} products.`);
      return;
    }
  
    setIsLoading(true);
  
    setTimeout(() => {
      handleCartAmountChange(1);
      setIsLoading(false);
      // toast.success("Added to cart successfully!");
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaShoppingCart style={{ marginRight: '10px' }} />
          Added to cart successfully!
        </div>
      );
    }, 1000); // Simulate API call delay
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
          {isLoading ? <BeatLoader size={18} color="#fff" /> : 'Add to Cart'}
        </Button>
      ) : (
        <FlexBox alignItems="center" mb="36px" style={{ gap: "10px" }}>
          <Button
            p="9px"
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleCartAmountChange(cartItem.qty - 1)}
            disabled={cartItem.qty <= 1}
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
                  min={1}
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
          >
            <Icon variant="small">plus</Icon>
          </Button>
        </FlexBox>
      )}
    </Styledbutton>
  );
};

export default AddToCartButton;






// import { Button } from "@component/buttons";
// import FlexBox from "@component/FlexBox";
// import Icon from "@component/icon/Icon";
// import { H3 } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { useState, useEffect } from "react";
// import { Styledbutton } from "./style";
// import toast from "react-hot-toast";
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

//   // Animation states
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [showShirt, setShowShirt] = useState(false);

//   // Generate a unique key for the product variant
//   const uniqueKey = `${productId}-${variantId || "default"}-${
//     selectedColor || "default"
//   }-${selectedSize || "default"}`;

//   const cartItem = state.cart.find((item) => item.id === uniqueKey);

//   useEffect(() => {
//     if (cartItem) {
//       setQuantity(cartItem.qty);
//     }
//   }, [cartItem]);

//   // Generate unique animation class name to avoid conflicts
//   const animationId = `shirt-animation-${productId}-${Date.now()}`;

//   // Calculate the final price based on selected color and size
//   const calculateFinalPrice = () => {
//     if (sizeColor?.colorwithsize && selectedColor && selectedSize) {
//       const selectedProduct = sizeColor.colorwithsize[selectedColor]?.find(
//         (item) => item.size === selectedSize
//       );
//       return selectedProduct
//         ? parseFloat(selectedProduct.price)
//         : selectedPrice || discountPrice || price || 0;
//     }
//     return selectedPrice || discountPrice || price || 0;
//   };

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

//   const handleAddToCart = () => {
//     const existingProductType =
//       state.cart.length > 0 ? state.cart[0].productType : null;

//     if (existingProductType && existingProductType !== productType) {
//       toast.error(
//         `You cannot add ${productType} products to the cart with ${existingProductType} products.`
//       );
//       return;
//     }

//     // Start animation sequence
//     setIsAnimating(true);

//     // Start shirt animation after cart centers
//     setTimeout(() => {
//       setShowShirt(true);
//     }, 400);

//     setTimeout(() => {
//       handleCartAmountChange(1);
//       setIsAnimating(false);
//       setShowShirt(false);
//       toast.success(
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <FaShoppingCart style={{ marginRight: "10px" }} />
//           Added to cart successfully!
//         </div>
//       );
//     }, 2000);
//   };

//   return (
//     <Styledbutton>
//       {/* CSS Keyframe Animation */}
//       <style>
//         {`
//     .animating-button, 
//     .animating-button svg,
//     .animating-button path {
//       color: white !important;
//       fill: white !important;
//     }  
//     .animating-button {
//       background-color: #E94560 !important; /* Match your primary color */
//       opacity: 1 !important;
//     }
    
//     .animating-button:disabled {
//       background-color: #E94560 !important; /* Match your primary color */
//       opacity: 1 !important;
//       cursor: not-allowed !important;
//     }
    
//     @keyframes ${animationId} {
//       0% {
//         top: 50%;
//         transform: translate(-50%, -50%) scale(1);
//         opacity: 1;
//       }
//       30% {
//         top: -25px;
//         transform: translate(-50%, -50%) scale(1.2);
//         opacity: 1;
//       }
//       60% {
//         top: -30px;
//         transform: translate(-50%, -50%) scale(1.1);
//         opacity: 1;
//       }
//       85% {
//         top: 40%;
//         transform: translate(-50%, -50%) scale(0.8);
//         opacity: 1;
//       }
//       100% {
//         top: 50%;
//         transform: translate(-50%, -50%) scale(0.2);
//         opacity: 0;
//       }
//     }
//   `}
//       </style>

//       {!cartItem ? (
//         <div style={{ position: "relative", display: "inline-block" }}>
//           <Button
//             mb="36px"
//             size="small"
//             color="primary"
//             variant="contained"
//             onClick={handleAddToCart}
//             disabled={isAnimating}
//             className={isAnimating ? "animating-button" : ""}
//             style={{
//               position: "relative",
//               overflow: "visible",
//               minWidth: "140px",
//               transition: "all 0.4s ease",
//               backgroundColor: "#E94560 !important",
//             }}
//           >
//             {/* Default state - white cart icon + text */}
//             <span
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 opacity: isAnimating ? 0 : 1,
//                 transform: isAnimating ? "translateX(-20px)" : "translateX(0)",
//                 transition: "all 0.4s ease",
//                 color: "white !important",
//               }}
//             >
//               <FaShoppingCart style={{ color: "white !important" }} />
//               <span style={{ color: "white !important" }}>Add to Cart</span>
//             </span>

//             {/* Animated cart icon - white */}
//             <span
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: isAnimating
//                   ? "translate(-50%, -50%) scale(1.3)"
//                   : "translate(-50%, -50%) scale(0)",
//                 opacity: isAnimating ? 1 : 0,
//                 transition: "all 0.5s ease",
//                 zIndex: 2,
//               }}
//             >
//               <FaShoppingCart
//                 style={{
//                   color: "white !important",
//                   fontSize: "18px",
//                 }}
//               />
//             </span>

//             {/* Animated shirt icon - black */}
//             {showShirt && (
//               <span
//                 style={{
//                   position: "absolute",
//                   left: "50%",
//                   top: "50%",
//                   zIndex: 3,
//                   animation: `${animationId} 1.2s ease-in-out forwards`,
//                   color: "black !important",
//                 }}
//               >
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   style={{
//                     color: "black",
//                     fill: "black !important",
//                     stroke: "none !important",
//                   }}
//                 >
//                   <path
//                     d="M16,4H15V2A2,2 0 0,0 13,0H11A2,2 0 0,0 9,2V4H8L6,7V11H5V24H19V11H18V7L16,4M11,2H13V4H11V2M16,9H8V7.4L8.8,6H15.2L16,7.4V9M17,11H7V22H17V11Z"
//                     style={{
//                       fill: "black",
//                       stroke: "none",
//                     }}
//                   />
//                 </svg>
//               </span>
//             )}
//           </Button>
//         </div>
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

//           <input
//             className="no-spin-button"
//             type="number"
//             value={cartItem.qty}
//             min={1}
//             onChange={(e) => handleInputChange(e, cartItem)}
//             style={{
//               textDecoration: "none",
//               borderRadius: "30px",
//               scrollBehavior: "unset",
//               border: "1px solid #E94560",
//               padding: "8px",
//               width: "60px",
//               textAlign: "center",
//             }}
//           />

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
