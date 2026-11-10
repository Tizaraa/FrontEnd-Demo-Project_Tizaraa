"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { StyledMiniCart } from "./styles";
import authService from "services/authService";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import CheckBox from "@component/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import BeatLoader from "react-spinners/BeatLoader";
import ApiBaseUrl from "api/ApiBaseUrl";
import { FaTrashAlt } from "react-icons/fa";
import axios from "@lib/axiosClient";
import { AxiosError } from "axios";

type MiniCartProps = { toggleSidenav?: () => void };

export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
 const theme = useTheme();
 const { state, dispatch } = useAppContext();
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [selectAll, setSelectAll] = useState(false);
 const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>(
  []
 );
 const [isDeleting, setIsDeleting] = useState(false);
 const [loading, setLoading] = useState(false); // New loading state
 const [viewCartLoading, setViewCartLoading] = useState(false);
 const router = useRouter();
 const [visible, setVisible] = useState(true);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 // useEffect(() => {
 //   const allSelected = state.cart.length > 0 && state.cart.every(item => selectedProducts.includes(item.id));
 //   setSelectAll(allSelected);
 // }, [selectedProducts, state.cart]);

 useEffect(() => {
  setSelectAll(
   state.cart.length > 0 &&
    state.cart.every((item) => state.selectedProducts.includes(item.id))
  );
 }, [state.cart, state.selectedProducts]);

 const handleCartAmountChange = (amount: number, product: any) => () => {
  if (amount > product.productStock) {
   toast.error("Out of Stock");
   return;
  }
  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: { ...product, qty: amount },
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

 // const getTotalPrice = () => {
 //   return state.cart.reduce((accumulator, item) => {
 //     if (state.selectedProducts.includes(item.id)) {
 //       return (
 //         accumulator +
 //         (item.discountPrice ? item.discountPrice : item.price) * item.qty
 //       );
 //     }
 //     return accumulator;
 //   }, 0);
 // };
 const getTotalPrice = () => {
  return state.cart.reduce((accumulator, item) => {
   if (state.selectedProducts.includes(item.id)) {
    const price = item.discountPrice ?? item.price;
    return accumulator + price * item.qty;
   }
   return accumulator;
  }, 0);
 };

 // const handleCheckout = async () => {
 //   const selectedItems = state.cart.filter((item) =>
 //     state.selectedProducts.includes(item.id)
 //   );

 //   if (selectedItems.length === 0) {
 //     toast.error("Please select products to checkout");
 //     return;
 //   }

 //   setLoading(true);

 //   try {
 //     // Price Check API
 //     const response = await fetch(
 //       `${ApiBaseUrl.baseUrl}checkout/check/pricing`,
 //       {
 //         method: "POST",
 //         headers: {
 //           "Content-Type": "application/json",
 //           Authorization: `Bearer ${authService.getToken()}`,
 //         },
 //         body: JSON.stringify({ orders: state.cart }), // full cart
 //       }
 //     );

 //     if (!response.ok) {
 //       const text = await response.text();
 //       throw new Error(`Price check failed: ${text}`);
 //     }

 //     const data = await response.json();

 //     // Update cart prices
 //     const updatedCart = state.cart.map((item) => {
 //       const updatedItem = data.find(
 //         (d: any) => d.product_id === item.productId
 //       );
 //       if (updatedItem) {
 //         const newPrice = parseFloat(updatedItem.price);
 //         // if (item.price !== newPrice) {
 //         //   toast(`Price updated for "${item.name}" to BDT ${newPrice}`);
 //         // }
 //         return {
 //           ...item,
 //           price: newPrice,
 //           discountPrice: item.discountPrice ? newPrice : null,
 //         };
 //       }
 //       return item;
 //     });

 //     // Update app state first
 //     dispatch({ type: "SET_CART", payload: updatedCart });

 //     // Get selected items with updated prices
 //     const updatedSelectedItems = updatedCart.filter((item) =>
 //       state.selectedProducts.includes(item.id)
 //     );

 //     // Save updated cart & selected items with updated prices
 //     localStorage.setItem("cart", JSON.stringify(updatedCart));
 //     sessionStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Updated cart with new prices
 //     sessionStorage.setItem(
 //       "selectedProducts",
 //       JSON.stringify(updatedSelectedItems)
 //     ); // Updated selected items with new prices

 //     // Navigate
 //     if (!isLoggedIn) {
 //       setTimeout(() => {
 //         router.push("/login");
 //       }, 500);
 //     } else {
 //       setTimeout(() => {
 //         router.push("/checkout");
 //         toggleSidenav(); // optional: close mini cart
 //       }, 500);
 //     }
 //   } catch (error: any) {
 //     console.error("Price check failed:", error);
 //     toast.error("Price check failed. Please try again.");
 //   } finally {
 //     setLoading(false);
 //   }
 // };

 const handleCheckout = async () => {
  sessionStorage.removeItem("address");
  const selectedItems = state.cart.filter((item) =>
   state.selectedProducts.includes(item.id)
  );

  if (selectedItems.length === 0) {
   toast.error("Please select products to checkout");
   return;
  }

  // ✅ Check login first — no toast, no delay
  if (!isLoggedIn) {
   router.push("/login");
   return;
  }

  setLoading(true);

  try {
   // ✅ Price Check API only if logged in
   const response = await axios.post(
    `checkout/check/pricing`,
    { orders: selectedItems }
   );

   const data = await response.data?.products;
   if (response.data?.success) {
    // Update cart prices
    const updatedCart = state.cart.map((item) => {
     const updatedItem = data.find((d: any) => String(d.product_id) === String(item.productId));
     if (updatedItem) {
      const newPrice = parseFloat(updatedItem.price);
      const newDiscountPrice = updatedItem.discount_price
       ? parseFloat(updatedItem.discount_price)
       : null;
      return {
       ...item,
       price: newPrice,
       discountPrice: newDiscountPrice,
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

    // Save updated cart & selected items with updated prices
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

    // Navigate to checkout
    setTimeout(() => {
     router.refresh();
     router.push("/checkout");
     toggleSidenav();
    }, 500);
   } else {
    toast.error(response.data?.message || "Something went wrong");
   }
  } catch (error: unknown) {
   if (error instanceof AxiosError) {
    toast.error(
     error.response.data?.message || "Price check failed. Please try again."
    );
   } else {
    toast.error("Price check failed. Please try again.");
   }
  } finally {
   setLoading(false);
  }
 };

 const handleSelectAll = () => {
  if (selectAll) {
   dispatch({ type: "DESELECT_ALL_PRODUCTS" });
  } else {
   dispatch({ type: "SELECT_ALL_PRODUCTS" });
  }
 };

 const handleProductSelect = (productId: string | number) => {
  if (state.selectedProducts.includes(productId)) {
   dispatch({ type: "DESELECT_PRODUCT", payload: productId });
   const updatedProducts = state.selectedProducts.filter(
    (id) => id !== productId
   );
   const selectedItems = state.cart.filter((item) =>
    updatedProducts.includes(item.id)
   );
   sessionStorage.setItem("selectedProducts", JSON.stringify(selectedItems));
  } else {
   dispatch({ type: "SELECT_PRODUCT", payload: productId });
   const updatedProducts = [...state.selectedProducts, productId];
   const selectedItems = state.cart.filter((item) =>
    updatedProducts.includes(item.id)
   );
   sessionStorage.setItem("selectedProducts", JSON.stringify(selectedItems));
  }
 };

 const handleDeleteSelected = async () => {
  setIsDeleting(true);

  try {
   // Simulate async operation (e.g., API call) with setTimeout
   await new Promise((resolve) => setTimeout(resolve, 1000));

   state.selectedProducts.forEach((productId) => {
    dispatch({
     type: "CHANGE_CART_AMOUNT",
     payload: { id: productId, qty: 0 },
    });
   });

   localStorage.removeItem("orderId");
   sessionStorage.removeItem("selectedProducts");
   sessionStorage.removeItem("cartItems");
   localStorage.removeItem("cart");
   sessionStorage.removeItem("paymentMethod");
   sessionStorage.removeItem("savedTotalPrice");
   sessionStorage.removeItem("savedTotalWithDelivery");

   dispatch({ type: "DESELECT_ALL_PRODUCTS" });

   // toast.success("Selected items deleted successfully");
   toast.success(
    <div style={{ display: "flex", alignItems: "center" }}>
     <FaTrashAlt style={{ marginRight: "10px", color: "red" }} />
     Selected items deleted successfully
    </div>
   );
  } catch (error) {
   toast.error("Failed to delete selected items");
  } finally {
   setIsDeleting(false);
  }
 };

 const totalPrice = getTotalPrice();

 const handleViewCart = () => {
  setViewCartLoading(true); // Show the loading state

  // Delay the navigation to the cart page
  setTimeout(() => {
   router.push("/cart"); // Navigate to the cart page
   setViewCartLoading(false); // Optional: reset loading state after navigation
   toggleSidenav(); // Adjust the delay time as needed (e.g., 1000ms = 1 second)
  }, 1000);
 };
 const selectedCount = state.cart.filter((item) => state.selectedProducts.includes(item.id)).length;
 const imgOf = (item: any) =>
  item.imgUrl?.startsWith("http")
   ? item.imgUrl
   : item.imgUrl
   ? `${ApiBaseUrl.ImgUrl}${item.imgUrl}`
   : "/assets/images/products/iphone-xi.png";

 return (
  <StyledMiniCart>
   {/* Header */}
   <div className="mc-head">
    <span className="mc-head-icon" aria-hidden="true">
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
     </svg>
    </span>
    <h2>Your cart</h2>
    <span className="mc-count">
     {state.cart.length} item{state.cart.length !== 1 ? "s" : ""}
    </span>
    <button type="button" className="mc-close" aria-label="Close cart" onClick={toggleSidenav}>
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
     </svg>
    </button>
   </div>

   <div className={`cart-list ${state.cart.length === 0 ? "no-scroll" : ""}`}>
    {state.cart.length > 0 && (
     <div className="mc-bar">
      <label className="mc-all">
       <CheckBox checked={selectAll} onChange={handleSelectAll} />
       <span>
        Select all
        <small>
         {selectedCount} of {state.cart.length} selected
        </small>
       </span>
      </label>
      <button
       type="button"
       className="mc-remove"
       disabled={state.selectedProducts.length === 0 || state.cart.length === 0 || totalPrice === 0 || isDeleting}
       onClick={handleDeleteSelected}
      >
       {isDeleting ? (
        <BeatLoader size={8} color={theme.tz.tone.danger.fg} />
       ) : (
        <>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
         </svg>
         Remove selected
        </>
       )}
      </button>
     </div>
    )}

    {state.cart.length === 0 && (
     <div className="mc-empty">
      <span className="mc-empty-art" aria-hidden="true">
       <Image src="/assets/images/logos/shopping-bag.svg" width={70} height={70} alt="" />
      </span>
      <strong>Your cart is empty</strong>
      <p>Find something you like and add it here.</p>
      <Link href="/" className="mc-btn mc-btn--solid" onClick={toggleSidenav}>
       Start shopping
      </Link>
     </div>
    )}

    <ul className="mc-items">
     {state.cart.map((item, i) => {
      const picked = state.selectedProducts.includes(item.id);
      const unit = item.discountPrice ?? item.price;
      const variant = [
       item.selectedColor && `Color: ${item.selectedColor}`,
       item.selectedSize && `Size: ${item.selectedSize}`,
       item.selectedSpecification && `Spec: ${item.selectedSpecification}`,
      ].filter(Boolean) as string[];
      return (
       <li key={item.id} className={`cart-item${picked ? " is-picked" : ""}`} style={{ ["--i" as any]: i }}>
        <CheckBox checked={picked} onChange={() => handleProductSelect(item.id)} />
        <Link href={`/product/${item.slug}`} className="mc-thumb">
         <Image width={72} height={72} alt={item.name} src={imgOf(item)} />
        </Link>
        <div className="product-details">
         <Link href={`/product/${item.slug}`} className="title">
          {item.name}
         </Link>
         {variant.length > 0 && (
          <div className="mc-chips">
           {variant.map((v) => (
            <span key={v}>{v}</span>
           ))}
          </div>
         )}
         <div className="mc-unit">
          {item.discountPrice ? <del>{currency(item.price, 0)}</del> : null}
          {currency(unit, 0)} each
         </div>
         <div className="mc-row">
          <div className="mc-stepper" role="group" aria-label={`Quantity of ${item.name}`}>
           <button
            type="button"
            aria-label="Decrease quantity"
            onClick={handleCartAmountChange(item.qty - 1, item)}
            disabled={item.qty === 1}
           >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
             <path d="M5 12h14" />
            </svg>
           </button>
           <input
            className="no-spin-button"
            type="number"
            value={item.qty}
            min={1}
            aria-label="Quantity"
            onChange={(e) => handleInputChange(e, item)}
           />
           <button type="button" aria-label="Increase quantity" onClick={handleCartAmountChange(item.qty + 1, item)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
             <path d="M12 5v14M5 12h14" />
            </svg>
           </button>
          </div>
          <strong key={item.qty} className="mc-line">
           {currency(item.qty * unit)}
          </strong>
         </div>
        </div>
        <button type="button" className="mc-del" aria-label={`Remove ${item.name}`} onClick={handleCartAmountChange(0, item)}>
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
         </svg>
        </button>
       </li>
      );
     })}
    </ul>
   </div>

   {state.cart.length > 0 && (
    <div className="actions">
     <div className="mc-sum">
      <span>
       Subtotal
       <small>
        {selectedCount} selected
       </small>
      </span>
      <strong key={totalPrice}>{currency(totalPrice)}</strong>
     </div>
     <button
      type="button"
      className="mc-btn mc-btn--solid mc-btn--block"
      onClick={handleCheckout}
      disabled={state.selectedProducts.length === 0 || state.cart.length === 0 || totalPrice === 0 || loading}
     >
      {loading ? (
       <BeatLoader size={10} color="#fff" />
      ) : (
       <>
        Checkout · {currency(getTotalPrice())}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
       </>
      )}
     </button>
     <button type="button" className="mc-btn mc-btn--block" onClick={handleViewCart} disabled={viewCartLoading}>
      {viewCartLoading ? <BeatLoader size={10} color={theme.tz.color.ember} /> : "View cart"}
     </button>
     <p className="mc-secure">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
       <rect x="3" y="11" width="18" height="11" rx="2" />
       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Secure checkout
     </p>
    </div>
   )}
  </StyledMiniCart>
 );
}
