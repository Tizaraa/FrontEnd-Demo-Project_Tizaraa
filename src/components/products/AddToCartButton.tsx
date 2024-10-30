// import { Button } from "@component/buttons";
// import FlexBox from "@component/FlexBox";
// import Icon from "@component/icon/Icon";
// import { H3 } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { useState } from "react";

// type SizeColorOption = {
//     size: string;
//     color: string;
//     price: number;
//     b2bPricing: { min_qty: number; price: number }[];
//     stock_quantity: number;
// };

// type AddToCartButtonProps = {
//     productId: string | number;
//     sellerId: string | number;
//     images: string[];
//     title: string;
//     discountPrice?: number;
//     price?: number;
//     slug?: string;
//     selectedSize: string | null; // Selected size prop
//     selectedColor: string | null; // Selected color prop
//     dummySizes: SizeColorOption[];
// };

// const AddToCartButton = ({
//     productId,
//     sellerId,
//     images,
//     title,
//     discountPrice,
//     price,
//     slug,
//     selectedSize,
//     selectedColor,
//     dummySizes,
// }: AddToCartButtonProps) => {
//     const { state, dispatch } = useAppContext();
//     const uniqueKey = dummySizes.length === 0
//         ? `${productId}`
//         : `${selectedSize}-${selectedColor}-${productId}`; // Unique key for product

//     const cartItem = state.cart.find(item => item.id === uniqueKey);

//     // Helper function to get the applicable B2B price based on quantity
//     const getB2BPrice = (quantity, b2bPricing) => {
//         const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
//         applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
//         return applicablePricing.length > 0 ? applicablePricing[0].price : null;
//     };

//     const handleCartAmountChange = (amount) => {
//     const uniqueKey = dummySizes.length === 0
//         ? `${productId}` // For products without sizes or colors
//         : `${selectedSize}-${selectedColor}-${productId}`; // For products with sizes and colors

//     // Ensure price is always defined
//     const defaultPrice = discountPrice ?? price ?? 0;

//     // Find the selected size/color option or default to basic price
//     const selectedSizeColorOption = dummySizes.length === 0
//         ? { price: defaultPrice, b2bPricing: [] }
//         : dummySizes.find(
//             (item) => item.size === selectedSize && item.color === selectedColor
//         );

//     // If no valid option found (dummySizes not empty), alert and return
//     if (dummySizes.length !== 0 && !selectedSizeColorOption) {
//         alert("Selected size and color option is not available.");
//         return;
//     }

//     // Calculate the price based on the quantity or default price
//     let finalPrice = getB2BPrice(amount, selectedSizeColorOption.b2bPricing) || selectedSizeColorOption.price;

//     // // Check stock quantity before allowing increment
//     // if (amount > 0 && amount > selectedSizeColorOption.stock_quantity) {
//     //     alert(`Only ${selectedSizeColorOption.stock_quantity} items are in stock.`);
//     //     return;
//     // }

//     // Update the cart item in global state
//     dispatch({
//         type: "CHANGE_CART_AMOUNT",
//         payload: {
//             price: finalPrice,
//             qty: amount,
//             name: title,
//             imgUrl: images[0],
//             id: uniqueKey,
//             discountPrice,
//             slug,
//             productId,
//             sellerId,
//             b2bPricing: selectedSizeColorOption.b2bPricing
//         },
//     });
// };

    

//     const handleAddToCart = () => {
//         // If no size/color options, directly add the item to cart
//         if (dummySizes.length === 0) {
//             const defaultPrice = discountPrice || price;
//             dispatch({
//                 type: "CHANGE_CART_AMOUNT",
//                 payload: {
//                     price: defaultPrice,
//                     qty: 1,
//                     name: title,
//                     imgUrl: images[0],
//                     id: uniqueKey,
//                     discountPrice,
//                     slug,
//                     productId,
//                     sellerId,
//                     b2bPricing: [],
//                 },
//             });
//             return;
//         }

//         // Ensure both size and color are selected if options exist
//         if (!selectedSize || !selectedColor) {
//             alert("Please select a size and color before adding to cart.");
//             return;
//         }

//         handleCartAmountChange(1); // Add with quantity 1
//     };

//     return (
//         <>
//             {!cartItem ? (
//                 <Button
//                     onClick={handleAddToCart}
//                     style={{
//                         backgroundColor: '#E94560',
//                         color: 'white',
//                         padding: '10px 20px',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         transition: 'background-color 0.3s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
//                 >
//                     Add to Cart
//                 </Button>
//             ) : (
//                 <FlexBox alignItems="center" mb="36px">
//                     <Button
//                         p="9px"
//                         size="small"
//                         color="primary"
//                         variant="outlined"
//                         onClick={() => handleCartAmountChange(cartItem.qty - 1)}
//                     >
//                         <Icon variant="small">minus</Icon>
//                     </Button>

//                     <H3 fontWeight="600" mx="20px">
//                         {cartItem.qty.toString().padStart(2, "0")}
//                     </H3>

//                     <Button
//                         p="9px"
//                         size="small"
//                         color="primary"
//                         variant="outlined"
//                         onClick={() => handleCartAmountChange(cartItem.qty + 1)}
//                     >
//                         <Icon variant="small">plus</Icon>
//                     </Button>
//                 </FlexBox>
//             )}
//         </>
//     );
// };

// export default AddToCartButton;

"use client";

import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3 } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { useState } from "react";

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
    dummySizes,
}: AddToCartButtonProps) => {
    const { state, dispatch } = useAppContext();
    const uniqueKey = dummySizes.length === 0
        ? `${productId}`
        : `${selectedSize}-${selectedColor}-${productId}`;

    const cartItem = state.cart.find(item => item.id === uniqueKey);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.qty : 1);

    const getB2BPrice = (quantity, b2bPricing) => {
        const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
        applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
        return applicablePricing.length > 0 ? applicablePricing[0].price : null;
    };

    const handleCartAmountChange = (amount) => {
        const selectedSizeColorOption = dummySizes.length === 0
            ? { price: discountPrice || price || 0, b2bPricing: [] }
            : dummySizes.find(item => item.size === selectedSize && item.color === selectedColor);

        if (!selectedSizeColorOption) {
            alert("Selected size and color option is not available.");
            return;
        }

        const finalPrice = getB2BPrice(amount, selectedSizeColorOption.b2bPricing) || selectedSizeColorOption.price;

        setQuantity(amount); // Update quantity in input field

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
            return;
        }

        if (!selectedSize || !selectedColor) {
            alert("Please select a size and color before adding to cart.");
            return;
        }
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



