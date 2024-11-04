// "use client";
// import { Fragment } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { useState } from "react";

// import Box from "@component/Box";
// import Image from "@component/Image";
// import Rating from "@component/rating";
// import Avatar from "@component/avatar";
// import Grid from "@component/grid/Grid";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";

// // ========================================
// type OTProductsIntroProps = {
//   price: number;
//   discountPrice?: number; // Optional discount price
//   totalDiscount?: number; // Optional total discount
//   title: string;
//   images: string[];
//   id: string | number;
//   sellerShopName: string; 
//   rating: number; // Add rating prop
//   productStock: number;
//   slug?: string;
//   productId: string | number;
//   sellerId: string | number;
// };
// // ========================================

// export default function OtProductsIntro({
//   images,
//   title,
//   price,
//   id,
//   sellerShopName,
//   rating,
//   discountPrice,
//   totalDiscount,
//   slug,
//   productStock,
//   productId,
//   sellerId
// }: OTProductsIntroProps) {
//   const param = useParams();
//   const { state, dispatch } = useAppContext();
//   const [selectedImage, setSelectedImage] = useState(0);

//   const routerId = param.slug as string;
//   const cartItem = state.cart.find((item) => item.id === id || item.id === routerId );

//   const handleImageClick = (ind: number) => () => setSelectedImage(ind);

//   // const handleCartAmountChange = (amount: number) => () => {
//   //   dispatch({
//   //     type: "CHANGE_CART_AMOUNT",
//   //     payload: {
//   //       price,
//   //       qty: amount,
//   //       name: title,
//   //       imgUrl: images[0],
//   //       id: id || routerId,
        
//   //       // newly added 
//   //       discountPrice   

//   //     }
//   //   });
//   // };
//   const handleCartAmountChange = (amount: number) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: {
//         price,
//         qty: amount,
//         name: title,
//         imgUrl: images[0],
//         id: id || routerId,
//         discountPrice,
//         slug,
//         productId ,
//         sellerId
//       }
//     });
//   };
  
  

//   return (
//     <Box overflow="hidden">
//       <Grid container justifyContent="center" spacing={16}>
//         <Grid item md={6} xs={12} alignItems="center">
//           <div>
//             <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
//               <Image
//                 width={200}
//                 height={200}
//                 src={images[selectedImage]}
//                 style={{ display: "block", width: "70%", height: "auto" }}
//               />
//             </FlexBox>

//             <FlexBox overflow="auto">
//               {images.map((url, ind) => (
//                 <Box
//                   key={ind}
//                   size={70}
//                   bg="white"
//                   minWidth={70}
//                   display="flex"
//                   cursor="pointer"
//                   border="1px solid"
//                   borderRadius="10px"
//                   alignItems="center"
//                   justifyContent="center"
//                   ml={ind === 0 ? "auto" : ""}
//                   mr={ind === images.length - 1 ? "auto" : "10px"}
//                   borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
//                   onClick={handleImageClick(ind)}
//                 >
//                   <Avatar src={url} borderRadius="10px" size={65} />
//                 </Box>
//               ))}
//             </FlexBox>
//           </div>
//         </Grid>

//         <Grid item md={6} xs={12} alignItems="center">
//           <H1 mb="1rem">{title}</H1>

//           <FlexBox alignItems="center" mb="1rem">
//             <Box ml="8px" mr="8px">
//               {rating > 0 && (
//                 <Rating value={rating} outof={5} color="warn" readOnly />
//               )}
//             </Box>
//           </FlexBox>

//           <Box mb="24px">
//             <FlexBox alignItems="center">
//             <H2 color="primary.main" mb="4px" lineHeight="1">
              
 
//       {/* <span>
//         {currency(price)}
//       </span> */}

// {discountPrice ? (
//   <>
//     <span style={{ color: 'primary.main', fontWeight: 600, fontSize: '14px' }}>
//       {currency(discountPrice)} {/* Discounted price */}
//     </span>
//     <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px', fontWeight: 600, fontSize: '14px' }}>
//       {currency(price)} {/* Original selling price */}
//     </span>
//   </>
// ) : (
//   <span>
//     {currency(price)}
//   </span>
// )}

     

// </H2>

// {/* {discountPrice && totalDiscount && (
//   <Box
//     bg="red"
//     color="white"
//     px="0.5rem"
//     py="0.25rem"
//     borderRadius="50%"
//     ml="1rem"
//     fontWeight="600"
//     fontSize="12px"
//     textAlign="center"
//   >
//     {Math.floor(totalDiscount)}%
//   </Box>
// )} */}
//  {!!discountPrice && totalDiscount && (
//   <Chip
//    bg="primary.main"
//   color="white"
//   px="0.5rem"
//   py="0.25rem"
//   ml="1rem"
//   fontWeight="600"
//   fontSize="12px"
//   textAlign="center"
   
    
//   >
//    {Math.floor(totalDiscount)}% off
//   </Chip>
// )}

// </FlexBox>
// <SemiSpan color="inherit">
//     {productStock > 0 ? "Stock Available" : "Stock Out"}
//   </SemiSpan>

//           </Box>

//           {!cartItem?.qty ? (
//             <Button
//               mb="36px"
//               size="small"
//               color="primary"
//               variant="contained"
//               onClick={handleCartAmountChange(1)}
//             >
//               Add to Cart
//             </Button>
//           ) : (
//             <FlexBox alignItems="center" mb="36px">
//               <Button
//                 p="9px"
//                 size="small"
//                 color="primary"
//                 variant="outlined"
//                 onClick={handleCartAmountChange(cartItem?.qty - 1)}
//               >
//                 <Icon variant="small">minus</Icon>
//               </Button>

//               <H3 fontWeight="600" mx="20px">
//                 {cartItem?.qty.toString().padStart(2, "0")}
//               </H3>

//               <Button
//                 p="9px"
//                 size="small"
//                 color="primary"
//                 variant="outlined"
//                 onClick={handleCartAmountChange(cartItem?.qty + 1)}
//               >
//                 <Icon variant="small">plus</Icon>
//               </Button>
//             </FlexBox>
//           )}

//           <FlexBox alignItems="center" mb="1rem">
//             <SemiSpan>Sold By:</SemiSpan>
//             <Link href="#">
//               <H6 lineHeight="1" ml="8px">
//                 {sellerShopName} 
//               </H6>
//             </Link>
//           </FlexBox>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



"use client";
import { Fragment, useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Chip } from "@component/Chip";
import { H3, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { marginLeft } from "styled-system";
import AddToCartButton from "./AddToCartButton";

// ========================================

type ConfiguredItem = {
  Id: string;
  Price: {
    ConvertedPriceWithoutSign: number;
    CurrencySign: string;
  };
  Quantity: number;
  SalesCount: number;
  Configurators: {
    Vid: string;
  }[];
};

interface Attribute {
  ImageUrl: string;
  IsConfigurator: boolean;
  MiniImageUrl: string;
  OriginalPropertyName: string;
  OriginalValue: string;
  Pid: string;
  PropertyName: string;
  Value: string;
  Vid: string;
}

type OTProductsIntroProps = {
  images: string[];
  title: string;
  price: number;
  id: string | number;
  sellerShopName: string;
  rating: number;
  discountPrice?: number; // Optional discount price
  totalDiscount?: number; // Optional total discount
  slug?: string;
  productStock: number;
  productId: string | number;
  sellerId: string | number;
  configuredItems: ConfiguredItem[];
  Attributes?: Attribute[];
  
};

// ========================================

export default function OtProductsIntro({
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
  configuredItems,
  Attributes,
}: OTProductsIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  // const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null); 


  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [selectedPrice, setSelectedPrice] = useState<number | null>(price);
  

  const handleRowClick = (itemId: string) => {
    setSelectedRowId(itemId === selectedRowId ? null : itemId);
  };

  const routerId = param.slug as string;
  const cartItem = state.cart.find((item) => item.id === id || item.id === routerId);

  // const handleVariantSelect = (item: Attribute) => {
  //   setSelectedSpec(item.Vid);

  //   // Find the index of the matching image in `images`
  //   const imageIndex = images.findIndex((url) => url === item.ImageUrl);
  //   if (imageIndex !== -1) {
  //     setSelectedImage(imageIndex); // Update displayed image
  //   }
  // };
  const handleVariantSelect = (item) => {
    setSelectedSpec(item.Vid); 
    setSelectedImage(item.ImageUrl); // Set selected image directly using the image URL
  };

  useEffect(() => {
    // Set initial selectedSpec to the first item's Vid from filtered Attributes
    const initialItem = Attributes?.find(item => 
      configuredItems.some(configuredItem => 
        configuredItem.Configurators.some(config => config.Vid === item.Vid)
      )
    );
    
    if (initialItem) {
      setSelectedSpec(initialItem.Vid); // Set the initial selected spec
    }
  }, [Attributes, configuredItems]);
  useEffect(() => {
    // Update selectedPrice based on selected variant
    const selectedItem = configuredItems.find(item => 
      item.Configurators.some(config => config.Vid === selectedSpec)
    );
    
    if (selectedItem) {
      setSelectedPrice(selectedItem.Price.ConvertedPriceWithoutSign);
    } else {
      setSelectedPrice(price); // Reset to default if no variant is selected
    }
  }, [selectedSpec, configuredItems, price]);

  // const handleImageClick = (ind: number) => () => setSelectedImage(ind);
  
  const handleCartAmountChange = (amount: number) => () => {
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
      },
    });
  };

  const containerStyle = {
    width: '100%'
  }

  const headerContainerStyle = {
    marginBottom: '1rem'
  }

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem'
  }

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',           
    flexWrap: 'wrap',          
    gap: '1rem',             
    marginBottom: '1rem',
};

  const getButtonStyle = (isSelected: boolean) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: `1px solid ${isSelected ? '#0ea5e9' : '#e5e7eb'}`,
    backgroundColor: 'white',
    color: isSelected ? '#0ea5e9' : '#4b5563',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: isSelected ? 'white' : '#f9fafb'
    }
  })

  // const tableContainerStyle = {
  //   backgroundColor: 'white'
  // }

  const tableContainerStyle: React.CSSProperties = {
    maxHeight: '250px',
    overflowY: 'auto',
    marginBottom: '20px',
    scrollbarWidth: 'thin',  
    scrollbarColor: '#888 #f1f1f1', 
    border: 'none'
};

  const tableStyle: React.CSSProperties = {
    width: '100%',
  borderCollapse: 'collapse',
  borderLeft: '1px solid #ccc', 
  borderRight: '1px solid #ccc', 
  }

  const tableHeaderStyle = {
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb'
  }

  const tableHeaderCellStyle = {
    textAlign: 'left' as const,
    padding: '0.75rem 1rem',
    fontWeight: '500',
    color: '#374151'
  }

  const tableRowStyle = {
    borderBottom: '1px solid #e5e7eb',
     cursor: 'pointer'
  }

  const tableCellStyle = {
    // padding: '1rem'
    padding: '10px', 
    border: '1px solid #ddd' 
  }

  const priceContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const
  }

  const currentPriceStyle = {
    color: '#0ea5e9',
    fontWeight: '500'
  }

  const originalPriceStyle = {
    color: '#9ca3af',
    fontSize: '0.875rem',
    textDecoration: 'line-through'
  }

  const quantityCellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const addButtonStyle = {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '0.375rem 1.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#0284c7'
    }
  }

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
        <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
  <Image
    width={200}
    height={200}
    src={selectedImage || images[0]} // Display selectedImage or fallback to first image
    style={{ display: "block", width: "70%", height: "auto" }}
  />
</FlexBox>

<FlexBox overflow="auto" mb="1rem">
  {images.map((url, ind) => (
    <Box
      key={ind}
      size={70}
      bg="white"
      display="flex"
      cursor="pointer"
      border="1px solid"
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      borderColor={selectedImage === url ? "primary.main" : "gray.400"} 
      onClick={() => setSelectedImage(url)} 
    >
      <Avatar src={url} borderRadius="10px" size={65} />
    </Box>
  ))}
</FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H3 mb="1rem">{title}</H3>

          <FlexBox alignItems="center" mb="1rem">
            <Box ml="8px" mr="8px">
              {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
            </Box>
          </FlexBox>

          <Box mb="24px">
      <FlexBox alignItems="center">
        <H3 color="primary.main" mb="4px" lineHeight="1">
          {discountPrice ? (
            <>
              <span style={currentPriceStyle}>{currency(discountPrice)}</span>
              <span style={originalPriceStyle}>{currency(selectedPrice)}</span> {/* Use selectedPrice */}
            </>
          ) : (
            <span>{currency(selectedPrice)}</span> // Use selectedPrice
          )}
        </H3>

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
      <SemiSpan color="inherit">
        {productStock > 0 ? "Stock Available" : "Stock Out"}
      </SemiSpan>
    </Box>

          <div style={containerStyle}>
          {/* <h2 style={titleStyle}>Specification: </h2> */}
    <div style={buttonContainerStyle}>
  {Attributes?.filter(item =>
    configuredItems.some(configItem =>
      configItem.Configurators.some(config => config.Vid === item.Vid)
    )
  )
    // .reduce((uniqueItems, item) => {
    //   if (!uniqueItems.some(uniqueItem => uniqueItem.Vid === item.Vid)) {
    //     uniqueItems.push(item);
    //   }
    //   return uniqueItems;
    // }, [])
    .reduce((uniqueItems, item) => {
 
      const hasImage = item.ImageUrl;
      const hasSize = item.Value && item.PropertyName === "Size"; 

      if (hasImage || !hasSize) {
        if (!uniqueItems.some(uniqueItem => uniqueItem.Vid === item.Vid)) {
          uniqueItems.push(item);
        }
      }
      return uniqueItems;
    }, [])

    .map((item) => (
      <button
        key={item.Vid}
        onClick={() => handleVariantSelect(item)}
        style={getButtonStyle(selectedSpec === item.Vid)}
      >
        {item.ImageUrl ? (
          <img
            src={item.ImageUrl}
            alt={item.Value}
            style={{ width: "40px", height: "50px", marginRight: "5px" }}
          />
        ) : (
          item.Value
        )}
      </button>
    ))}
</div>


<div style={tableContainerStyle}>
      {configuredItems.length > 0 && configuredItems.some(item => 
          item.Configurators.some(config => config.Vid === selectedSpec)
        ) ? (
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableHeaderCellStyle}>Variants</th>
              <th style={tableHeaderCellStyle}>Price</th>
              <th style={tableHeaderCellStyle}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {configuredItems
              .filter(item => 
                item.Configurators.some(config => config.Vid === selectedSpec)
              )
              .map((item) => (
                <tr 
                  key={item.Id} 
                  style={{ ...tableRowStyle, backgroundColor: selectedRowId === item.Id ? '#f0f8ff' : 'white' }} 
                  onClick={() => handleRowClick(item.Id)}
                >
                  <td style={tableCellStyle}>
                    {item.Configurators.map((config, index) => {
                      const matchingAttribute = Attributes.find(attr => attr.Vid === config.Vid);
                      return (
                        <Fragment key={index}>
                          {matchingAttribute ? matchingAttribute.Value : config.Vid} 
                          {index < item.Configurators.length - 1 && ", "}
                        </Fragment>
                      );
                    })}
                  </td>
                  <td style={tableCellStyle}>
                    {item.Price.CurrencySign}
                    {item.Price.ConvertedPriceWithoutSign}
                  </td>
                  <td style={tableCellStyle}>
                        <span>{item.Quantity}</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      ) : (
        <div>
          <AddToCartButton
            productId={productId}
            sellerId={sellerId}
            images={images}
            title={title}
            discountPrice={discountPrice}
            price={price}
            slug={slug}
            selectedSize={selectedSpec}
            selectedColor={''} 
            dummySizes={[]}
          />
        </div>
      )}

    
    </div>
    {selectedRowId && (
        <div style={{ marginTop: '20px' }}>
          <AddToCartButton
            productId={productId}
            sellerId={sellerId}
            images={images}
            title={title}
            discountPrice={discountPrice}
            price={price}
            slug={slug}
            selectedSize={selectedSpec}
            selectedColor={''}
            dummySizes={[]} 
        
          />
        </div>
      )}


</div>

        </Grid>
      </Grid>
    </Box>
  );
}
