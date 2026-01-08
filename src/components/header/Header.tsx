"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

import Login from "@sections/auth/Login";

import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/app-context";
import StyledHeader from "./styles";
import UserLoginDialog from "./LoginDialog";
import authService from "services/authService";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function Header({ isFixed, className }: HeaderProps) {
 const { state } = useAppContext();
 const [open, setOpen] = useState(false);
 const toggleSidenav = () => setOpen(!open);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const router = useRouter();

 // Get user info from local storage for set user name in header (user icon)
 const storedUserInfo = localStorage.getItem("userInfo");
 // Parse the stored string to an object
 const userInfo = JSON.parse(storedUserInfo);
 // Now you can access the name property
 // console.log("User Name: ", userInfo.name);

 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 useEffect(() => {
  const handleScroll = () => {
   // When scrollY is greater than 50, set isScrolled to true
   if (window.scrollY > 50) {
    setIsScrolled(true);
   } else {
    setIsScrolled(false);
   }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const CART_HANDLE = (
  <Box ml="20px" position="relative">
   <Tooltip title="Cart">
    <IconButton bg="gray.200" p="12px" size="small">
     <Icon size="20px">bag</Icon>
    </IconButton>
   </Tooltip>

   {!!state.cart.length && (
    <FlexBox
     top={-5}
     right={-5}
     height={20}
     minWidth={20}
     bg="primary.main"
     borderRadius="50%"
     alignItems="center"
     position="absolute"
     justifyContent="center"
    >
     <Tiny color="white" fontWeight="600" lineHeight={1}>
      {state.cart.length}
     </Tiny>
    </FlexBox>
   )}
  </Box>
 );
 const handleLogout = () => {
  authService.logout();
  setAnchorEl(null);
  Cookies.remove("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  setIsLoggedIn(false); // Update login state
  //Cookies.remove("token");
  router.push("/login");
  toast.success("Logout Successfully");
 };

 const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
 };
 const handleMenuClose = () => {
  setAnchorEl(null);
 };

 const LOGIN_HANDLE = isLoggedIn ? (
  <Fragment>
   <Menu
    handler={
     // <Tooltip title="User">
     <Tooltip title={userInfo.name || "User"}>
      <IconButton ml="1rem" bg="gray.200" p="8px">
       <Icon size="28px">user</Icon>
      </IconButton>
     </Tooltip>
    }
   >
    <MenuItem
     onClick={() => {
      handleMenuClose();
      router.push("/profile");
     }}
    >
     Profile Page
    </MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
   </Menu>
  </Fragment>
 ) : (
  <Tooltip title="Login">
   <IconButton
    ml="1rem"
    bg="gray.200"
    p="8px"
    onClick={() => {
     router.push("/login");
    }}
   >
    <Icon size="28px">user</Icon>
   </IconButton>
  </Tooltip>
 );

 // #f18c5138

 return (
  <StyledHeader
   className={className}
   style={{
    backgroundColor: isScrolled
     ? "white" // Remove transparency when scrolled
     : "rgba(241, 140, 81, 0.22)", // Transparent background when not scrolled
   }}
  >
   <Container
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    height="100%"
   >
    <FlexBox className="logo" alignItems="center" mr="1rem">
     <Link href="/">
      <Image
       src="/assets/images/tizaraa_logo.png"
       alt="logo"
       width="200px"
       height="90px"
      />
     </Link>

     {isFixed && (
      <div className="category-holder">
       <Categories>
        <FlexBox color="text.hint" alignItems="center" ml="1rem">
         <Icon>categories</Icon>
         <Icon>arrow-down-filled</Icon>
        </FlexBox>
       </Categories>
      </div>
     )}
    </FlexBox>

    <FlexBox justifyContent="center" flex="1 1 0">
     <SearchInputWithCategory />
    </FlexBox>

    <FlexBox className="header-right" alignItems="center">
     <UserLoginDialog handle={LOGIN_HANDLE}>
      <div>
       <Login />
      </div>
     </UserLoginDialog>

     <Sidenav
      open={open}
      width={380}
      position="right"
      handle={CART_HANDLE}
      toggleSidenav={toggleSidenav}
     >
      <MiniCart toggleSidenav={toggleSidenav} />
     </Sidenav>
    </FlexBox>
   </Container>
  </StyledHeader>
 );
}
