"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";
import Box from "@component/Box";

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
 const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
  []
 );

 const authtoken = authService.getToken();
 const fetchProductDetails = async (productId: number) => {
  try {
   const response = await fetch(
    `https://frontend.tizaraa.shop/api/cart/product/info/${productId}`,
    {
     headers: {
      Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
     },
    }
   );
   const data = await response.json();
   // console.log(data)

   return {
    shopname: data.shopname,
    shopimage: data.shopimage,
    brand: data.brand,
    delivereyType: data.delivereyType,
   };
  } catch (error) {
   console.error("Failed to fetch product details:", error);
   return {};
  }
 };

 const syncProducts = async () => {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
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
    const productDetails = await fetchProductDetails(item.productId);

    updatedSelectedProducts.push({
     ...item,
     qty: cartItem.qty,
     total_amount: cartItem.price * cartItem.qty,
     ...productDetails,
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
  // Initial load
  syncProducts();

  // Listen for localStorage changes
  const handleStorageChange = (event: StorageEvent) => {
   if (event.key === "cart") {
    syncProducts();
   }
  };

  // Listen for cart updates
  window.addEventListener("storage", handleStorageChange);

  // Workaround for same-tab updates (Next.js does not detect `storage` changes in the same tab)
  const interval = setInterval(() => {
  //  syncProducts();
  }, 1000); // Check every second

  return () => {
   window.removeEventListener("storage", handleStorageChange);
   clearInterval(interval);
  };
 }, []);

 return (
  <div
   style={{
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
   }}
  >
   {selectedProducts.length > 0 ? (
    selectedProducts.map((product) => (
     <div
      key={product.productId}
      style={{
       display: "flex",
       alignItems: "center",
       padding: "16px",
       borderBottom: "1px solid #eee",
       gap: "16px",
      }}
     >
      <div
       style={{
        width: "48px",
        height: "48px",
        backgroundColor: "#f1f1f1",
        borderRadius: "4px",
        overflow: "hidden",
       }}
      >
       <Image
        src={
         product.imgUrl
          ? product.imgUrl.startsWith("http") ||
            product.imgUrl.startsWith(ApiBaseUrl.ImgUrl)
            ? product.imgUrl
            : `${ApiBaseUrl.ImgUrl}${product.imgUrl}`
          : "/placeholder.svg"
        }
        alt={product.name}
        width={48}
        height={48}
        style={{ objectFit: "cover" }}
       />
      </div>
      <div style={{ flex: 1 }}>
       <h3
        style={{
         margin: 0,
         fontSize: "16px",
         fontWeight: 500,
        }}
       >
        {product.name}
       </h3>
       <p
        style={{
         margin: "4px 0 0 0",
         fontSize: "14px",
         color: "#666",
        }}
       >
        Quantity: {product.qty}
       </p>
       {product.shopname && (
        <p
         style={{
          margin: "4px 0 0 0",
          fontSize: "14px",
          color: "#333",
         }}
        >
         Shop: {product.shopname} ({product.brand})
        </p>
       )}
       {product.delivereyType && (
        <p
         style={{
          margin: "4px 0 0 0",
          fontSize: "14px",
          color: "#666",
         }}
        >
         Delivery: {product.delivereyType}
        </p>
       )}

       <Box display="flex">
        {product.selectedColor && (
         <p
          style={{
           margin: "4px 8px 0 0", // Added right margin for spacing
           fontSize: "14px",
           color: "#666",
          }}
         >
          Color: {product.selectedColor}
         </p>
        )}
        {product.selectedSize && (
         <p
          style={{
           margin: "4px 0 0 0",
           fontSize: "14px",
           color: "#666",
          }}
         >
          Size: {product.selectedSize}
         </p>
        )}
       </Box>
      </div>
      {/* <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              BDT {product.price.toLocaleString()}
            </div> */}
      <div
       style={{
        fontSize: "16px",
        fontWeight: 500,
       }}
      >
       BDT{" "}
       {(product.sizeColor?.nosize?.length === 0 && product.discountPrice
        ? product.discountPrice
        : product.price
       ).toLocaleString()}
      </div>
     </div>
    ))
   ) : (
    <p>No items in the cart.</p>
   )}
  </div>
 );
}
