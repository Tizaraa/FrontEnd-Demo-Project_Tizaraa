// "use client";
// import Link from "next/link";
// import { Fragment, useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// //import "react-toastify/dist/ReactToastify.css";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import { ProductCard7 } from "@component/product-cards";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { Button } from "@component/buttons";
// import CheckBox from "@component/CheckBox";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BeatLoader from "react-spinners/BeatLoader";
// import authService from "services/authService";
// import { useRouter } from "next/navigation";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import Image from "next/image";
// import NextImage from "@component/NextImage";

// export default function Cart() {
//   const { state, dispatch } = useAppContext();
//   const [checkoutSuccess, setCheckoutSuccess] = useState(false);
//   const [checkoutError, setCheckoutError] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>(
//     []
//   );
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsLoggedIn(authService.isAuthenticated());
//   }, []);

//   useEffect(() => {
//     setSelectAll(
//       state.cart.length > 0 &&
//         state.cart.every((item) => state.selectedProducts.includes(item.id))
//     );
//   }, [state.cart, state.selectedProducts]);

//   if (!state.buyNowItem) {
//     return null; // Or some other fallback
//   }

//   const handleSelectAll = () => {
//     if (selectAll) {
//       dispatch({ type: "DESELECT_ALL_PRODUCTS" });
//     } else {
//       dispatch({ type: "SELECT_ALL_PRODUCTS" });
//     }
//   };

//   const handleDeleteSelected = async () => {
//     setIsDeleting(true);

//     try {
//       // Simulate async operation (e.g., API call) with setTimeout
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       state.selectedProducts.forEach((productId) => {
//         dispatch({
//           type: "CHANGE_CART_AMOUNT",
//           payload: { id: productId, qty: 0 },
//         });
//       });

//       localStorage.removeItem("orderId");
//       sessionStorage.removeItem("selectedProducts");
//       sessionStorage.removeItem("cartItems");
//       localStorage.removeItem("cart");
//       sessionStorage.removeItem("paymentMethod");
//       sessionStorage.removeItem("savedTotalPrice");
//       sessionStorage.removeItem("savedTotalWithDelivery");

//       dispatch({ type: "DESELECT_ALL_PRODUCTS" });

//       toast.success("Selected items deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete selected items");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // const getTotalPrice = () => {
//   //   return state.cart.reduce((accumulator, item) => {
//   //     if (state.selectedProducts.includes(item.id)) {
//   //       return (
//   //         accumulator +
//   //         (item.discountPrice ? item.discountPrice : item.price) * item.qty
//   //       );
//   //     }
//   //     return accumulator;
//   //   }, 0);
//   // };
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

//   // const handleCheckout = async () => {
//   //   setIsLoading(true); // Show loading spinner immediately when the button is clicked

//   //   if (!isLoggedIn) {
//   //     // Redirect to login page if not logged in
//   //     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
//   //     router.push("/login");
//   //     return; // Exit function, no need to reset loading here
//   //   }

//   //   const selectedItems = state.cart.filter((item) =>
//   //     state.selectedProducts.includes(item.id)
//   //   );

//   //   if (selectedItems.length === 0) {
//   //     toast.error("Please select products to checkout");
//   //     setIsLoading(false); // Reset loading state if no products are selected
//   //     return;
//   //   }

//   //   const checkoutData = JSON.stringify(selectedItems);
//   //   sessionStorage.setItem("selectedProducts", checkoutData);

//   //   const totalPrice = getTotalPrice();

//   //   if (totalPrice === 0) {
//   //     toast.error("Total price is 0. Please add items to your cart.");
//   //     setIsLoading(false); // Reset loading state if total price is 0
//   //     return;
//   //   }

//   //   const isError = selectedItems.some(item => item.qty <= 0);
//   //   if (isError) {
//   //     setCheckoutError(true);
//   //     setIsLoading(false); // Reset loading state if there's an error
//   //     return;
//   //   }

//   //   await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
//   //   router.push("/checkout"); // Redirect to checkout page
//   // };

//   const handleCheckout = async () => {
//     setIsLoading(true);

//     if (!isLoggedIn) {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       router.push("/login");
//       return;
//     }

//     const selectedItems = state.cart.filter((item) =>
//       state.selectedProducts.includes(item.id)
//     );

//     if (selectedItems.length === 0) {
//       toast.error("Please select products to checkout");
//       setIsLoading(false);
//       return;
//     }

//     // Check for minimum order value for Abroad products
//     const hasAbroadProducts = selectedItems.some(
//       (item) => item.productType === "Abroad"
//     );
//     const totalPrice = getTotalPrice();

//     if (hasAbroadProducts && totalPrice < 1000) {
//       toast.error(
//         <div>
//           Minimum Order value <strong style={{ color: "#E94560" }}>BDT 1000</strong> for international products
//         </div>,
//         {
//           position: "top-center",
//         }
//       );
//       setIsLoading(false);
//       return;
//     }

//     if (totalPrice === 0) {
//       toast.error("Total price is 0. Please add items to your cart.");
//       setIsLoading(false);
//       return;
//     }

//     const isError = selectedItems.some((item) => item.qty <= 0);
//     if (isError) {
//       setCheckoutError(true);
//       setIsLoading(false);
//       return;
//     }

//     const checkoutData = JSON.stringify(selectedItems);
//     sessionStorage.setItem("selectedProducts", checkoutData);

//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     router.push("/checkout");
//   };

//   useEffect(() => {
//     if (checkoutSuccess) {
//       toast.success("Checkout successfully!");
//       setCheckoutSuccess(false);
//     }
//   }, [checkoutSuccess]);

//   useEffect(() => {
//     if (checkoutError) {
//       toast.error("Checkout Failed");
//       setCheckoutError(false);
//     }
//   }, [checkoutError]);

//   const totalPrice = getTotalPrice();

//   return (
//     <>
//       {/* Background image */}
//       <NextImage
//         alt="newArrivalBanner"
//         src={tizaraa_watermark}
//         priority
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -25%)",
//           width: "100%", // Set to 100% to ensure full responsiveness
//           height: "auto", // Maintain aspect ratio
//           maxWidth: "1200px", // Optional: Limit the maximum width
//           backgroundSize: "contain", // Adjust the scaling behavior
//           backgroundPosition: "center",
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <main
//         style={{
//           position: "relative",
//           background: "none",
//         }}
//       >
//         <Fragment>
//           <Grid container spacing={6}>
//             <Grid item lg={8} md={8} xs={12}>
//               <Card1 mb="1.5rem">
//                 <FlexBox alignItems="center" justifyContent="space-between">
//                   <FlexBox alignItems="center">
//                     <CheckBox checked={selectAll} onChange={handleSelectAll} />
//                     <Typography ml="0.5rem">Select All</Typography>
//                   </FlexBox>
//                   <Button
//                     size="small"
//                     color="primary"
//                     variant="outlined"
//                     disabled={
//                       state.selectedProducts.length === 0 ||
//                       state.cart.length === 0 ||
//                       totalPrice === 0 ||
//                       isDeleting
//                     }
//                     onClick={handleDeleteSelected}
//                     className={`delete-button ${isDeleting ? "deleting" : ""}`}
//                   >
//                     {isDeleting ? (
//                       <BeatLoader size={18} color="#E94560" />
//                     ) : (
//                       <>
//                         <DeleteIcon
//                           style={{ marginRight: "8px", fontSize: "18px" }}
//                         />{" "}
//                         Remove All
//                       </>
//                     )}
//                   </Button>
//                 </FlexBox>
//               </Card1>
//               {state.cart.map((item) => (
//                 <ProductCard7
//                   mb="1.5rem"
//                   id={item.id}
//                   key={item.id}
//                   qty={item.qty}
//                   slug={item.slug}
//                   name={item.name}
//                   price={item.price}
//                   // imgUrl={item.imgUrl}
//                   imgUrl={
//                     item.productType === "Abroad"
//                       ? item.imgUrl
//                       : `${ApiBaseUrl.ImgUrl}${item.imgUrl}`
//                   }
//                   productStock={item.productStock}
//                   discountPrice={item.discountPrice}
//                   productId={item.productId}
//                   sellerId={item.sellerId}
//                   b2bPricing={item.b2bPricing}
//                   total_amount={item.total_amount}
//                   sizeColor={item.sizeColor}
//                   selectedSize={item.selectedSize}
//                   selectedColor={item.selectedColor}
//                 />
//               ))}
//             </Grid>

//             <Grid item lg={4} md={4} xs={12}>
//               <Card1>
//                 <FlexBox
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb="1rem"
//                 >
//                   <Typography color="gray.600">Total:</Typography>
//                   <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//                     {currency(totalPrice)}
//                   </Typography>
//                 </FlexBox>

//                 <Divider mb="1rem" />

//                 {/* <Link href="/checkout" passHref> */}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullwidth
//                   onClick={handleCheckout}
//                   disabled={
//                     isLoading ||
//                     state.selectedProducts.length === 0 ||
//                     state.cart.length === 0 ||
//                     totalPrice === 0
//                   }
//                 >
//                   {isLoading ? (
//                     <BeatLoader size={18} color="#E94560" />
//                   ) : (
//                     "PROCEED TO CHECKOUT"
//                   )}
//                 </Button>
//                 {/* </Link> */}
//               </Card1>
//             </Grid>
//           </Grid>
//           <style jsx>{`
//             .delete-button {
//               transition: all 0.3s ease;
//             }
//             .delete-button.deleting {
//               opacity: 0.5;
//               pointer-events: none;
//             }
//             .delete-button:hover {
//               background-color: #f44336;
//               color: white;
//             }
//           `}</style>
//         </Fragment>
//       </main>
//     </>
//   );
// }

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import { ProductCard7 } from "@component/product-cards";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { Button } from "@component/buttons";
// import CheckBox from "@component/CheckBox";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BeatLoader from "react-spinners/BeatLoader";
// import authService from "services/authService";
// import { useRouter } from "next/navigation";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import NextImage from "@component/NextImage";
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";

// export default function Cart() {
//   const { state, dispatch } = useAppContext();
//   const [selectAll, setSelectAll] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => setIsLoggedIn(authService.isAuthenticated()), []);

//   useEffect(() => {
//     setSelectAll(
//       state.cart.length > 0 &&
//         state.cart.every((item) => state.selectedProducts.includes(item.id))
//     );
//   }, [state.cart, state.selectedProducts]);

//   // ===== SELECT / DESELECT ALL =====
//   const handleSelectAll = () => {
//     if (selectAll) dispatch({ type: "DESELECT_ALL_PRODUCTS" });
//     else dispatch({ type: "SELECT_ALL_PRODUCTS" });
//   };

//   // ===== DELETE SELECTED =====
//   const handleDeleteSelected = async () => {
//     setIsDeleting(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       state.selectedProducts.forEach((id) => {
//         dispatch({ type: "CHANGE_CART_AMOUNT", payload: { id, qty: 0 } });
//       });

//       localStorage.removeItem("orderId");
//       sessionStorage.removeItem("selectedProducts");
//       sessionStorage.removeItem("cartItems");
//       localStorage.removeItem("cart");
//       sessionStorage.removeItem("paymentMethod");
//       sessionStorage.removeItem("savedTotalPrice");
//       sessionStorage.removeItem("savedTotalWithDelivery");

//       dispatch({ type: "DESELECT_ALL_PRODUCTS" });
//       toast.success("Selected items deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete selected items");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // ===== TOTAL PRICE =====
//   const getTotalPrice = () =>
//     state.cart.reduce((acc, item) => {
//       if (state.selectedProducts.includes(item.id)) {
//         const price = item.discountPrice ?? item.price;
//         return acc + price * item.qty;
//       }
//       return acc;
//     }, 0);

//   // ===== CHECKOUT =====
//   const handleCheckout = async () => {
//     setIsLoading(true);

//     if (!isLoggedIn) {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       router.push("/login");
//       return;
//     }

//     const selectedItems = state.cart.filter((item) =>
//       state.selectedProducts.includes(item.id)
//     );

//     if (!selectedItems.length) {
//       toast.error("Please select products to checkout");
//       setIsLoading(false);
//       return;
//     }

//     const totalPrice = getTotalPrice();
//     if (totalPrice === 0) {
//       toast.error("Total price is 0. Please add items to your cart.");
//       setIsLoading(false);
//       return;
//     }

//     const isError = selectedItems.some((item) => item.qty <= 0);
//     if (isError) {
//       setIsLoading(false);
//       return;
//     }

//     // ===== PRICE CHECK API =====
//     try {
//       const response = await fetch(
//         "https://frontend.tizaraa.shop/api/checkout/check/pricing",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authService.getToken()}`,
//           },
//           body: JSON.stringify({ orders: state.cart }), // full cart
//         }
//       );

//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`Price check failed: ${text}`);
//       }

//       const data = await response.json();

//       // Update full cart prices
//       const updatedCart = state.cart.map((item) => {
//         const updatedItem = data.find(
//           (d: any) => d.product_id === item.productId
//         );
//         if (updatedItem) {
//           const newPrice = parseFloat(updatedItem.price);
//           if (item.price !== newPrice) {
//             toast(`Price updated for "${item.name}" to BDT ${newPrice}`);
//           }
//           return {
//             ...item,
//             price: newPrice,
//             discountPrice: item.discountPrice ? newPrice : null,
//           };
//         }
//         return item;
//       });

//       // Save to localStorage & sessionStorage
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       sessionStorage.setItem(
//         "selectedProducts",
//         JSON.stringify(state.selectedProducts)
//       );
//       // const checkoutData = JSON.stringify(selectedItems);
//       // sessionStorage.setItem("selectedProducts", checkoutData);

//       // Update app state
//       dispatch({ type: "SET_CART", payload: updatedCart });
//     } catch (error: any) {
//       console.error("Price check failed:", error);
//       toast.error("Price check failed. Please try again.");
//       setIsLoading(false);
//       return;
//     }

//     router.push("/checkout");
//   };

//   const totalPrice = getTotalPrice();

//   return (
//     <>
//       <NextImage
//         alt="watermark"
//         src={tizaraa_watermark}
//         priority
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -25%)",
//           width: "100%",
//           height: "auto",
//           maxWidth: "1200px",
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />
//       <main style={{ position: "relative", background: "none" }}>
//         <Grid container spacing={6}>
//           <Grid item lg={8} md={8} xs={12}>
//             <Card1 mb="1.5rem">
//               <FlexBox alignItems="center" justifyContent="space-between">
//                 <FlexBox alignItems="center">
//                   <CheckBox checked={selectAll} onChange={handleSelectAll} />
//                   <Typography ml="0.5rem">Select All</Typography>
//                 </FlexBox>
//                 <Button
//                   size="small"
//                   color="primary"
//                   variant="outlined"
//                   disabled={
//                     state.selectedProducts.length === 0 ||
//                     state.cart.length === 0 ||
//                     totalPrice === 0 ||
//                     isDeleting
//                   }
//                   onClick={handleDeleteSelected}
//                 >
//                   {isDeleting ? (
//                     <BeatLoader size={18} color="#E94560" />
//                   ) : (
//                     <>
//                       <DeleteIcon
//                         style={{ marginRight: "8px", fontSize: "18px" }}
//                       />
//                       Remove All
//                     </>
//                   )}
//                 </Button>
//               </FlexBox>
//             </Card1>

//             {state.cart.map((item) => (
//               <ProductCard7
//                 key={item.id}
//                 id={item.id}
//                 qty={item.qty}
//                 slug={item.slug}
//                 name={item.name}
//                 price={item.price}
//                 imgUrl={
//                   item.productType === "Abroad"
//                     ? item.imgUrl
//                     : `${ApiBaseUrl.ImgUrl}${item.imgUrl}`
//                 }
//                 productStock={item.productStock}
//                 discountPrice={item.discountPrice}
//                 productId={item.productId}
//                 sellerId={item.sellerId}
//                 b2bPricing={item.b2bPricing}
//                 total_amount={item.total_amount}
//                 sizeColor={item.sizeColor}
//                 selectedSize={item.selectedSize}
//                 selectedColor={item.selectedColor}
//               />
//             ))}
//           </Grid>

//           <Grid item lg={4} md={4} xs={12}>
//             <Card1>
//               <FlexBox
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb="1rem"
//               >
//                 <Typography color="gray.600">Total:</Typography>
//                 <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//                   {currency(totalPrice)}
//                 </Typography>
//               </FlexBox>
//               <Divider mb="1rem" />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullwidth
//                 onClick={handleCheckout}
//                 disabled={
//                   isLoading ||
//                   state.selectedProducts.length === 0 ||
//                   state.cart.length === 0 ||
//                   totalPrice === 0
//                 }
//               >
//                 {isLoading ? (
//                   <BeatLoader size={18} color="#E94560" />
//                 ) : (
//                   "PROCEED TO CHECKOUT"
//                 )}
//               </Button>
//             </Card1>
//           </Grid>
//         </Grid>
//       </main>
//     </>
//   );
// }

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
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
import NextImage from "@component/NextImage";
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";

export default function Cart() {
  const { state, dispatch } = useAppContext();
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => setIsLoggedIn(authService.isAuthenticated()), []);

  useEffect(() => {
    setSelectAll(
      state.cart.length > 0 &&
        state.cart.every((item) => state.selectedProducts.includes(item.id))
    );
  }, [state.cart, state.selectedProducts]);

  // ===== SELECT / DESELECT ALL =====
  const handleSelectAll = () => {
    if (selectAll) dispatch({ type: "DESELECT_ALL_PRODUCTS" });
    else dispatch({ type: "SELECT_ALL_PRODUCTS" });
  };

  // ===== DELETE SELECTED =====
  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      state.selectedProducts.forEach((id) => {
        dispatch({ type: "CHANGE_CART_AMOUNT", payload: { id, qty: 0 } });
      });

      localStorage.removeItem("orderId");
      sessionStorage.removeItem("selectedProducts");
      sessionStorage.removeItem("cartItems");
      localStorage.removeItem("cart");
      sessionStorage.removeItem("paymentMethod");
      sessionStorage.removeItem("savedTotalPrice");
      sessionStorage.removeItem("savedTotalWithDelivery");

      dispatch({ type: "DESELECT_ALL_PRODUCTS" });
      toast.success("Selected items deleted successfully");
    } catch (error) {
      toast.error("Failed to delete selected items");
    } finally {
      setIsDeleting(false);
    }
  };

  // ===== TOTAL PRICE =====
  const getTotalPrice = () =>
    state.cart.reduce((acc, item) => {
      if (state.selectedProducts.includes(item.id)) {
        const price = item.discountPrice ?? item.price;
        return acc + price * item.qty;
      }
      return acc;
    }, 0);

  // ===== CHECKOUT =====
  const handleCheckout = async () => {
    setIsLoading(true);

    if (!isLoggedIn) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/login");
      return;
    }

    const selectedItems = state.cart.filter((item) =>
      state.selectedProducts.includes(item.id)
    );

    if (!selectedItems.length) {
      toast.error("Please select products to checkout");
      setIsLoading(false);
      return;
    }

    const totalPrice = getTotalPrice();
    if (totalPrice === 0) {
      toast.error("Total price is 0. Please add items to your cart.");
      setIsLoading(false);
      return;
    }

    const isError = selectedItems.some((item) => item.qty <= 0);
    if (isError) {
      setIsLoading(false);
      return;
    }

    // ===== PRICE CHECK API =====
    try {
      const response = await fetch(
        "https://frontend.tizaraa.shop/api/checkout/check/pricing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`,
          },
          body: JSON.stringify({ orders: state.cart }), // full cart
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Price check failed: ${text}`);
      }

      const data = await response.json();

      // Update full cart prices
      const updatedCart = state.cart.map((item) => {
        const updatedItem = data.find(
          (d: any) => d.product_id === item.productId
        );
        if (updatedItem) {
          const newPrice = parseFloat(updatedItem.price);
          if (item.price !== newPrice) {
            toast(`Price updated for "${item.name}" to BDT ${newPrice}`);
          }
          return {
            ...item,
            price: newPrice,
            discountPrice: item.discountPrice ? newPrice : null,
          };
        }
        return item;
      });

      // Update app state first
      dispatch({ type: "SET_CART", payload: updatedCart });

      // Get selected items with updated prices
      const updatedSelectedItems = updatedCart.filter((item) =>
        state.selectedProducts.includes(item.id)
      );

      // Save to localStorage & sessionStorage with updated prices
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart)); // This now has updated prices
      sessionStorage.setItem(
        "selectedProducts",
        JSON.stringify(updatedSelectedItems)
      ); // This also has updated prices
    } catch (error: any) {
      console.error("Price check failed:", error);
      toast.error("Price check failed. Please try again.");
      setIsLoading(false);
      return;
    }

    router.push("/checkout");
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      <NextImage
        alt="watermark"
        src={tizaraa_watermark}
        priority
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -25%)",
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <main style={{ position: "relative", background: "none" }}>
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} xs={12}>
            <Card1 mb="1.5rem">
              <FlexBox alignItems="center" justifyContent="space-between">
                <FlexBox alignItems="center">
                  <CheckBox checked={selectAll} onChange={handleSelectAll} />
                  <Typography ml="0.5rem">Select All</Typography>
                </FlexBox>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  disabled={
                    state.selectedProducts.length === 0 ||
                    state.cart.length === 0 ||
                    totalPrice === 0 ||
                    isDeleting
                  }
                  onClick={handleDeleteSelected}
                >
                  {isDeleting ? (
                    <BeatLoader size={18} color="#E94560" />
                  ) : (
                    <>
                      <DeleteIcon
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      Remove All
                    </>
                  )}
                </Button>
              </FlexBox>
            </Card1>

            {state.cart.map((item) => (
              <ProductCard7
                key={item.id}
                id={item.id}
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
                sizeColor={item.sizeColor}
                selectedSize={item.selectedSize}
                selectedColor={item.selectedColor}
              />
            ))}
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <Card1>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="1rem"
              >
                <Typography color="gray.600">Total:</Typography>
                <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                  {currency(totalPrice)}
                </Typography>
              </FlexBox>
              <Divider mb="1rem" />
              <Button
                variant="contained"
                color="primary"
                fullwidth
                onClick={handleCheckout}
                disabled={
                  isLoading ||
                  state.selectedProducts.length === 0 ||
                  state.cart.length === 0 ||
                  totalPrice === 0
                }
              >
                {isLoading ? (
                  <BeatLoader size={18} color="#E94560" />
                ) : (
                  "PROCEED TO CHECKOUT"
                )}
              </Button>
            </Card1>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
