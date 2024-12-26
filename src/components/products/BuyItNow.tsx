"use client";

import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { useAppContext } from "@context/app-context";
import { useRouter } from "next/navigation"; // Use for navigation
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import toast, { Toaster } from "react-hot-toast";

type SizeColorOption = {
  size: string;
  color: string;
  price: number;
  b2bPricing: { min_qty: number; price: number }[];
  stock_quantity: number;
};

type BuyItNowProps = {
  productId: string | number;
  sellerId: string | number;
  images: string[];
  title: string;
  discountPrice?: number;
  productStock: number;
  price?: number;
  slug?: string;
  selectedSize: string | null;
  selectedColor: string | null;
  selectedSpec: string | null;
  dummySizes: SizeColorOption[];
  productType?: string;
  attributes?: string;
};

const BuyItNow = ({
  productId,
  sellerId,
  images,
  title,
  discountPrice,
  price,
  productStock,
  slug,
  selectedSize,
  selectedColor,
  selectedSpec,
  dummySizes,
  productType,
  attributes,
}: BuyItNowProps) => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const uniqueKey =
    dummySizes.length === 0
      ? `${productId}-${selectedSpec}`
      : `${selectedSize}-${selectedColor}-${selectedSpec}-${productId}`;

  const cartItem = state.cart.find((item) => item.id === uniqueKey);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.qty : 1);
  
  const updateBuyNowItem = (buyNowItem, dispatch) => {
    // Your logic to update the "Buy Now" item in the context or localStorage
    dispatch({
      type: "SET_BUY_NOW_ITEM",
    payload: buyNowItem,
    });
  };
  

  useEffect(() => {
    const itemInCart = state.cart.find((item) => item.id === uniqueKey);
    if (itemInCart) {
      setQuantity(itemInCart.qty);
    }
  }, [state.cart, uniqueKey]);

  const getB2BPrice = (quantity, b2bPricing) => {
    const applicablePricing = b2bPricing.filter((b) => quantity >= b.min_qty);
    applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
    return applicablePricing.length > 0 ? applicablePricing[0].price : null;
  };

  const handleCartAmountChange = (amount) => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }

    const selectedSizeColorOption =
      dummySizes.length === 0
        ? { price: discountPrice || price || 0, b2bPricing: [] }
        : dummySizes.find(
            (item) =>
              item.size === selectedSize && item.color === selectedColor
          );

    if (!selectedSizeColorOption) {
      alert("Selected size and color option is not available.");
      return;
    }

    const finalPrice =
      getB2BPrice(amount, selectedSizeColorOption.b2bPricing) ||
      selectedSizeColorOption.price;

    setQuantity(amount);

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: finalPrice,
        qty: amount,
        name: title,
        imgUrl: images[0],
        productStock: productStock,
        id: uniqueKey,
        discountPrice,
        slug,
        productId,
        sellerId,
        b2bPricing: selectedSizeColorOption.b2bPricing,
        productType,
        attributes,
        total_amount: finalPrice * amount,
      },
    });
  };

  const handleAddToCart = () => {
    if (state.cart.length > 0) {
      const existingProductType = state.cart[0].productType;

      if (existingProductType !== productType) {
        alert(
          `You can only add ${
            existingProductType === "abroad" ? "abroad" : "general"
          } products to the cart.`
        );
        return;
      }
    }

    handleCartAmountChange(1);
    toast.success("Added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (state.cart.length > 0) {
      const existingProductType = state.cart[0].productType;
  
      if (existingProductType !== productType) {
        alert(
          `You can only add ${existingProductType === "abroad" ? "abroad" : "general"} products to the cart.`
        );
        return;
      }
    }
  
    if (!selectedSize && !selectedColor && !selectedSpec && dummySizes.length) {
      alert("Please select size, color, and variant before buying.");
      return;
    }
  
    const finalPrice =
      dummySizes.length === 0
        ? discountPrice || price
        : dummySizes.find(
            (item) =>
              item.size === selectedSize && item.color === selectedColor
          )?.price || 0;
  
    // Create the payload to store in both localStorage and appContext
    const buyNowPayload = {
      price: finalPrice,
      qty: 1,
      name: title,
      imgUrl: images[0],
      productStock: productStock,
      id: uniqueKey,
      discountPrice,
      slug,
      productId,
      sellerId,
      productType,
      attributes,
      total_amount: finalPrice * 1,
    };
  
    // Call the updateBuyNowItem function here
    updateBuyNowItem(buyNowPayload, dispatch); // Update Buy Now Item in localStorage and appContext
  
    // Optionally, navigate to the checkout page or cart
    router.push("/cart");
  
    toast.success("Added to cart and ready to checkout!");
  };
  
  

  const handleQuantityInputChange = (e) => {
    const newQuantity = Math.min(
      productStock,
      Math.max(1, parseInt(e.target.value))
    );
    setQuantity(newQuantity);
    handleCartAmountChange(newQuantity);
  };

  return (
    <>
      <Button
        onClick={handleBuyNow}
        style={{
          backgroundColor: "rgba(97,219,247,1)",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buy Now
      </Button>
   
    </>
  );
};

export default BuyItNow;
