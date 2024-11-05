"use client";

import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState } from "react";
import { toast } from "react-toastify";  // <-- Import the toast functionality

type SizeColorOption = {
  size: string;
  color: string;
  price: number;
  b2bPricing: { min_qty: number; price: number }[];
  stock_quantity: number;
};

type AddToCartButtonProps = {
  productId: string | number;
  sellerId: string | number;
  images: string[];
  title: string;
  discountPrice?: number;
  price?: number;
  slug?: string;
  selectedSize: string | null;
  selectedColor: string | null;
  selectedSpec: string | null;
  dummySizes: SizeColorOption[];
};

const AddToCartButton = ({
  productId,
  sellerId,
  images,
  title,
  discountPrice,
  price,
  slug,
  selectedSize,
  selectedColor,
  selectedSpec,
  dummySizes,
}: AddToCartButtonProps) => {
  const { state, dispatch } = useAppContext();

  const uniqueKey =
    dummySizes.length === 0
      ? `${productId}-${selectedSpec}`
      : `${selectedSize}-${selectedColor}-${selectedSpec}-${productId}`;

  const cartItem = state.cart.find(item => item.id === uniqueKey);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.qty : 1);

  const getB2BPrice = (quantity, b2bPricing) => {
    const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
    applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
    return applicablePricing.length > 0 ? applicablePricing[0].price : null;
  };

  const handleCartAmountChange = (amount) => {
    const selectedSizeColorOption =
      dummySizes.length === 0
        ? { price: discountPrice || price || 0, b2bPricing: [] }
        : dummySizes.find(item => item.size === selectedSize && item.color === selectedColor);

    if (!selectedSizeColorOption) {
      alert("Selected size and color option is not available.");
      return;
    }

    const finalPrice = getB2BPrice(amount, selectedSizeColorOption.b2bPricing) || selectedSizeColorOption.price;

    setQuantity(amount);

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: finalPrice,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: uniqueKey,
        discountPrice,
        slug,
        productId,
        sellerId,
        b2bPricing: selectedSizeColorOption.b2bPricing,
      },
    });
  };

  const handleAddToCart = () => {
    handleCartAmountChange(1);

    if (dummySizes.length === 0) {
      const defaultPrice = discountPrice || price;
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          price: defaultPrice,
          qty: 1,
          name: title,
          imgUrl: images[0],
          id: uniqueKey,
          discountPrice,
          slug,
          productId,
          sellerId,
          b2bPricing: [],
        },
      });

      // Show success toast
    //   toast.success(`${title} has been added to the cart!`, {
    //     position: "top-right", // Position of the toast
    //     autoClose: 3000, // Auto close after 3 seconds
    //     hideProgressBar: true, // Hide the progress bar
    //   });
    toast.success("Added to cart successfully!");
      return;
    }

    if (!selectedSize && !selectedColor && !selectedSpec) {
      alert("Please select size, color, and variant before adding to cart.");
      return;
    }

    // Show success toast when item is added to cart
    toast.success(`${title} has been added to the cart!`, {
      position: "top-right", // Position of the toast
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: true, // Hide the progress bar
    });
  };

  const handleQuantityInputChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value));
    setQuantity(newQuantity);
    handleCartAmountChange(newQuantity);
  };

  return (
    <>
      {!cartItem ? (
        <Button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#E94560',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
        >
          Add to Cart
        </Button>
      ) : (
        <FlexBox alignItems="center" mb="36px">
          <Button
            p="9px"
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleCartAmountChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Icon variant="small">minus</Icon>
          </Button>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            style={{
              width: "50px",
              textAlign: "center",
              margin: "0 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "5px",
            }}
            min="1"
          />

          <Button
            p="9px"
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleCartAmountChange(quantity + 1)}
          >
            <Icon variant="small">plus</Icon>
          </Button>
        </FlexBox>
      )}
    </>
  );
};

export default AddToCartButton;
