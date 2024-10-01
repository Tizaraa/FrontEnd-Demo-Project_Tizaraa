// import Link from "next/link";
// import Image from "next/image";
// import { Fragment } from "react";

// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// // STYLED COMPONENT
// import { StyledMiniCart } from "./styles";

// // ==============================================================
// type MiniCartProps = { toggleSidenav?: () => void };
// // ==============================================================

// export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
//   const { state, dispatch } = useAppContext();

//   const handleCartAmountChange = (amount: number, product: any) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: amount }
//     });
//   };

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) => 
//       accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//     ) || 0;
//   };
  

//   return (
//     <StyledMiniCart>
//       <div className="cart-list">
//         <FlexBox alignItems="center" m="0px 20px" height="74px">
//           <Icon size="1.75rem">bag</Icon>
//           <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
//             {state.cart.length} item
//           </Typography>
//         </FlexBox>

//         <Divider />

//         {!!!state.cart.length && (
//           <FlexBox
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//             height="calc(100% - 80px)">
//             <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="bonik" />
//             <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
//               Your shopping bag is empty. Start shopping
//             </Paragraph>
//           </FlexBox>
//         )}

//         {state.cart.map((item) => (
//           <Fragment key={item.id}>
//             <div className="cart-item">
//               <FlexBox alignItems="center" flexDirection="column">
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

//                 <Typography fontWeight={600} fontSize="15px" my="3px">
//                   {item.qty}
//                 </Typography>

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
//                 <Avatar
//                   size={76}
//                   mx="1rem"
//                   alt={item.name}
//                   src={item.imgUrl || "/assets/images/products/iphone-x.png"}
//                 />
//               </Link>

//               <div className="product-details">
//                 <Link href={`/product/${item.id}`}>
//                   <H5 className="title" fontSize="14px">
//                     {item.name}
//                   </H5>
//                 </Link>

//                 {/* <Tiny color="text.muted">
//                   {currency(item.discountPrice, 0)} x {item.qty}
//                 </Tiny>

//                 <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//                   {currency(item.qty * item.discountPrice)}
//                 </Typography> */}
//                   {/* Updated Price Section */}
//         {item.discountPrice ? (
//           <>
//            <Tiny color="text.muted">
//                   {currency(item.discountPrice, 0)} x {item.qty}
//                 </Tiny>
              
//           </>
//         ) : (
//           <Tiny color="text.muted">
//           {currency(item.price, 0)} x {item.qty}
//         </Tiny>
//         )}

//         <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//           {currency(item.qty * (item.discountPrice ?? item.price))}
//         </Typography>
     

//               </div>


//               {/* <Icon
//                 size="1rem"
//                 ml="1.25rem"
//                 className="clear-icon"
//                 onClick={handleCartAmountChange(0, item)}>
                  
//                 close
//               </Icon> */}

//                  <Button
//                   size="none"
//                   padding="5px"
//                   color="primary"
//                   variant="outlined"
//                   borderRadius="300px"
//                   borderColor="primary.light"
//                   onClick={handleCartAmountChange(0, item)}
//                  >
//                   <Icon variant="small">close</Icon>
//                 </Button>
//             </div>
//             <Divider />
//           </Fragment>
//         ))}
//       </div>

//       {!!state.cart.length && (
//         <div className="actions">
//           <Link href="/checkout">
//             <Button fullwidth color="primary" variant="contained" onClick={toggleSidenav}>
//               <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
//             </Button>
//           </Link>

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
// import { Fragment } from "react";

// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
// import { useAppContext } from "@context/app-context"; // Update path as needed
// import { currency } from "@utils/utils"; // Update path as needed
// import { StyledMiniCart } from "./styles"; // Update path as needed

// // MiniCart Component
// type MiniCartProps = { toggleSidenav?: () => void };

// export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
//   const { state, dispatch } = useAppContext();

//   // const handleCartAmountChange = (amount: number, product: any) => () => {
//   //   if (amount < 1) return; // Prevent qty from going below 1
//   //   dispatch({
//   //     type: "CHANGE_CART_AMOUNT",
//   //     payload: { ...product, qty: amount }
//   //   });
//   // };

//     const handleCartAmountChange = (amount: number, product: any) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: amount }
//     });
//   };

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) => 
//       accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//     ) || 0;
//   };
  
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

//         {state.cart.length === 0 && (
//           <FlexBox
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//             height="calc(100% - 80px)">
//             <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="bonik" />
//             <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
//               Your shopping bag is empty. Start shopping
//             </Paragraph>
//           </FlexBox>
//         )}

//         {state.cart.map((item) => (
//           <Fragment key={item.id}>
//             <div className="cart-item">
//               <FlexBox alignItems="center" flexDirection="column">
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

//                 <Typography fontWeight={600} fontSize="15px" my="3px">
//                   {item.qty}
//                 </Typography>

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

//               <Link href={`/product/${item.id}`}>
//                 <Avatar
//                   size={76}
//                   mx="1rem"
//                   alt={item.name}
//                   src={item.imgUrl}
//                 />
//               </Link>

//               <div className="product-details">
//                 <Link href={`/product/${item.id}`}>
//                   <H5 className="title" fontSize="14px">
//                     {item.name}
//                   </H5>
//                 </Link>

//                 {item.discountPrice ? (
//                   <>
//                     <Tiny color="text.muted">
//                       {currency(item.discountPrice, 0)} x {item.qty}
//                     </Tiny>
//                   </>
//                 ) : (
//                   <Tiny color="text.muted">
//                     {currency(item.price, 0)} x {item.qty}
//                   </Tiny>
//                 )}

//                 <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//                   {currency(item.qty * (item.discountPrice ?? item.price))}
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
//           <Link href="/checkout">
//             <Button fullwidth color="primary" variant="contained" onClick={toggleSidenav}>
//               <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
//             </Button>
//           </Link>

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
// import { useRouter } from "next/router";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import { useRouter } from "next/navigation";

// MiniCart Component
type MiniCartProps = { toggleSidenav?: () => void };

export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
  const { state, dispatch } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Ensure the router is available

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  const handleCartAmountChange = (amount: number, product: any) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount }
    });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) =>
      accumulator + (item.discountPrice ?? item.price) * item.qty, 0
    ) || 0;
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/checkout"); // Redirect to checkout if logged in
    } else {
      router.push("/login"); // Redirect to login if not logged in
    }
  };

  const LOGIN_HANDLE = isLoggedIn ? (
    <Fragment>
      <Menu handler={
        <IconButton ml="1rem" bg="gray.200" p="8px">
          <Button fullwidth color="primary" variant="contained" onClick={toggleSidenav}>
            <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
          </Button>
        </IconButton>
      }>
        <MenuItem onClick={() => router.push("/checkout")}></MenuItem>
      </Menu>
    </Fragment>
  ) : (
    <IconButton ml="1rem" bg="gray.200" p="8px">
      <Icon size="28px">user</Icon>
    </IconButton>
  );

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {state.cart.length} item{state.cart.length !== 1 ? 's' : ''}
          </Typography>
        </FlexBox>

        <Divider />

        {state.cart.length === 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)">
            <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="empty cart" />
            <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
              Your shopping bag is empty. Start shopping
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item) => (
          <Fragment key={item.id}>
            <div className="cart-item">
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty + 1, item)}>
                  <Icon variant="small">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {item.qty}
                </Typography>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}>
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.id}`}>
                <Avatar size={76} mx="1rem" alt={item.name} src={item.imgUrl} />
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.id}`}>
                  <H5 className="title" fontSize="14px">{item.name}</H5>
                </Link>

                <Tiny color="text.muted">
                  {currency(item.discountPrice ?? item.price, 0)} x {item.qty}
                </Tiny>

                <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
                  {currency(item.qty * (item.discountPrice ?? item.price))}
                </Typography>
              </div>

              <Button
                size="none"
                padding="5px"
                color="primary"
                variant="outlined"
                borderRadius="300px"
                borderColor="primary.light"
                onClick={handleCartAmountChange(0, item)}>
                <Icon variant="small">close</Icon>
              </Button>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {state.cart.length > 0 && (
        <div className="actions">
          <Button fullwidth color="primary" variant="contained" onClick={handleCheckout}>
            <Typography fontWeight={600}>Checkout Now ({currency(getTotalPrice())})</Typography>
          </Button>
          

          <Link href="/cart">
            <Button fullwidth color="primary" variant="outlined" mt="1rem" onClick={toggleSidenav}>
              <Typography fontWeight={600}>View Cart</Typography>
            </Button>
          </Link>
        </div>
      )}
    </StyledMiniCart>
  );
}
