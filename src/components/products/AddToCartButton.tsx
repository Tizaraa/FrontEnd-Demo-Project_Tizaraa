import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import toast from 'react-hot-toast';
import BeatLoader from "react-spinners/BeatLoader";

type AddToCartButtonProps = {
  productId: string | number;
  sellerId: string | number;
  images: string[];
  title: string;
  discountPrice?: number;
  price?: number;
  productStock: number;
  slug?: string;
  productType: string; // <-- Added this field
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
  productType
}: AddToCartButtonProps) => {
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const uniqueKey = `${productId}-${productType}`;

  const cartItem = state.cart.find(item => item.id === uniqueKey);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.qty);
    }
  }, [cartItem]);

  const handleCartAmountChange = (amount: number) => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }

    setQuantity(amount);

    const finalPrice = discountPrice || price || 0;

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
        total_amount: finalPrice * amount
      },
    });
  };

  const handleAddToCart = () => {
    setIsLoading(true);

    setTimeout(() => {
      handleCartAmountChange(1);
      setIsLoading(false);
      toast.success("Added to cart successfully!");
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

          <H3 fontWeight="600" mx="20px">
            {cartItem.qty.toString().padStart(2, "0")}
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
