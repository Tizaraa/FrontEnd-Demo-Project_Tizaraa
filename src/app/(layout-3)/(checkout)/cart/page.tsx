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
import Watermark from "@component/watermark/Watermark";
import axios from "@lib/axiosClient";
import { AxiosError } from "axios";
import styled from "styled-components";
import { ListingEmpty } from "@component/listing/Listing";

const CartBar = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 margin-bottom: 16px;
 padding: 12px 16px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .cb-select {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .cb-count {
  font-weight: 400;
  color: ${({ theme }) => theme.tz.color.slate};
 }
`;

// Sticky on desktop so the total and the checkout button stay in view
const SummaryColumn = styled.div`
 position: sticky;
 top: 96px;
 display: flex;
 flex-direction: column;
 gap: 16px;

 @media (max-width: 1024px) {
  position: static;
 }
`;

const Panel = styled.section`
 padding: 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .panel-title {
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .promo-row {
  display: flex;
  gap: 8px;
 }

 .promo-input {
  flex: 1;
  min-width: 0;
  height: 44px;
  padding: 0 12px;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;

  &:focus {
   outline: none;
   border-color: ${({ theme }) => theme.tz.color.ember};
   box-shadow: ${({ theme }) => theme.tz.focusRing};
  }
 }

 .promo-apply {
  height: 44px;
  padding: 0 20px;
  border: 0;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: ${({ theme }) => theme.tz.color.navy};
  color: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
 }

 .promo-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 4px 6px 4px 12px;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 13px;
  font-weight: 600;

  button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 22px;
   height: 22px;
   border: 0;
   border-radius: 50%;
   background: transparent;
   color: inherit;
   font-size: 16px;
   line-height: 1;
   cursor: pointer;
  }
 }

 .sum-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }

 .sum-label {
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .sum-total {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
`;

export default function Cart() {
 const { state, dispatch } = useAppContext();
 const [selectAll, setSelectAll] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const router = useRouter();

 const [sellerType, setSellerType] = useState("");
 const isCorporate = sellerType.toLowerCase() === "corporate";
 const [promoCode, setPromoCode] = useState("");
 const [appliedPromoCode, setAppliedPromoCode] = useState("");
 const [promoDiscount, setPromoDiscount] = useState(0);
 const [isFreeShipping, setIsFreeShipping] = useState(false);

 useEffect(() => {
  setSellerType(localStorage.getItem("seller_type") || "");

  const storedPromoCode = sessionStorage.getItem("promoCode") || "";
  const storedDiscount = parseFloat(sessionStorage.getItem("discount") || "0");
  if (storedPromoCode && storedDiscount > 0) {
   setAppliedPromoCode(storedPromoCode);
   setPromoDiscount(storedDiscount);
   setIsFreeShipping(sessionStorage.getItem("isFreeShipping") === "1");
  }
 }, []);

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
     const newDiscountPrice = updatedItem.discount_price
      ? parseFloat(updatedItem.discount_price)
      : null;
     const effectivePrice = newDiscountPrice ?? newPrice;
     if ((item.discountPrice ?? item.price) !== effectivePrice) {
      toast(`Price updated for "${item.name}" to BDT ${effectivePrice}`);
     }
     return {
      ...item,
      price: newPrice,
      discountPrice: newDiscountPrice,
     };
    }
    return item;
   });

   dispatch({ type: "SET_CART", payload: updatedCart });

   const updatedSelectedItems = updatedCart.filter((item) =>
    state.selectedProducts.includes(item.id)
   );

   localStorage.setItem("seller_type", response.data?.seller_type || "");
   if (response.data?.shop_slug) {
    localStorage.setItem("shop_slug", response.data.shop_slug);
   }
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

 const applyPromoCode = async () => {
  if (!promoCode) {
   toast.error("Please enter a promo code!");
   return;
  }

  const selectedItems = state.cart.filter((item) =>
   state.selectedProducts.includes(item.id)
  );

  if (!selectedItems.length) {
   toast.error("Please select products first");
   return;
  }

  const requestBody = {
   code: promoCode,
   products: selectedItems.map((item) => {
    const price = item.discountPrice ?? item.price;
    return {
     price,
     qty: item.qty,
     total_amount: price * item.qty,
     name: item.name,
     imgUrl: item.imgUrl,
     productStock: item.productStock,
     id: item.id,
     discountPrice: item.discountPrice,
     slug: item.slug,
     productId: item.productId,
     sellerId: item.sellerId,
     productType: item.productType || "General",
    };
   }),
  };

  try {
   const response = await axios.post("promo/apply", requestBody);
   const data = response.data;

   toast.success(data.message);
   const discountValue = parseFloat(data.discount);
   const freeShipping = !!data.free_shipping;

   setPromoDiscount(discountValue);
   setIsFreeShipping(freeShipping);
   setAppliedPromoCode(promoCode);

   sessionStorage.setItem("discount", discountValue.toString());
   sessionStorage.setItem("promoCode", promoCode);
   sessionStorage.setItem("isFreeShipping", freeShipping ? "1" : "0");
  } catch (error: unknown) {
   const message =
    error instanceof AxiosError
     ? error.response?.data?.message || "Invalid promo code."
     : "Invalid promo code.";
   toast.error(message);

   setPromoDiscount(0);
   setIsFreeShipping(false);
   setAppliedPromoCode("");
   sessionStorage.setItem("discount", "0");
   sessionStorage.setItem("promoCode", "");
   sessionStorage.setItem("isFreeShipping", "0");
  }
 };

 const removeAppliedPromo = () => {
  setAppliedPromoCode("");
  setPromoDiscount(0);
  setIsFreeShipping(false);
  setPromoCode("");
  sessionStorage.setItem("discount", "0");
  sessionStorage.setItem("promoCode", "");
  sessionStorage.setItem("isFreeShipping", "0");
 };

 const totalPrice = getTotalPrice();

 return (
  <>
   <Watermark offsetY="-25%" />
   <main style={{ position: "relative", background: "none" }}>
    {state.cart.length === 0 ? (
     <ListingEmpty
      title="Your cart is empty"
      message="Products you add to your cart will show up here."
     >
      <Link href="/">
       <Button variant="contained" color="primary" mt="12px">
        Continue shopping
       </Button>
      </Link>
     </ListingEmpty>
    ) : (
    <Grid container spacing={6}>
     <Grid item lg={8} md={8} xs={12}>
      <CartBar>
       <div className="cb-select">
        <CheckBox
         checked={selectAll}
         onChange={handleSelectAll}
         label="Select all"
        />
        <span className="cb-count">
         ({state.selectedProducts.length}/{state.cart.length})
        </span>
       </div>
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
         <BeatLoader size={10} color="currentColor" />
        ) : (
         <>
          <DeleteIcon style={{ marginRight: "6px", fontSize: "18px" }} />
          Remove selected
         </>
        )}
       </Button>
      </CartBar>

      {state.cart.map((item) => (
       <ProductCard7
        key={item.id}
        id={item.id}
        qty={item.qty}
        slug={item.slug}
        name={item.name}
        price={item.price}
        imgUrl={
         item.imgUrl?.startsWith("http")
          ? item.imgUrl
          : item.imgUrl
          ? `${ApiBaseUrl.ImgUrl}${item.imgUrl}`
          : ""
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
      <SummaryColumn>
       {isCorporate && (
        <Panel>
         <h2 className="panel-title">Promo code</h2>
         <div className="promo-row">
          <input
           type="text"
           className="promo-input"
           aria-label="Promo code"
           placeholder="Enter promo code (e.g. CORP10)"
           value={promoCode}
           onChange={(e) => setPromoCode(e.target.value)}
          />
          <button type="button" className="promo-apply" onClick={applyPromoCode}>
           Apply
          </button>
         </div>

         {appliedPromoCode && (
          <span className="promo-chip">
           {appliedPromoCode}
           {isFreeShipping && " · Free shipping"}
           <button
            type="button"
            aria-label="Remove promo code"
            onClick={removeAppliedPromo}
           >
            &times;
           </button>
          </span>
         )}
        </Panel>
       )}

       <Panel>
        <h2 className="panel-title">Order summary</h2>
        <div className="sum-row">
         <span className="sum-label">Total</span>
         <span className="sum-total">{currency(totalPrice)}</span>
        </div>
        <Button
         variant="contained"
         color="primary"
         size="large"
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
          <BeatLoader size={10} color="currentColor" />
         ) : (
          "Proceed to checkout"
         )}
        </Button>
       </Panel>
      </SummaryColumn>
     </Grid>
    </Grid>
    )}
   </main>
  </>
 );
}
