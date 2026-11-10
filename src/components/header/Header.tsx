"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

import Login from "@sections/auth/Login";

import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/app-context";
import StyledHeader from "./styles";
import UserLoginDialog from "./LoginDialog";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
import Menu from "@component/Menu";
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
 const [userInfo, setUserInfo] = useState<any>(null);
 const toggleSidenav = () => setOpen(!open);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const router = useRouter();

 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());

  if (typeof window !== "undefined") {
   const storedUserInfo = localStorage.getItem("userInfo");
   if (storedUserInfo) {
    try {
     setUserInfo(JSON.parse(storedUserInfo));
    } catch (error) {
     console.error("Invalid userInfo in localStorage", error);
     setUserInfo(null);
    }
   }
  }
 }, []);

 useEffect(() => {
  // One state check per animation frame at most; passive so it never blocks scrolling.
  // setIsScrolled with an unchanged value doesn't re-render.
  let frame = 0;
  const handleScroll = () => {
   if (frame) return;
   frame = window.requestAnimationFrame(() => {
    frame = 0;
    // When scrollY is greater than 50, set isScrolled to true
    setIsScrolled(window.scrollY > 50);
   });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
   window.removeEventListener("scroll", handleScroll);
   if (frame) window.cancelAnimationFrame(frame);
  };
 }, []);

 const cartCount = state.cart.length;
 const CART_HANDLE = (
  <button type="button" className="hd-action" aria-label={`Cart, ${cartCount} items`}>
   <span className="hd-icon">
    <Icon size="20px">bag</Icon>
    {!!cartCount && (
     <span key={cartCount} className="hd-badge">
      {cartCount > 99 ? "99+" : cartCount}
     </span>
    )}
   </span>
   <span className="hd-text">
    <small>{cartCount ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "Empty"}</small>
    <strong>Cart</strong>
   </span>
  </button>
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

 // Google sign-in stores an absolute avatar URL, our own uploads store a path
 // under the image CDN.
 const profileImage = userInfo?.image
  ? String(userInfo.image).startsWith("http")
    ? userInfo.image
    : `${ApiBaseUrl.ImgUrl}${userInfo.image}`
  : null;

 const firstName = (userInfo?.name || "").trim().split(/\s+/)[0] || "there";
 const go = (url: string) => {
  handleMenuClose();
  router.push(url);
 };

 const AVATAR = profileImage ? (
  <img className="hd-avatar" src={profileImage} alt="" />
 ) : (
  <Icon size="20px">user</Icon>
 );

 const LOGIN_HANDLE = isLoggedIn ? (
  <Menu
   direction="right"
   className="hd-menu"
   handler={
    <button type="button" className="hd-action" aria-label="Account menu" aria-haspopup="menu">
     <span className={`hd-icon${profileImage ? " has-img" : ""}`}>{AVATAR}</span>
     <span className="hd-text">
      <small>Hello, {firstName}</small>
      <strong>
       My account
       <svg className="hd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
       </svg>
      </strong>
     </span>
    </button>
   }
  >
   <div className="hd-menu-head">
    <span className={`hd-icon${profileImage ? " has-img" : ""}`}>{AVATAR}</span>
    <div>
     <strong>{userInfo?.name || "My account"}</strong>
     {userInfo?.email && <small>{userInfo.email}</small>}
    </div>
   </div>
   <button type="button" className="hd-menu-item" onClick={() => go("/profile")}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
    My profile
   </button>
   <button type="button" className="hd-menu-item" onClick={() => go("/orders")}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>
    My orders
   </button>
   <button type="button" className="hd-menu-item" onClick={() => go("/wish-list")}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
    Wishlist
   </button>
   <div className="hd-menu-sep" />
   <button type="button" className="hd-menu-item is-danger" onClick={handleLogout}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
    Logout
   </button>
  </Menu>
 ) : (
  <button type="button" className="hd-action" aria-label="Sign in or register">
   <span className="hd-icon">
    <Icon size="20px">user</Icon>
   </span>
   <span className="hd-text">
    <small>Welcome</small>
    <strong>Sign in / Register</strong>
   </span>
  </button>
 );

 const WISHLIST = (
  <Tooltip title="Wishlist">
   <button
    type="button"
    className="hd-action hd-action--icon"
    aria-label="Wishlist"
    onClick={() => router.push(isLoggedIn ? "/wish-list" : "/login")}
   >
    <span className="hd-icon hd-heart">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
     </svg>
    </span>
   </button>
  </Tooltip>
 );

 return (
  <StyledHeader
   className={[className, isScrolled ? "scrolled" : ""].filter(Boolean).join(" ")}
  >
   <Container
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    height="100%"
   >
    <FlexBox className="logo" alignItems="center" mr="1rem">
     <Link href="/" className="hd-logo" aria-label="Tizaraa home">
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
     {isLoggedIn ? (
      LOGIN_HANDLE
     ) : (
      <UserLoginDialog handle={LOGIN_HANDLE}>
       <div>
        <Login />
       </div>
      </UserLoginDialog>
     )}

     {WISHLIST}

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
