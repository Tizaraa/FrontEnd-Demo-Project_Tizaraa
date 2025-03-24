import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import toast from 'react-hot-toast';
import BeatLoader from "react-spinners/BeatLoader";
import { FaShoppingCart } from "react-icons/fa";

type AddToCartButtonProps = {
  productId: string | number;
  sellerId: string | number;
  images: string[];
  title: string;
  discountPrice?: number;
  price?: number;
  productStock: number;
  slug?: string;
  productType: string; 
  sizeColor?: {
    colorwithsize?: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
    size?: { size: string; price: string; qty: string }[];
    color?: { color: string; price: string; qty: string }[];
  };
  selectedColor?: string | null;
  selectedSize?: string | null;
  selectedPrice?: number;
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
  productType,
  sizeColor,
  selectedColor,
  selectedSize,
  selectedPrice,
}: AddToCartButtonProps) => {
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a unique key for the product variant
  const uniqueKey = `${productId}-${selectedColor || "default"}-${selectedSize || "default"}`;

  const cartItem = state.cart.find(item => item.id === uniqueKey);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.qty);
    }
  }, [cartItem]);

  // Calculate the final price based on selected color and size
  const calculateFinalPrice = () => {
    if (sizeColor?.colorwithsize && selectedColor && selectedSize) {
      const selectedProduct = sizeColor.colorwithsize[selectedColor]?.find(
        (item) => item.size === selectedSize
      );
      return selectedProduct ? parseFloat(selectedProduct.price) : selectedPrice || discountPrice || price || 0;
    }
    return selectedPrice || discountPrice || price || 0;
  };

  const handleCartAmountChange = (amount: number) => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }

    setQuantity(amount);

    const finalPrice = calculateFinalPrice();

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
        productType,
        total_amount: finalPrice * amount,
        sizeColor,
        selectedColor,
        selectedSize,
      },
    });
  };

  // const handleAddToCart = () => {
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     handleCartAmountChange(1);
  //     setIsLoading(false);
  //     toast.success("Added to cart successfully!");
  //   }, 1000); // Simulate API call delay
  // };

  // newly added 
  const handleAddToCart = () => {
    const existingProductType = state.cart.length > 0 ? state.cart[0].productType : null;
  
    if (existingProductType && existingProductType !== productType) {
      toast.error(`You cannot add ${productType} products to the cart with ${existingProductType} products.`);
      return;
    }
  
    setIsLoading(true);
  
    setTimeout(() => {
      handleCartAmountChange(1);
      setIsLoading(false);
      // toast.success("Added to cart successfully!");
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaShoppingCart style={{ marginRight: '10px' }} />
          Added to cart successfully!
        </div>
      );
    }, 1000); // Simulate API call delay
  };

  return (
    <>
      {!cartItem ? (
        <Button
          mb="36px"
          size="small"
          color="primary"
          variant="contained"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? <BeatLoader size={18} color="#fff" /> : 'Add to Cart'}
        </Button>
      ) : (
        <FlexBox alignItems="center" mb="36px">
          <Button
            p="9px"
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleCartAmountChange(cartItem.qty - 1)}
            disabled={cartItem.qty <= 1}
          >
            <Icon variant="small">minus</Icon>
          </Button>

          {/* <H3 fontWeight="600" mx="20px">
            {cartItem.qty.toString().padStart(2, "0")}
          </H3> */}
          <H3 fontWeight="600" mx="20px">
            {(cartItem.qty ?? 1).toString().padStart(2, "0")}
          </H3>


          <Button
            p="9px"
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleCartAmountChange(cartItem.qty + 1)}
          >
            <Icon variant="small">plus</Icon>
          </Button>
        </FlexBox>
      )}
    </>
  );
};

export default AddToCartButton;