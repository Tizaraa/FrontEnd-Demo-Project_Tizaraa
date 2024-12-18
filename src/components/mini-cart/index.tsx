

// import Link from "next/link";
// import Image from "next/image";
// import { Fragment, useEffect, useState } from "react";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button, IconButton } from "@component/buttons";
// import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { StyledMiniCart } from "./styles";
// import authService from "services/authService";
// // import { useRouter } from "next/router";
// import Menu from "@component/Menu";
// import MenuItem from "@component/MenuItem";
// import { useRouter } from "next/navigation";
// //import { toast } from "react-toastify";
// import toast, { Toaster } from 'react-hot-toast';
// import CheckBox from "@component/CheckBox";
// import DeleteIcon from '@mui/icons-material/Delete';

// // MiniCart Component
// type MiniCartProps = { toggleSidenav?: () => void };

// export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
//   const { state, dispatch } = useAppContext();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [selectAll, setSelectAll] = useState(false)
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const router = useRouter(); // Ensure the router is available

//   useEffect(() => {
//     setIsLoggedIn(authService.isAuthenticated());
//   }, []);

//   const handleCartAmountChange = (amount: number, product: any) => () => {
//     console.log("p",product.productStock);
    
//     if (amount > product.productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: amount }
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, product: any) => {
//     const newQty = Math.min(product.productStock, Math.max(1, parseInt(e.target.value)));
//     if (newQty > product.productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: newQty }
//     });
//   };

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll)
//   }

//   const handleDeleteSelected = () => {
//     if (selectAll) {
//       state.cart.forEach((item) => {
//         dispatch({
//           type: "CHANGE_CART_AMOUNT",
//           payload: { ...item, qty: 0 }
//         })
//       })
//       setSelectAll(false)
//     }
//   }

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) =>
//       // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//       accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty, 0
//     ) || 0;
//   };

//   const handleCheckout = () => {
//     if (isLoggedIn) {
//       router.push("/checkout"); // Redirect to checkout if logged in
//     } else {
//       router.push("/login"); // Redirect to login if not logged in
//     }
//   };

//   const LOGIN_HANDLE = isLoggedIn ? (
//     <Fragment>
//       <Menu handler={
//         <IconButton ml="1rem" bg="gray.200" p="8px">
//           <Button fullwidth color="primary" variant="contained" onClick={toggleSidenav}>
//             <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
//           </Button>
//         </IconButton>
//       }>
//         <MenuItem onClick={() => router.push("/checkout")}></MenuItem>
//       </Menu>
//     </Fragment>
//   ) : (
//     <IconButton ml="1rem" bg="gray.200" p="8px">
//       <Icon size="28px">user</Icon>
//     </IconButton>
//   );

//   return (
//     <StyledMiniCart>
//       <div className="cart-list">
//         <FlexBox alignItems="center" m="0px 20px" height="74px">
//           <Icon size="1.75rem">bag</Icon>
//           <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
//             {state.cart.length} item{state.cart.length !== 1 ? 's' : ''}
//           </Typography>
//         </FlexBox>

//         <Divider />

//         <FlexBox alignItems="center" justifyContent="space-between" m="0px 16px" height="50px">
//           <FlexBox alignItems="center">
//             <CheckBox checked={selectAll} onChange={handleSelectAll} />
//             <Typography ml="0.5rem">Select All</Typography>
//           </FlexBox>
//           <Button
//   size="small"
//   color="primary"
//   variant="outlined"
//   onClick={handleDeleteSelected}
//   style={{
//     backgroundColor: "#f5f5f5",
//     borderColor: "#E94560",
//     color: "#E94560",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     padding: "6px 12px",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     transition: "all 0.3s ease",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     cursor: "pointer",
//   }}
//   onMouseEnter={(e) =>
//     (e.currentTarget.style.backgroundColor = "#E94560", e.currentTarget.style.color = "#fff")
//   }
//   onMouseLeave={(e) =>
//     (e.currentTarget.style.backgroundColor = "#f5f5f5", e.currentTarget.style.color = "#E94560")
//   }
// >
//   <DeleteIcon style={{ fontSize: "18px" }} /> Delete All
// </Button>

//         </FlexBox>

//         {state.cart.length === 0 && (
//           <FlexBox
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//             height="calc(100% - 80px)">
//             <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="empty cart" />
//             <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
//               Your shopping bag is empty. Start shopping
//             </Paragraph>
//           </FlexBox>
//         )}

//         {state.cart.map((item) => (
//           <Fragment key={item.id}>
//             <div className="cart-item">
//             <CheckBox />
//               <FlexBox style={{display: "flex", flexDirection: "column", gap: "10px"}} alignItems="center" flexDirection="column">
//                 <Button
//                   size="none"
//                   padding="5px"
//                   color="primary"
//                   variant="outlined"
//                   borderRadius="300px"
//                   borderColor="primary.light"
//                   onClick={handleCartAmountChange(item.qty + 1, item)}>
//                   <Icon variant="small">plus</Icon>
//                 </Button>

//                 <input
//                     className="no-spin-button"
//                     type="number"
//                     value={item.qty}
//                     min={1}
//                     onChange={(e) => handleInputChange(e, item)}
//                     style={{ textDecoration:"none", borderRadius: "30px", scrollBehavior: "unset", border: "1px solid #E94560", padding: "8px", width: "50px", textAlign: "center" }}
//                   />

//                 <Button
//                   size="none"
//                   padding="5px"
//                   color="primary"
//                   variant="outlined"
//                   borderRadius="300px"
//                   borderColor="primary.light"
//                   onClick={handleCartAmountChange(item.qty - 1, item)}
//                   disabled={item.qty === 1}>
//                   <Icon variant="small">minus</Icon>
//                 </Button>
//               </FlexBox>

//               <Link href={`/product/${item.slug}`}>
//                 <Avatar size={76} mx="1rem" alt={item.name} src={item.imgUrl} />
//               </Link>

//               <div className="product-details">
//                 <Link href={`/product/${item.slug}`}>
//                   <H5 className="title" fontSize="14px">{item.name}</H5>
//                 </Link>

//                 {/* <Tiny color="text.muted">
//                   {currency(item.discountPrice ?? item.price, 0)} x {item.qty}
//                 </Tiny> */}

//                 {/* newly added  */}
                
//                 <Tiny color="text.muted">
//                 {currency(item.discountPrice ? item.discountPrice : item.price, 0)} x {item.qty}
//                 </Tiny>

//                 {/* <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//                   {currency(item.qty * (item.discountPrice ?? item.price))}
//                 </Typography> */}

//                 <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//                   {currency(item.qty * (item.discountPrice ? item.discountPrice : item.price))}
//                 </Typography>

//               </div>

//               <Button
//                 size="none"
//                 padding="5px"
//                 color="primary"
//                 variant="outlined"
//                 borderRadius="300px"
//                 borderColor="primary.light"
//                 onClick={handleCartAmountChange(0, item)}>
//                 <Icon variant="small">close</Icon>
//               </Button>
//             </div>
//             <Divider />
//           </Fragment>
//         ))}
//       </div>

//       {state.cart.length > 0 && (
//         <div className="actions">
//           <Button fullwidth color="primary" variant="contained" onClick={handleCheckout}>
//             <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
//           </Button>
          
          

//           <Link href="/cart">
//             <Button fullwidth color="primary" variant="outlined" mt="1rem" onClick={toggleSidenav}>
//               <Typography fontWeight={600}>View Cart</Typography>
//             </Button>
//           </Link>
//         </div>
//       )}
//     </StyledMiniCart>
//   );
// }

// import Link from "next/link";
// import Image from "next/image";
// import { Fragment, useEffect, useState } from "react";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button, IconButton } from "@component/buttons";
// import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { StyledMiniCart } from "./styles";
// import authService from "services/authService";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import CheckBox from "@component/CheckBox";
// import DeleteIcon from "@mui/icons-material/Delete";

// // MiniCart Component
// type MiniCartProps = { toggleSidenav?: () => void };

// export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
//   const { state, dispatch } = useAppContext();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     setIsLoggedIn(authService.isAuthenticated());
//   }, []);

//   const handleCartAmountChange = (amount: number, product: any) => () => {
//     if (amount > product.productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: amount },
//     });
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     product: any
//   ) => {
//     const newQty = Math.min(
//       product.productStock,
//       Math.max(1, parseInt(e.target.value))
//     );
//     if (newQty > product.productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: newQty },
//     });
//   };

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll);
//     if (!selectAll) {
//       setSelectedProducts(state.cart.map((item) => item.id));
//     } else {
//       setSelectedProducts([]);
//     }
//   };

//   const handleProductSelect = (productId: string | number) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   const handleDeleteSelected = () => {
//     if (selectAll) {
//       state.cart.forEach((item) => {
//         dispatch({
//           type: "CHANGE_CART_AMOUNT",
//           payload: { ...item, qty: 0 },
//         });
//       });
//       setSelectAll(false);
//     } else {
//       selectedProducts.forEach((id) => {
//         const product = state.cart.find((item) => item.id === id);
//         if (product) {
//           dispatch({
//             type: "CHANGE_CART_AMOUNT",
//             payload: { ...product, qty: 0 },
//           });
//         }
//       });
//       setSelectedProducts([]);
//     }
//   };

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) => {
//       if (selectedProducts.includes(item.id)) {
//         return (
//           accumulator +
//           (item.discountPrice ? item.discountPrice : item.price) * item.qty
//         );
//       }
//       return accumulator;
//     }, 0);
//   };

//   const handleCheckout = () => {
//     const selectedItems = state.cart.filter((item) =>
//       selectedProducts.includes(item.id)
//     );
//     if (selectedItems.length === 0) {
//       toast.error("Please select products to checkout");
//       return;
//     }
//     const checkoutData = JSON.stringify(selectedItems);
//     localStorage.setItem("selectedProducts", checkoutData);

//     if (isLoggedIn) {
//       router.push("/checkout");
//     } else {
//       router.push("/login");
//     }
//   };

//   return (
//     <StyledMiniCart>
//       <div className="cart-list">
//         <FlexBox alignItems="center" m="0px 20px" height="74px">
//           <Icon size="1.75rem">bag</Icon>
//           <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
//             {state.cart.length} item{state.cart.length !== 1 ? "s" : ""}
//           </Typography>
//         </FlexBox>

//         <Divider />

//         <FlexBox alignItems="center" justifyContent="space-between" m="0px 16px" height="50px">
//           <FlexBox alignItems="center">
//             <CheckBox checked={selectAll} onChange={handleSelectAll} />
//             <Typography ml="0.5rem">Select All</Typography>
//           </FlexBox>
//           <Button
//             size="small"
//             color="primary"
//             variant="outlined"
//             onClick={handleDeleteSelected}
//             disabled={selectedProducts.length === 0}
//             style={{
//               backgroundColor: selectedProducts.length === 0 ? "#f5f5f5" : "#f5f5f5",
//               borderColor: selectedProducts.length === 0 ? "#ccc" : "#E94560",
//               color: selectedProducts.length === 0 ? "#ccc" : "#E94560",
//               fontWeight: "bold",
//               borderRadius: "8px",
//               padding: "6px 12px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               transition: "all 0.3s ease",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               cursor: selectedProducts.length === 0 ? "not-allowed" : "pointer",
//             }}
//             onMouseEnter={(e) => {
//               if (selectedProducts.length !== 0) {
//                 e.currentTarget.style.backgroundColor = "#E94560";
//                 e.currentTarget.style.color = "#fff";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (selectedProducts.length !== 0) {
//                 e.currentTarget.style.backgroundColor = "#f5f5f5";
//                 e.currentTarget.style.color = "#E94560";
//               }
//             }}
//           >
//             <DeleteIcon style={{ fontSize: "18px" }} /> Delete All
//           </Button>
//         </FlexBox>

//         {state.cart.length === 0 && (
//           <FlexBox
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//             height="calc(100% - 80px)"
//           >
//             <Image
//               src="/assets/images/logos/shopping-bag.svg"
//               width={90}
//               height={90}
//               alt="empty cart"
//             />
//             <Paragraph
//               mt="1rem"
//               color="text.muted"
//               textAlign="center"
//               maxWidth="200px"
//             >
//               Your shopping bag is empty. Start shopping
//             </Paragraph>
//           </FlexBox>
//         )}

//         {state.cart.map((item) => (
//           <Fragment key={item.id}>
//             <div className="cart-item">
//               <CheckBox
//                 checked={selectedProducts.includes(item.id)}
//                 onChange={() => handleProductSelect(item.id)}
//               />
//               <FlexBox
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "10px",
//                 }}
//                 alignItems="center"
//                 flexDirection="column"
//               >
//                 <Button
//                   size="none"
//                   padding="5px"
//                   color="primary"
//                   variant="outlined"
//                   borderRadius="300px"
//                   borderColor="primary.light"
//                   onClick={handleCartAmountChange(item.qty + 1, item)}
//                 >
//                   <Icon variant="small">plus</Icon>
//                 </Button>

//                 <input
//                   className="no-spin-button"
//                   type="number"
//                   value={item.qty}
//                   min={1}
//                   onChange={(e) => handleInputChange(e, item)}
//                   style={{
//                     textDecoration: "none",
//                     borderRadius: "30px",
//                     scrollBehavior: "unset",
//                     border: "1px solid #E94560",
//                     padding: "8px",
//                     width: "50px",
//                     textAlign: "center",
//                   }}
//                 />

//                 <Button
//                   size="none"
//                   padding="5px"
//                   color="primary"
//                   variant="outlined"
//                   borderRadius="300px"
//                   borderColor="primary.light"
//                   onClick={handleCartAmountChange(item.qty - 1, item)}
//                   disabled={item.qty === 1}
//                 >
//                   <Icon variant="small">minus</Icon>
//                 </Button>
//               </FlexBox>

//               <Link href={`/product/${item.slug}`}>
//                 <Avatar size={76} mx="1rem" alt={item.name} src={item.imgUrl} />
//               </Link>

//               <div className="product-details">
//                 <Link href={`/product/${item.slug}`}>
//                   <H5 className="title" fontSize="14px">
//                     {item.name}
//                   </H5>
//                 </Link>

//                 <Tiny color="text.muted">
//                   {currency(
//                     item.discountPrice ? item.discountPrice : item.price,
//                     0
//                   )}{" "}
//                   x {item.qty}
//                 </Tiny>

//                 <Typography
//                   fontWeight={600}
//                   fontSize="14px"
//                   color="primary.main"
//                   mt="4px"
//                 >
//                   {currency(
//                     item.qty *
//                       (item.discountPrice ? item.discountPrice : item.price)
//                   )}
//                 </Typography>
//               </div>

//               <Button
//                 size="none"
//                 padding="5px"
//                 color="primary"
//                 variant="outlined"
//                 borderRadius="300px"
//                 borderColor="primary.light"
//                 onClick={handleCartAmountChange(0, item)}
//               >
//                 <Icon variant="small">close</Icon>
//               </Button>
//             </div>
//             <Divider />
//           </Fragment>
//         ))}
//       </div>

//       {state.cart.length > 0 && (
//         <div className="actions">
//           <Button
//             fullwidth
//             color="primary"
//             variant="contained"
//             onClick={handleCheckout}
//           >
//             <Typography fontWeight={600}>
//               Checkout Now ({currency(getTotalPrice())})
//             </Typography>
//           </Button>

//           <Link href="/cart">
//             <Button
//               fullwidth
//               color="primary"
//               variant="outlined"
//               mt="1rem"
//               onClick={toggleSidenav}
//             >
//               <Typography fontWeight={600}>View Cart</Typography>
//             </Button>
//           </Link>
//         </div>
//       )}
//     </StyledMiniCart>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { StyledMiniCart } from "./styles";
import authService from "services/authService";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import CheckBox from "@component/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import BeatLoader from "react-spinners/BeatLoader";

type MiniCartProps = { toggleSidenav?: () => void };

export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
  const { state, dispatch } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [viewCartLoading, setViewCartLoading] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  // useEffect(() => {
  //   const allSelected = state.cart.length > 0 && state.cart.every(item => selectedProducts.includes(item.id));
  //   setSelectAll(allSelected);
  // }, [selectedProducts, state.cart]);

  useEffect(() => {
    setSelectAll(
      state.cart.length > 0 &&
        state.cart.every((item) => state.selectedProducts.includes(item.id))
    );
  }, [state.cart, state.selectedProducts]);

  const handleCartAmountChange = (amount: number, product: any) => () => {
    if (amount > product.productStock) {
      toast.error("Out of Stock");
      return;
    }
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: any
  ) => {
    const newQty = Math.min(
      product.productStock,
      Math.max(1, parseInt(e.target.value))
    );
    if (newQty > product.productStock) {
      toast.error("Out of Stock");
      return;
    }
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: newQty },
    });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => {
      if (state.selectedProducts.includes(item.id)) {
        return (
          accumulator +
          (item.discountPrice ? item.discountPrice : item.price) * item.qty
        );
      }
      return accumulator;
    }, 0);
  };

  // const handleCheckout = () => {
  //   const selectedItems = state.cart.filter((item) =>
  //     state.selectedProducts.includes(item.id)
  //   );
  //   if (selectedItems.length === 0) {
  //     toast.error("Please select products to checkout");
  //     setLoading(false);
  //     return;
  //   }
  //   setLoading(true); // Set navigating to true
  //   const checkoutData = JSON.stringify(selectedItems);
  //   localStorage.setItem("selectedProducts", checkoutData);
  //   //setVisible(false); // Hide the cart
  //   if (isLoggedIn) {
  //     setLoading(true); // Reset on navigation complete
  //     // router.push("/checkout")
  //     setTimeout(() => {
  //       router.push("/checkout") // Navigate to the cart page
  //       setLoading(false); // Optional: reset loading state after navigation
  //       toggleSidenav();// Adjust the delay time as needed (e.g., 1000ms = 1 second)
  //     }, 5000); 
  //     //setLoading(false);
  //   } else {
  //     setLoading(true);
  //     router.push("/login")
  //     //setLoading(false); // Reset on navigation complete
  //   }
  //   setLoading(false);
  // };

  const handleCheckout = () => {
    // Get selected items from the cart
    const selectedItems = state.cart.filter((item) =>
      state.selectedProducts.includes(item.id)
    );
  
    // Check if there are no selected items
    if (selectedItems.length === 0) {
      toast.error("Please select products to checkout");
      return;
    }
  
    // Start the loading process
    setLoading(true);
  
    // Save selected items to localStorage
    const checkoutData = JSON.stringify(selectedItems);
    localStorage.setItem("selectedProducts", checkoutData);
  
    if (isLoggedIn) {
      // Redirect to checkout if logged in
      setTimeout(() => {
        router.push("/checkout");
        setLoading(false); // Reset loading state after navigation
        toggleSidenav();
      }, 1000); // Adjust delay as needed
    } else {
      // Redirect to login if not logged in
      setTimeout(() => {
        router.push("/login");
        setLoading(false); // Reset loading state after navigation
      }, 1000); // Adjust delay as needed
    }
  };
  

  const handleSelectAll = () => {
    if (selectAll) {
      dispatch({ type: "DESELECT_ALL_PRODUCTS" });
    } else {
      dispatch({ type: "SELECT_ALL_PRODUCTS" });
    }
  };

  const handleProductSelect = (productId: string | number) => {
    if (state.selectedProducts.includes(productId)) {
      dispatch({ type: "DESELECT_PRODUCT", payload: productId });
    } else {
      dispatch({ type: "SELECT_PRODUCT", payload: productId });
    }
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);

    try {
      // Simulate async operation (e.g., API call) with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      state.selectedProducts.forEach((productId) => {
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { id: productId, qty: 0 },
        });
      });

      localStorage.removeItem("orderId");
      localStorage.removeItem("cart");
      sessionStorage.removeItem("paymentMethod");
      sessionStorage.removeItem("savedTotalPrice");
      sessionStorage.removeItem("savedTotalWithDelivery");

      dispatch({ type: "DESELECT_ALL_PRODUCTS" });

      toast.success("Selected items deleted successfully");
    } catch (error) {
      toast.error("Failed to delete selected items");
    } finally {
      setIsDeleting(false);
    }
  };


  const totalPrice = getTotalPrice();

  // const handleViewCart = () => {
  //   setViewCartLoading(true);
  //   toggleSidenav();
  //   router.push("/cart")
  // };

  const handleViewCart = () => {
    setViewCartLoading(true); // Show the loading state
  
    // Delay the navigation to the cart page
    setTimeout(() => {
      router.push("/cart"); // Navigate to the cart page
      setViewCartLoading(false); // Optional: reset loading state after navigation
      toggleSidenav();// Adjust the delay time as needed (e.g., 1000ms = 1 second)
    }, 1000); 
  };
  return (
    <StyledMiniCart>
      <div className={`cart-list ${state.cart.length === 0 ? "no-scroll" : ""}`}>
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {state.cart.length} item{state.cart.length !== 1 ? "s" : ""}
          </Typography>
        </FlexBox>

        <Divider />

        <FlexBox alignItems="center" justifyContent="space-between" m="0px 16px" height="50px">
          <FlexBox alignItems="center">
            <CheckBox
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <Typography ml="0.5rem">Select All</Typography>
          </FlexBox>
          <Button
      size="small"
      color="primary"
      variant="outlined"
      disabled={
        state.selectedProducts.length === 0 ||
        state.cart.length === 0 ||
        totalPrice === 0 ||
        isDeleting
      }
      onClick={handleDeleteSelected}
      className={`delete-button ${isDeleting ? "deleting" : ""}`}
    >
      {isDeleting ? (
        <BeatLoader size={18} color="#E94560" />
      ) : (
        <>
          <DeleteIcon style={{ marginRight: "8px", fontSize: "18px" }} /> Remove All
        </>
      )}
    </Button>
        </FlexBox>

        {state.cart.length === 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)"
          >
            <Image
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={90}
              alt="empty cart"
            />
            <Paragraph
              mt="1rem"
              color="text.muted"
              textAlign="center"
              maxWidth="200px"
            >
              No Product Found
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item) => (
          <Fragment key={item.id}>
            <div className="cart-item">
            <CheckBox
              checked={state.selectedProducts.includes(item.id)}
              onChange={() => handleProductSelect(item.id)}
            />
              <FlexBox
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
                alignItems="center"
                flexDirection="column"
              >
                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty + 1, item)}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

                <input
                  className="no-spin-button"
                  type="number"
                  value={item.qty}
                  min={1}
                  onChange={(e) => handleInputChange(e, item)}
                  style={{
                    textDecoration: "none",
                    borderRadius: "30px",
                    scrollBehavior: "unset",
                    border: "1px solid #E94560",
                    padding: "8px",
                    width: "50px",
                    textAlign: "center",
                  }}
                />

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.slug}`}>
                <Avatar size={76} mx="1rem" alt={item.name} src={item.imgUrl} />
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.slug}`}>
                  <H5 className="title" fontSize="14px">
                    {item.name}
                  </H5>
                </Link>

                <Tiny color="text.muted">
                  {currency(
                    item.discountPrice ? item.discountPrice : item.price,
                    0
                  )}{" "}
                  x {item.qty}
                </Tiny>

                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="primary.main"
                  mt="4px"
                >
                  {currency(
                    item.qty *
                      (item.discountPrice ? item.discountPrice : item.price)
                  )}
                </Typography>
              </div>

              <Button
                size="none"
                padding="5px"
                color="primary"
                variant="outlined"
                borderRadius="300px"
                borderColor="primary.light"
                onClick={handleCartAmountChange(0, item)}
              >
                <Icon variant="small">close</Icon>
              </Button>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {state.cart.length > 0 && (
        <div className="actions">
          <Button
            fullwidth
            color="primary"
            variant="contained"
            onClick={handleCheckout}
            disabled={state.selectedProducts.length === 0 || state.cart.length === 0 || totalPrice === 0 || loading}
          >
            {loading ? (
          <BeatLoader size={18} color="#E94560" />
        ) : (
          <Typography fontWeight={600}>
            PROCEED TO CHECKOUT ({currency(getTotalPrice())})
          </Typography>
        )}
          </Button>

          
            <Button
              fullwidth
              color="primary"
              variant="outlined"
              mt="1rem"
              onClick={handleViewCart}
              disabled={viewCartLoading}
            >
              {viewCartLoading ? (
                <BeatLoader size={18} color="#E94560" />
              ) : (
                <Typography fontWeight={600}>View Cart</Typography>
              )}
            </Button>
        </div>
      )}
      <style jsx>{`
        .delete-button {
          transition: all 0.3s ease;
        }
        .delete-button.deleting {
          opacity: 0.5;
          pointer-events: none;
        }
        .delete-button:hover {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </StyledMiniCart>
  );
}