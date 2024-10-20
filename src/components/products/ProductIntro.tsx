"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";


interface sizecolorwithprice {
  size: string;
  price: number;
  color: string;
  discountPrice: number;
  stock_quantity: number;
  productId: string | number;
}

// ========================================
type ProductIntroProps = {
  price: number;
  discountPrice?: number; // Optional discount price
  totalDiscount?: number; // Optional total discount
  title: string;
  images: string[];
  id: string | number;
  sellerShopName: string; 
  rating: number; // Add rating prop
  productStock: number;
  slug?: string;
  productId: string | number;
  sellerId: string | number;
  sizecolorwithprice: sizecolorwithprice[];
};
// ========================================

export default function ProductIntro({
  images,
  title,
  price,
  id,
  sellerShopName,
  rating,
  discountPrice,
  totalDiscount,
  slug,
  productStock,
  productId,
  sellerId,
  sizecolorwithprice =[]
}: ProductIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);

  // const [selectedSize, setSelectedSize] = useState('L'); 
  // const [selectedColor, setSelectedColor] = useState(''); 
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [cartItems, setCartItems] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (item) => {
    // Toggle selection
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter(selectedItem => selectedItem !== item));
      setSelectedSize('');
      setSelectedColor('');
    } else {
      setSelectedRows([item]); // Allow only one selection
      setSelectedSize(item.size);
      setSelectedColor(item.color);
    }
  };


  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedColor(null); // Reset color selection when size changes
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
 // Get unique sizes
 const uniqueSizes = sizecolorwithprice.reduce((acc, item) => {
  if (!acc.includes(item.size)) {
    acc.push(item.size);
  }
  return acc;
}, []);

  // Filter colors based on the selected size
  const availableColors = sizecolorwithprice
    .filter((item) => item.size === selectedSize)
    .map((item) => item.color);


    

  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  // const handleColorSelect = (color) => {
  //   setSelectedColor(color);
  // };

  const routerId = param.slug as string;
  const cartItem = state.cart.find((item) => item.id === id || item.id === routerId );

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // const handleCartAmountChange = (amount: number) => () => {
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: {
  //       price,
  //       qty: amount,
  //       name: title,
  //       imgUrl: images[0],
  //       id: id || routerId,
        
  //       // newly added 
  //       discountPrice   

  //     }
  //   });
  // };


  const handleCartAmountChange = (amount: number) => () => {
    // For single item management (without size/color variations)
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: id || routerId,
        discountPrice,
        slug,
        productId,
        sellerId,
        sizecolorwithprice
      },
    });
  };
  
  const handleCartAmountChange2 = (item, amount) => {
    const uniqueKey = `${item.size}-${item.color}-${item.productId}`; // Add product ID for unique identification of each variant
  
    // Update the cart item in local state for the specific size/color
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [uniqueKey]: { 
        ...item, 
        qty: amount,  // Update quantity for the specific size/color variant
      },
    }));
  
    // Dispatch an action to update the cart in global state
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: item.price,
        qty: amount,
        name: item.title,
        imgUrl: images[0],
        id: uniqueKey, // Using the uniqueKey here to differentiate size/color combinations
        discountPrice: item.discountPrice,
        slug: item.slug,
        productId: item.productId,
        sellerId: item.sellerId,
        sizecolorwithprice: item.sizecolorwithprice,
      },
    });
  };
  

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
              <Image
                width={200}
                height={200}
                src={images[selectedImage]}
                style={{ display: "block", width: "70%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 ? "auto" : ""}
                  mr={ind === images.length - 1 ? "auto" : "10px"}
                  borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <Box ml="8px" mr="8px">
              {rating > 0 && (
                <Rating value={rating} outof={5} color="warn" readOnly />
              )}
            </Box>
          </FlexBox>


            {/* price  */}
            <Box mb="24px">
            <FlexBox alignItems="center">
            <H2 color="primary.main" mb="4px" lineHeight="1">
  {sizecolorwithprice.length === 0 ? ( 
    discountPrice ? (
      <>
        {currency(discountPrice)} {/* Discounted price */}
        <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }}>
          {currency(price)} {/* Original selling price */}
        </span>
      </>
    ) : (
      currency(price) 
    )
  ) : null} 
</H2>



    {/* Discount Badge */}
    {!!discountPrice && totalDiscount && (
      <Chip
        bg="primary.main"
        color="white"
        px="0.5rem"
        py="0.25rem"
        ml="1rem"
        fontWeight="600"
        fontSize="12px"
        textAlign="center"
      >
        {Math.floor(totalDiscount)}% off
      </Chip>
    )}
  </FlexBox>

  {/* Stock availability */}
  <SemiSpan color="inherit">
    {productStock > 0 ? 'Stock Available' : 'Stock Out'}
  </SemiSpan>
</Box>



{/* sizecolorwithprice  */}

          {/* <Box>
  <h2>Available Sizes with Prices:</h2>
  {sizecolorwithprice && sizecolorwithprice.length > 0 ? (
    sizecolorwithprice.map((item, index) => (
      <Box key={index}>
        <span>Size: {item.size}</span> - <span>Price: {item.price}</span> - <span>Color: {item.color}</span>
      </Box>
    ))
  ) : (
    <p>No sizes available.</p>
  )}
</Box> */}
   <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
  {sizecolorwithprice.length > 0 ? ( 
    <table style={{ width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        <tr style={{ position: 'sticky', top: -1, backgroundColor: '#fff', zIndex: 1, borderTop: '1px solid #ddd' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size & Color</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
  {sizecolorwithprice.map((item, index) => {
    const uniqueKey = `${item.size}-${item.color}-${item.productId}`; // Unique key for each size and color
    const cartItem = cartItems[uniqueKey] || { qty: 0 }; // Get the quantity for the specific size/color combination

    return (
      <tr
        key={index}
        onClick={() => handleRowClick(item)}
        style={{
          backgroundColor: selectedRows.includes(item) ? '#f0f0f0' : 'transparent',
          cursor: 'pointer',
          borderBottom: '1px solid #ddd',
        }}
      >
        {/* size and color  */}
        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: "center", fontWeight: "600" }}>
          {`${item.size} / ${item.color}`}
        </td>

        {/* price  */}
        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: "center" }}>
          {item.discountPrice ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }}>
                BDT {item.price}
              </span>
              <span style={{ color: '#e94560', fontWeight: 'bold' }}>BDT {item.discountPrice}</span>
            </>
          ) : (
            <span style={{ color: '#e94560', fontWeight: 'bold' }}>BDT {item.price}</span>
          )}
        </td>

        {/* availability and quantity controls */}
       {/* availability and quantity controls */}
<td style={{ border: '1px solid #ddd', padding: '10px', textAlign: "center" }}>
  {cartItem?.qty > 0 ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Decrement button */}
      <Button
        p="9px"
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => handleCartAmountChange2(item, cartItem.qty - 1)}
      >
        <Icon variant="small">minus</Icon>
      </Button>

      {/* Display current quantity */}
      <H3 fontWeight="600" mx="20px">
        {cartItem.qty.toString().padStart(2, "0")}
      </H3>

      {/* Increment button */}
      <Button
        p="9px"
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => handleCartAmountChange2(item, cartItem.qty + 1)}
        disabled={cartItem.qty >= item.stock_quantity} // Disable if qty >= stock_quantity
      >
        <Icon variant="small">plus</Icon>
      </Button>
    </div>
  ) : (
    // Initial "Add to Cart" button
    <Button
      mb="10px"
      size="small"
      color="primary"
      variant="contained"
      onClick={() => handleCartAmountChange2(item, 1)} // Start with quantity 1
      style={{ width: "60%", fontSize: "12px", margin: "auto" }}
    >
      Add to Cart
    </Button>
  )}

  {/* Display stock availability */}
  <Typography style={{ marginTop: "10px" }}>
    {`Availability: ${item.stock_quantity}`}
  </Typography>
</td>

      </tr>
    );
  })}
</tbody>

    </table>
  ) : null}
</div>


{/* Show "Add to Cart" button only if there are no items in sizecolorwithprice */}
{sizecolorwithprice.length === 0 && !cartItem?.qty ? (
  <Button
    mb="36px"
    size="small"
    color="primary"
    variant="contained"
    onClick={handleCartAmountChange(1)}
  >
    Add to Cart
  </Button>
) : sizecolorwithprice.length === 0 && cartItem?.qty > 0 ? (
  <FlexBox alignItems="center" mb="36px">
    <Button
      p="9px"
      size="small"
      color="primary"
      variant="outlined"
      onClick={handleCartAmountChange(cartItem?.qty - 1)}
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
      onClick={handleCartAmountChange(cartItem?.qty + 1)}
    >
      <Icon variant="small">plus</Icon>
    </Button>
  </FlexBox>
) : null}


          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="#">
              <H6 lineHeight="1" ml="8px">
                {sellerShopName} 
              </H6>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}
