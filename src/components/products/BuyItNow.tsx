// import { Button } from "@component/buttons";

// import { useAppContext } from "@context/app-context";
// import {  useRouter} from "next/navigation";

// type BuyItNowProps = {
//     productId: string | number;
//     sellerId: string | number;
//     images: string[];
//     title: string;
//     discountPrice?: number;
//     productStock: number;
//     price?: number;
//     slug?: string;
//     selectedSize: string | null;
//     selectedColor: string | null;
//     selectedSpec: string | null;
//     dummySizes: SizeColorOption[];
//     productType?: string;
//     attributes?: string; 
//   };


// const BuyItNow = ({
//   productId,
//   sellerId,
//   images,
//   title,
//   discountPrice,
//   price,
//   productStock,
//   slug,
//   selectedSize,
//   selectedColor,
//   selectedSpec,
//   dummySizes,
//   productType,
//   attributes
// }: BuyItNowProps) => {
//   const { state, dispatch } = useAppContext();
//   const router = useRouter();

//   const uniqueKey =
//     dummySizes.length === 0
//       ? `${productId}-${selectedSpec}`
//       : `${selectedSize}-${selectedColor}-${selectedSpec}-${productId}`;

//       const handleBuyNow = () => {
//         // Check product type compatibility with existing cart items
//         if (state.cart.length > 0) {
//           const existingProductType = state.cart[0].productType;
//           if (existingProductType !== productType) {
//             alert(
//               `You can only buy ${existingProductType === "abroad" ? "abroad" : "general"} products in this cart.`
//             );
//             return;
//           }
//         }
      
//         // Ensure selected options are valid for products with dummy sizes
//         if (dummySizes.length > 0 && (!selectedSize || !selectedColor || !selectedSpec)) {
//           alert("Please select size, color, and variant before proceeding.");
//           return;
//         }
      
//         // Retrieve the selected size/color option or default pricing
//         const selectedSizeColorOption =
//           dummySizes.length === 0
//             ? { price: discountPrice || price || 0, b2bPricing: [] }
//             : dummySizes.find(
//                 item => item.size === selectedSize && item.color === selectedColor
//               );
      
//         if (!selectedSizeColorOption) {
//           alert("Selected size and color option is not available.");
//           return;
//         }
      
//         const finalPrice = selectedSizeColorOption.price || discountPrice || price || 0;
      
//         // Dispatch the Buy Now action to set buyNowItem in state
//         dispatch({
//           type: "SET_BUY_NOW_ITEM",
//           payload: {
//             price: finalPrice,
//             qty: 1,
//             name: title,
//             imgUrl: images[0],
//             productStock,
//             id: uniqueKey,
//             discountPrice,
//             slug,
//             productId,
//             sellerId,
//             b2bPricing: selectedSizeColorOption.b2bPricing,
//             productType,
//             attributes,
//           },
//         });
      
//         // Redirect to the checkout page for Buy Now
//         router.push("/cart");
//       };
  

//   return (
//     <Button
//       onClick={handleBuyNow}
//       style={{
//         backgroundColor: "#E94560",
//         color: "white",
//         padding: "10px 20px",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         transition: "background-color 0.3s",
//       }}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.backgroundColor = "#D32F2F")
//       }
//       onMouseLeave={(e) =>
//         (e.currentTarget.style.backgroundColor = "#E94560")
//       }
//     >
//       Buy Now
//     </Button>
//   );
// };

// export default BuyItNow;
