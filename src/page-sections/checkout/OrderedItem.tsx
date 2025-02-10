"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";

interface SelectedProduct {
  productId: number;
  name: string;
  price: number;
  qty: number;
  imgUrl: string;
  total_amount: number;
}

export default function OrderedItem() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const syncProducts = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItems = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");

    // Keep only items that exist in the cart
    const updatedSelectedProducts = selectedItems.filter((item: SelectedProduct) =>
      cartItems.some((cartItem: SelectedProduct) => cartItem.productId === item.productId)
    );

    // Update sessionStorage and state
    sessionStorage.setItem("selectedProducts", JSON.stringify(updatedSelectedProducts));
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
      syncProducts();
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
                src={product.imgUrl ? `${ApiBaseUrl.ImgUrl}${product.imgUrl}` : "/placeholder.svg"}
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
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              BDT {product.total_amount.toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
}
