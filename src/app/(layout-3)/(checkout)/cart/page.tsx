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
import axios from "@lib/axiosClient";
import { AxiosError } from "axios";

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

 const handleCheckout = async () => {
  sessionStorage.removeItem("address");
  setIsLoading(true);

  if (!isLoggedIn) {
   setIsLoading(false);
   await new Promise((resolve) => setTimeout(resolve, 300));
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
   const response = await axios.post(`checkout/check/pricing`, {
    orders: selectedItems,
   });

   if (!response.data.success) {
    toast.error(response.data.message || "Failed to check pricing");
    return;
   }

   const data = response.data?.products;

   // Update full cart prices
   const updatedCart = state.cart.map((item) => {
    const updatedItem = data.find((d: any) => d.product_id === item.productId);
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

   dispatch({ type: "SET_CART", payload: updatedCart });

   const updatedSelectedItems = updatedCart.filter((item) =>
    state.selectedProducts.includes(item.id)
   );

   localStorage.setItem("seller_type", response.data?.seller_type || "");
   localStorage.setItem("cart", JSON.stringify(updatedCart));
   sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
   sessionStorage.setItem(
    "selectedProducts",
    JSON.stringify(updatedSelectedItems)
   );
   router.push("/checkout");
  } catch (error: unknown) {
   if (error instanceof AxiosError) {
    toast.error(
     error.response.data?.message || "Price check failed. Please try again."
    );
   } else {
    toast.error("Price check failed. Please try again.");
   }
  } finally {
   setIsLoading(false);
  }
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
           <DeleteIcon style={{ marginRight: "8px", fontSize: "18px" }} />
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
       <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
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
