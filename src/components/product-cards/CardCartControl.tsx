"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAppContext } from "@context/app-context";
import authService from "services/authService";

// Add-to-cart for a listing card: stock line, "Add" button, then a − qty + stepper.
// Writes the same cart line as the product page's AddToCartButton (same id and
// payload), so the quantity stays in sync between the card and the product page.
// Min/max order limits are enforced again by the cart reducer.

type CardCartControlProps = {
 productId: string | number;
 sellerId?: string | number;
 slug: string;
 title: string;
 imgUrl: string;
 price: number; // unit price the buyer pays
 discountPrice?: number;
 productStock: number;
 minOrderQty?: number;
 maxOrderQty?: number | null;
 hasVariants?: boolean;
};

const Wrap = styled.div`
 display: flex;
 flex-direction: column;
 gap: 8px;
 margin-top: 4px;

 .cc-stock {
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  font-variant-numeric: tabular-nums;
 }
 .cc-stock.is-out {
  color: #c0262d;
 }

 .cc-add,
 .cc-opt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  width: 100%;
  border-radius: 10px;
  border: 0;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 150ms ease;
 }
 .cc-add {
  background: ${({ theme }) => theme.tz.color.ember};
  color: #fff;
  &:hover:not(:disabled) {
   background: ${({ theme }) => theme.tz.color.emberDeep};
  }
  &:disabled {
   background: ${({ theme }) => theme.tz.color.line};
   color: ${({ theme }) => theme.tz.color.slate};
   cursor: not-allowed;
  }
 }
 .cc-opt {
  border: 1px solid ${({ theme }) => theme.tz.color.ember};
  background: transparent;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 .cc-step {
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  align-items: center;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 10px;
  overflow: hidden;

  button {
   height: 100%;
   border: 0;
   background: ${({ theme }) => theme.tz.color.emberTint};
   color: ${({ theme }) => theme.tz.color.emberDeep};
   font-size: 18px;
   font-weight: 700;
   cursor: pointer;
   &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
   }
  }
  output {
   text-align: center;
   font-weight: 700;
   font-variant-numeric: tabular-nums;
  }
 }

 .cc-add:focus-visible,
 .cc-opt:focus-visible,
 .cc-step button:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

export default function CardCartControl({
 productId,
 sellerId,
 slug,
 title,
 imgUrl,
 price,
 discountPrice,
 productStock,
 minOrderQty,
 maxOrderQty,
 hasVariants,
}: CardCartControlProps) {
 const { state, dispatch } = useAppContext();
 const router = useRouter();

 // Same key the product page uses for a product without a variant
 const lineId = `${productId}-default-default-default`;
 const cartItem = state.cart.find((item) => item.id === lineId);

 const stock = Math.max(0, Number(productStock) || 0);
 const minQty = Math.max(1, Number(minOrderQty ?? 1) || 1);
 const maxQty = maxOrderQty === null || maxOrderQty === undefined ? null : Math.max(minQty, Number(maxOrderQty));
 const ceiling = maxQty === null ? stock : Math.min(maxQty, stock);
 const isOut = stock <= 0 || stock < minQty;

 const setQty = (qty: number) => {
  if (qty > stock) {
   toast.error("Out of Stock");
   return;
  }
  if (maxQty !== null && qty > maxQty) {
   toast.error(`Maximum order quantity is ${maxQty}.`);
   return;
  }
  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: {
    price,
    qty,
    name: title,
    imgUrl,
    productStock: stock,
    minOrderQty: minQty,
    maxOrderQty: maxQty,
    id: lineId,
    discountPrice,
    slug,
    productId,
    variantId: "",
    sellerId,
    productType: "General",
    total_amount: price * qty,
    sizeColor: null,
    selectedColor: null,
    selectedSpecification: null,
    selectedSize: null,
   },
  });
 };

 const add = () => {
  if (!authService.isAuthenticated()) {
   sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
   toast.error("Login required to add to cart.");
   router.push("/login");
   return;
  }
  const existingType = state.cart.length > 0 ? state.cart[0].productType : null;
  if (existingType && existingType !== "General") {
   toast.error(`You cannot add General products with ${existingType} products in the cart.`);
   return;
  }
  setQty(minQty);
  toast.success("Added to cart");
 };

 const stockLine = (
  <span className={isOut ? "cc-stock is-out" : "cc-stock"}>
   {isOut ? "Stock out" : `${stock} in stock`}
  </span>
 );

 // A size/colour has to be picked on the product page first
 if (hasVariants) {
  return (
   <Wrap>
    {stockLine}
    <Link href={`/product/${slug}`} className="cc-opt">
     Choose options
    </Link>
   </Wrap>
  );
 }

 return (
  <Wrap>
   {stockLine}
   {cartItem ? (
    <div className="cc-step" role="group" aria-label={`Quantity of ${title}`}>
     {/* going below the minimum removes the line, like the cart page */}
     <button type="button" aria-label="Decrease quantity" onClick={() => setQty(cartItem.qty - 1 < minQty ? 0 : cartItem.qty - 1)}>
      −
     </button>
     <output aria-live="polite">{cartItem.qty}</output>
     <button type="button" aria-label="Increase quantity" disabled={cartItem.qty >= ceiling} onClick={() => setQty(cartItem.qty + 1)}>
      +
     </button>
    </div>
   ) : (
    <button type="button" className="cc-add" disabled={isOut} onClick={add}>
     {isOut ? "Stock out" : "Add to cart"}
    </button>
   )}
  </Wrap>
 );
}
