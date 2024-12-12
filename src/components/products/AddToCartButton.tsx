"use client";

import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState,useEffect  } from "react";
//import { toast } from "react-toastify";  // <-- Import the toast functionality
import {Styledbutton} from "./style";
import ApiBaseUrl from "api/ApiBaseUrl";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

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

const AddToCartButton = ({
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
  attributes
}: AddToCartButtonProps) => {
  const { state, dispatch } = useAppContext();

  const uniqueKey =
    dummySizes.length === 0
      ? `${productId}-${selectedSpec}`
      : `${selectedSize}-${selectedColor}-${selectedSpec}-${productId}`;

  const cartItem = state.cart.find(item => item.id === uniqueKey);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.qty : 1);



  useEffect(() => {
    const itemInCart = state.cart.find(item => item.id === uniqueKey);
    if (itemInCart) {
      setQuantity(itemInCart.qty);
    }
  }, [state.cart, uniqueKey]);

  const getB2BPrice = (quantity, b2bPricing) => {
    const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
    applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
    return applicablePricing.length > 0 ? applicablePricing[0].price : null;
  };

  const handleCartAmountChange = async(amount) => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }
   
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
          productStock: productStock,
          id: uniqueKey,
          discountPrice,
          slug,
          productId,
          sellerId,
          b2bPricing: selectedSizeColorOption.b2bPricing,
          productType,
          attributes,
          total_amount: finalPrice*amount
          
        },
      });
  }


  // Newly Added 
  const handleAddToCart = () => {
    if (state.cart.length > 0) {
      const existingProductType = state.cart[0].productType;
 
      if (existingProductType !== productType) {
       alert(
          `You can only add ${existingProductType === 'abroad' ? 'abroad' : 'general'} products to the cart.`
        );
        return;
      }
    }
    
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
          productStock: productStock,
          id: uniqueKey,
          discountPrice,
          slug,
          productId,
          sellerId,
          b2bPricing: [],
          productType,
          attributes
        },
      });
      //console.log("defaultPrice");
      toast.success("Added to cart successfully!");
      return;
    }
  
    if (!selectedSize && !selectedColor && !selectedSpec) {
      alert("Please select size, color, and variant before adding to cart.");
      return;
    }

    // toast.success(`${title} has been added to the cart!`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: true,
    // });
  };
  

  const handleQuantityInputChange = (e) => {
    const newQuantity = Math.min(productStock, Math.max(1, parseInt(e.target.value)));
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

          <Styledbutton>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            className="no-spin-button"
            style={{
              width: "50px",
              textAlign: "center",
              margin: "0 10px",
              borderRadius: "4px",
              padding: "8px",
              border: "1px solid #E94560"
            }}
            min="1"
          />
          </Styledbutton>

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

