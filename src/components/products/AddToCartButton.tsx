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
//     slug,
//     selectedSize,
//     selectedColor,
//     dummySizes,
// }: AddToCartButtonProps) => {
//     const { state, dispatch } = useAppContext();
//     const cartItem = state.cart.find(item => item.id === `${selectedSize}-${selectedColor}-${productId}`);

//     // Helper function to get the applicable B2B price based on quantity
//     const getB2BPrice = (quantity, b2bPricing) => {
//         const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
//         applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
//         return applicablePricing.length > 0 ? applicablePricing[0].price : null;
//     };

//     const handleCartAmountChange = (amount) => {
//         const uniqueKey = `${selectedSize}-${selectedColor}-${productId}`; // Unique identification

//         // Find the selected size/color option from dummySizes
//         const selectedSizeColorOption = dummySizes.find(
//             item => item.size === selectedSize && item.color === selectedColor
//         );

//         // If no valid option found, alert and return
//         if (!selectedSizeColorOption) {
//             alert("Selected size and color option is not available.");
//             return;
//         }

//         // Calculate the price based on the quantity
//         let price = getB2BPrice(amount, selectedSizeColorOption.b2bPricing) || selectedSizeColorOption.price;

//         // Update the cart item in global state
//         dispatch({
//             type: "CHANGE_CART_AMOUNT",
//             payload: {
//                 price,
//                 qty: amount,
//                 name: title,
//                 imgUrl: images[0],
//                 id: uniqueKey,
//                 discountPrice,
//                 slug,
//                 productId,
//                 sellerId,
//                 b2bPricing: selectedSizeColorOption.b2bPricing
//             },
//         });
//     };

//     const handleAddToCart = () => {
//         // Ensure both size and color are selected
//         if (!selectedSize || !selectedColor) {
//             alert("Please select a size and color before adding to cart.");
//             return;
//         }

//         const uniqueKey = `${selectedSize}-${selectedColor}-${productId}`; // Create a unique key for the variant

//         // Find the selected size/color option from dummySizes
//         const selectedSizeColorOption = dummySizes.find(
//             item => item.size === selectedSize && item.color === selectedColor
//         );

//         // If no valid option found, alert and return
//         if (!selectedSizeColorOption) {
//             alert("Selected size and color option is not available.");
//             return;
//         }

//         // Add or update the item in the cart
//         handleCartAmountChange(1); // Add the item with initial quantity of 1
//     };

//     return (
//         <>
//             {!cartItem ? (
//                 <Button
//                     onClick={handleAddToCart}
//                     style={{
//                         backgroundColor: '#4CAF50', // Green background color
//                         color: 'white', // White text color
//                         padding: '10px 20px', // Padding
//                         border: 'none', // Remove border
//                         borderRadius: '5px', // Rounded corners
//                         cursor: 'pointer', // Pointer cursor on hover
//                         transition: 'background-color 0.3s', // Smooth transition
//                     }}
//                     onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = '#45a049'; // Darker green on hover
//                     }}
//                     onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = '#4CAF50'; // Revert back to original color
//                     }}
//                 >
//                     Add to Cart
//                 </Button>
//             ) : (
//                 <FlexBox alignItems="center" mb="36px">
//                 <Button
//                   p="9px"
//                   size="small"
//                   color="primary"
//                   variant="outlined"
//                   onClick={() => handleCartAmountChange(cartItem?.qty - 1)}
//                 >
//                   <Icon variant="small">minus</Icon>
//                 </Button>
      
//                 <H3 fontWeight="600" mx="20px">
//                   {cartItem?.qty.toString().padStart(2, "0")}
//                 </H3>
      
//                 <Button
//                   p="9px"
//                   size="small"
//                   color="primary"
//                   variant="outlined"
//                   onClick={() => handleCartAmountChange(cartItem?.qty + 1)}
//                 >
//                   <Icon variant="small">plus</Icon>
//                 </Button>
//               </FlexBox>
//             )}
//         </>
//     );
// };

// export default AddToCartButton;


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
    selectedSize: string | null; // Selected size prop
    selectedColor: string | null; // Selected color prop
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
    const cartItem = state.cart.find(item => item.id === `${selectedSize}-${selectedColor}-${productId}`);

    // Helper function to get the applicable B2B price based on quantity
    const getB2BPrice = (quantity, b2bPricing) => {
        const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
        applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
        return applicablePricing.length > 0 ? applicablePricing[0].price : null;
    };

    const handleCartAmountChange = (amount) => {
        const uniqueKey = `${selectedSize}-${selectedColor}-${productId}`; // Unique identification

        // Find the selected size/color option from dummySizes
        const selectedSizeColorOption = dummySizes.find(
            item => item.size === selectedSize && item.color === selectedColor
        );

        // If no valid option found, alert and return
        if (!selectedSizeColorOption) {
            alert("Selected size and color option is not available.");
            return;
        }

        // Calculate the price based on the quantity
        let price = getB2BPrice(amount, selectedSizeColorOption.b2bPricing) || selectedSizeColorOption.price;

        // Update the cart item in global state
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                price,
                qty: amount,
                name: title,
                imgUrl: images[0],
                id: uniqueKey,
                discountPrice,
                slug,
                productId,
                sellerId,
                b2bPricing: selectedSizeColorOption.b2bPricing
            },
        });
    };

    const handleAddToCart = () => {
        // Check if dummySizes is empty
        if (dummySizes.length === 0) {
            // No size/color options available, add to cart directly
            const uniqueKey = `${productId}`; // Use productId as unique key

            // Add the item to cart with default price and quantity
            const defaultPrice = discountPrice || price; // Use discountPrice if available

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
                    b2bPricing: [] 
                },
            });

            return;
        }

        // Ensure both size and color are selected
        if (!selectedSize || !selectedColor) {
            alert("Please select a size and color before adding to cart.");
            return;
        }

        const uniqueKey = `${selectedSize}-${selectedColor}-${productId}`; // Create a unique key for the variant

        // Find the selected size/color option from dummySizes
        const selectedSizeColorOption = dummySizes.find(
            item => item.size === selectedSize && item.color === selectedColor
        );

        // If no valid option found, alert and return
        if (!selectedSizeColorOption) {
            alert("Selected size and color option is not available.");
            return;
        }

        // Add or update the item in the cart
        handleCartAmountChange(1); // Add the item with initial quantity of 1
    };

    return (
        <>
            {!cartItem ? (
                <Button
                    onClick={handleAddToCart}
                    style={{
                        backgroundColor: '#4CAF50', // Green background color
                        color: 'white', // White text color
                        padding: '10px 20px', // Padding
                        border: 'none', // Remove border
                        borderRadius: '5px', // Rounded corners
                        cursor: 'pointer', // Pointer cursor on hover
                        transition: 'background-color 0.3s', // Smooth transition
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#45a049'; // Darker green on hover
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#4CAF50'; // Revert back to original color
                    }}
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
                        onClick={() => handleCartAmountChange(cartItem?.qty - 1)}
                    >
                        <Icon variant="small">minus</Icon>
                    </Button>

                    <H3 fontWeight="600" mx="20px">
                        {cartItem?.qty.toString().padStart(2, "0")}
                    </H3>

                    <Button
                        p="9px"
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => handleCartAmountChange(cartItem?.qty + 1)}
                    >
                        <Icon variant="small">plus</Icon>
                    </Button>
                </FlexBox>
            )}
        </>
    );
};

export default AddToCartButton;
