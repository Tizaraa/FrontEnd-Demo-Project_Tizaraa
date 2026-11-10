"use client";

import { useState, useEffect } from "react";
import tz from "../../theme/tizaraa";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";
import Box from "@component/Box";
import { useAppContext } from "@context/app-context";

interface SelectedProduct {
 productId: number;
 name: string;
 price: number;
 qty: number;
 imgUrl: string;
 total_amount: number;
 shopname?: string;
 shopimage?: string;
 brand?: string;
 delivereyType?: string;
 sizeColor?: any;
 discountPrice?: number;
 selectedColor?: string;
 selectedSize?: string;
}

export default function OrderedItem() {
 const { state } = useAppContext();
 const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
  []
 );

 const syncProducts = async () => {
  const cartItems = state.cart;
  const selectedItems = JSON.parse(
   sessionStorage.getItem("selectedProducts") || "[]"
  );

  // Update selected items with quantities from cart and keep only those present in the cart
  const updatedSelectedProducts = [];

  for (const item of selectedItems) {
   const cartItem = cartItems.find(
    (cartItem: SelectedProduct) => cartItem.productId === item.productId
   );

   if (cartItem) {
    // const productDetails = await fetchProductDetails(item.productId);

    updatedSelectedProducts.push({
     ...item,
     qty: cartItem.qty,
     total_amount: cartItem.price * cartItem.qty,
     //  ...productDetails,
    });
   }
  }

  // Update sessionStorage and state
  sessionStorage.setItem(
   "selectedProducts",
   JSON.stringify(updatedSelectedProducts)
  );
  setSelectedProducts(updatedSelectedProducts);
 };

 useEffect(() => {
  syncProducts();
 }, [state.cart]);

 const imgOf = (product: SelectedProduct) =>
  product.imgUrl
   ? product.imgUrl.startsWith("http") || product.imgUrl.startsWith(ApiBaseUrl.ImgUrl)
     ? product.imgUrl
     : `${ApiBaseUrl.ImgUrl}${product.imgUrl}`
   : "/placeholder.svg";

 return (
  <section className="co-card co-items" aria-label="Your items">
   <h3 className="co-card-title">
    <span className="co-card-icon" aria-hidden="true">
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
     </svg>
    </span>
    Your items
    <span className="co-pill">{selectedProducts.length}</span>
   </h3>
   {selectedProducts.length > 0 ? (
    <ul className="co-item-list">
     {selectedProducts.map((product) => {
      const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;
      const unitPrice = hasDiscount ? (product.discountPrice as number) : product.price ?? 0;
      const lineTotal = unitPrice * product.qty;
      const chips = [
       product.selectedColor && `Color: ${product.selectedColor}`,
       product.selectedSize && `Size: ${product.selectedSize}`,
       product.delivereyType && `Delivery: ${product.delivereyType}`,
      ].filter(Boolean) as string[];
      return (
       <li key={product.productId} className="co-item">
        <span className="co-item-img">
         <Image src={imgOf(product)} alt={product.name} width={60} height={60} style={{ objectFit: "cover" }} />
         {product.qty > 1 && <b>×{product.qty}</b>}
        </span>
        <div className="co-item-info">
         <strong>{product.name}</strong>
         <small>
          Qty {product.qty} ·{" "}
          {hasDiscount && <del>BDT {product.price.toLocaleString()}</del>} BDT {unitPrice.toLocaleString()} each
         </small>
         {product.shopname && (
          <small>
           Shop: {product.shopname}
           {product.brand ? ` (${product.brand})` : ""}
          </small>
         )}
         {chips.length > 0 && (
          <span className="co-chips">
           {chips.map((c) => (
            <span key={c}>{c}</span>
           ))}
          </span>
         )}
        </div>
        <span className="co-item-total">
         BDT{" "}
         {lineTotal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
         })}
        </span>
       </li>
      );
     })}
    </ul>
   ) : (
    <p className="co-muted">No items in the cart.</p>
   )}
  </section>
 );
}
