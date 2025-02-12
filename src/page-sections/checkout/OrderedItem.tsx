// // "use client";

// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import ApiBaseUrl from "api/ApiBaseUrl";

// // interface SelectedProduct {
// //   productId: number;
// //   name: string;
// //   price: number;
// //   qty: number;
// //   imgUrl: string;
// //   total_amount: number;
// // }

// // export default function OrderedItem() {
// //   const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

// //   const syncProducts = () => {
// //     const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
// //     const selectedItems = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

// //     // Keep only items that exist in the cart
// //     const updatedSelectedProducts = selectedItems.filter((item: SelectedProduct) =>
// //       cartItems.some((cartItem: SelectedProduct) => cartItem.productId === item.productId)
// //     );

// //     // Update sessionStorage and state
// //     sessionStorage.setItem("selectedProducts", JSON.stringify(updatedSelectedProducts));
// //     setSelectedProducts(updatedSelectedProducts);
// //   };

// //   useEffect(() => {
// //     // Initial load
// //     syncProducts();

// //     // Listen for localStorage changes
// //     const handleStorageChange = (event: StorageEvent) => {
// //       if (event.key === "cart") {
// //         syncProducts();
// //       }
// //     };

// //     // Listen for cart updates
// //     window.addEventListener("storage", handleStorageChange);

// //     // Workaround for same-tab updates (Next.js does not detect `storage` changes in the same tab)
// //     const interval = setInterval(() => {
// //       syncProducts();
// //     }, 1000); // Check every second

// //     return () => {
// //       window.removeEventListener("storage", handleStorageChange);
// //       clearInterval(interval);
// //     };
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         padding: "20px",
// //         backgroundColor: "white",
// //         borderRadius: "8px",
// //         boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //       }}
// //     >
// //       {selectedProducts.length > 0 ? (
// //         selectedProducts.map((product) => (
// //           <div
// //             key={product.productId}
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               padding: "16px",
// //               borderBottom: "1px solid #eee",
// //               gap: "16px",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: "48px",
// //                 height: "48px",
// //                 backgroundColor: "#f1f1f1",
// //                 borderRadius: "4px",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <Image
// //                 src={product.imgUrl ? `${ApiBaseUrl.ImgUrl}${product.imgUrl}` : "/placeholder.svg"}
// //                 alt={product.name}
// //                 width={48}
// //                 height={48}
// //                 style={{ objectFit: "cover" }}
// //               />
// //             </div>
// //             <div style={{ flex: 1 }}>
// //               <h3
// //                 style={{
// //                   margin: 0,
// //                   fontSize: "16px",
// //                   fontWeight: 500,
// //                 }}
// //               >
// //                 {product.name}
// //               </h3>
// //               <p
// //                 style={{
// //                   margin: "4px 0 0 0",
// //                   fontSize: "14px",
// //                   color: "#666",
// //                 }}
// //               >
// //                 Quantity: {product.qty}
// //               </p>
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "16px",
// //                 fontWeight: 500,
// //               }}
// //             >
// //               BDT {product.total_amount.toLocaleString()}
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No items in the cart.</p>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import ApiBaseUrl from "api/ApiBaseUrl";

// interface SelectedProduct {
//   productId: number;
//   name: string;
//   price: number;
//   qty: number;
//   imgUrl: string;
//   total_amount: number;
// }

// export default function OrderedItem() {
//   const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

//   const syncProducts = () => {
//     const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
//     const selectedItems = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

//     // Update selected items with quantities from cart and keep only those present in the cart
//     const updatedSelectedProducts = selectedItems.map((item: SelectedProduct) => {
//       const cartItem = cartItems.find((cartItem: SelectedProduct) => cartItem.productId === item.productId);
      
//       if (cartItem) {
//         return {
//           ...item,
//           qty: cartItem.qty, // Use the qty from the cart
//           total_amount: cartItem.price * cartItem.qty, // Calculate total amount based on cart quantity
//         };
//       }
//       return item;
//     }).filter((item: SelectedProduct) =>
//       cartItems.some((cartItem: SelectedProduct) => cartItem.productId === item.productId)
//     );

//     // Update sessionStorage and state
//     sessionStorage.setItem("selectedProducts", JSON.stringify(updatedSelectedProducts));
//     setSelectedProducts(updatedSelectedProducts);
//   };

//   useEffect(() => {
//     // Initial load
//     syncProducts();

//     // Listen for localStorage changes
//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === "cart") {
//         syncProducts();
//       }
//     };

//     // Listen for cart updates
//     window.addEventListener("storage", handleStorageChange);

//     // Workaround for same-tab updates (Next.js does not detect `storage` changes in the same tab)
//     const interval = setInterval(() => {
//       syncProducts();
//     }, 1000); // Check every second

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "white",
//         borderRadius: "8px",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//       }}
//     >
//       {selectedProducts.length > 0 ? (
//         selectedProducts.map((product) => (
          // <div
          //   key={product.productId}
          //   style={{
          //     display: "flex",
          //     alignItems: "center",
          //     padding: "16px",
          //     borderBottom: "1px solid #eee",
          //     gap: "16px",
          //   }}
          // >
          //   <div
          //     style={{
          //       width: "48px",
          //       height: "48px",
          //       backgroundColor: "#f1f1f1",
          //       borderRadius: "4px",
          //       overflow: "hidden",
          //     }}
          //   >
          //     <Image
          //       src={product.imgUrl ? `${ApiBaseUrl.ImgUrl}${product.imgUrl}` : "/placeholder.svg"}
          //       alt={product.name}
          //       width={48}
          //       height={48}
          //       style={{ objectFit: "cover" }}
          //     />
          //   </div>
          //   <div style={{ flex: 1 }}>
          //     <h3
          //       style={{
          //         margin: 0,
          //         fontSize: "16px",
          //         fontWeight: 500,
          //       }}
          //     >
          //       {product.name}
          //     </h3>
          //     <p
          //       style={{
          //         margin: "4px 0 0 0",
          //         fontSize: "14px",
          //         color: "#666",
          //       }}
          //     >
          //       Quantity: {product.qty}
          //     </p>
          //   </div>
//             <div
//               style={{
//                 fontSize: "16px",
//                 fontWeight: 500,
//               }}
//             >
//               BDT {product.total_amount.toLocaleString()}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
//import "react-toastify/dist/ReactToastify.css";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { Button } from "@component/buttons";
import CheckBox from "@component/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import BeatLoader from "react-spinners/BeatLoader";
import authService from "services/authService";
import { useRouter } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";


import Image from "next/image";
import NextImage from "@component/NextImage";
import ProductCard22 from "@component/product-cards/ProductCard22";

export default function OrderedItem() {
  const { state, dispatch } = useAppContext();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  useEffect(() => {
    setSelectAll(
      state.cart.length > 0 &&
      state.cart.every((item) => state.selectedProducts.includes(item.id))
    );
  }, [state.cart, state.selectedProducts]);
  
  if (!state.buyNowItem) {
    return null; // Or some other fallback
  }
  

  return (
    <>
     <main
    style={{
      position: "relative",
      background: "none",
    }}
  >

    <Fragment>
    
        
          {state.cart.map((item) => (
            <ProductCard22
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug}
              name={item.name}
              price={item.price}
              imgUrl={
                item.productType === "Abroad"
                  ? item.imgUrl 
                  : `${ApiBaseUrl.ImgUrl}${item.imgUrl}` 
              }
              productStock={item.productStock}
              discountPrice={item.discountPrice}
              productId={item.productId}
              sellerId={item.sellerId}
              b2bPricing={item.b2bPricing}
              total_amount={item.total_amount}
            />
          ))}
    
    
      <style jsx>{`
        .delete-button {
          transition: all 0.3s ease;
        }
        .delete-button.deleting {
          opacity: 0.5;
          pointer-events: none;
        }
        .delete-button:hover {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </Fragment>
  </main>
    </>
  );
}