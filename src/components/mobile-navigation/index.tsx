// import styled from "styled-components";

// import { Chip } from "@component/Chip";
// import Icon from "@component/icon/Icon";
// import NavLink from "@component/nav-link";
// import { useAppContext } from "@context/app-context";
// import useWindowSize from "@hook/useWindowSize";
// import { getTheme } from "@utils/utils";
// import { layoutConstant } from "@utils/constants";
// import Cookies from "js-cookie";
// //import { NextPageContext } from "next";
// import { useRouter } from "next/navigation";

// // STYLED COMPONENT
// const Wrapper = styled.div`
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: none;
//   position: fixed;
//   align-items: center;
//   justify-content: space-around;
//   height: ${layoutConstant.mobileNavHeight};
//   background: ${getTheme("colors.body.paper")};
//   box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
//   z-index: 999;

//   .link {
//     flex: 1 1 0;
//     display: flex;
//     font-size: 13px;
//     align-items: center;
//     flex-direction: column;
//     justify-content: center;

//     .icon {
//       display: flex;
//       margin-bottom: 4px;
//       align-items: center;
//       justify-content: center;
//     }
//   }

//   @media only screen and (max-width: 900px) {
//     display: flex;
//     width: 100vw;
//   }
// `;

// export default function MobileNavigationBar() {
//   const width = useWindowSize();
//   const { state } = useAppContext();
//   const router = useRouter();
//   const token = Cookies.get("token");

//   //If token is not found, redirect to login page
//   // if (!token) {
//   //   router.push("/login");
//   //   return null; // Return null or loading component while redirecting
//   // }

//   if (width <= 900) {
//     return (
//       <Wrapper>
//         {list.map((item) => (
//           <NavLink className="link" href={item.href} key={item.title}>
//             <Icon className="icon" variant="small">
//             {item.icon}
//             </Icon>

//             {item.title}

//             {item.title === "Cart" && !!state.cart.length && (
//               <Chip
//                 top="4px"
//                 px="0.25rem"
//                 fontWeight="600"
//                 bg="primary.main"
//                 position="absolute"
//                 color="primary.text"
//                 left="calc(50% + 8px)">
//                 {state.cart.length}
//               </Chip>
//             )}
//           </NavLink>
//         ))}
//       </Wrapper>
//     );
//   }
//   //router.push("/login");
//   return null;
// }

// const list = [
//   { title: "Home", icon: "home", href: "/" },
//   { title: "Category", icon: "category", href: "/mobile-category-nav" },
//   { title: "Cart", icon: "bag", href: "/cart" },
//   { title: "Account", icon: "user-2", href: "/profile" }
// ];

import styled, { keyframes } from "styled-components";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import NavLink from "@component/nav-link";
import { useAppContext } from "@context/app-context";
import useWindowSize from "@hook/useWindowSize";
import { getTheme } from "@utils/utils";
import { layoutConstant } from "@utils/constants";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import authService from "services/authService";

// STYLED COMPONENT
const tap = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(0.88); }
 100% { transform: scale(1); }
`;
const badgePop = keyframes`
 0% { transform: scale(0.4); }
 60% { transform: scale(1.25); }
 100% { transform: scale(1); }
`;

// Phone tab bar: active tab gets an ember pill behind its icon + a top
// indicator; cart count pops when it changes; respects the iPhone home bar.
const Wrapper = styled.nav`
 left: 0;
 right: 0;
 bottom: 0;
 display: none;
 position: fixed;
 align-items: stretch;
 justify-content: space-around;
 height: calc(${layoutConstant.mobileNavHeight} + env(safe-area-inset-bottom));
 padding: 6px 8px env(safe-area-inset-bottom);
 background: rgba(255, 255, 255, 0.94);
 backdrop-filter: blur(12px);
 -webkit-backdrop-filter: blur(12px);
 border-top: 1px solid ${({ theme }) => theme.tz.color.line};
 box-shadow: 0 -8px 24px rgba(14, 52, 96, 0.08);
 z-index: 999;

 .link {
  position: relative;
  flex: 1 1 0;
  display: flex;
  min-height: 44px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-radius: 14px;
  font-size: 11.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 180ms ease;
 }
 .link:active .mn-icon {
  animation: ${tap} 260ms ease;
 }
 .mn-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 30px;
  border-radius: 999px;
  transition: background-color 220ms ease, color 220ms ease;
 }
 .mn-icon > div {
  display: flex;
 }
 .link.is-active {
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-weight: 800;
 }
 .link.is-active .mn-icon {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 /* small bar above the active tab */
 .link::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  width: 24px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: ${({ theme }) => theme.tz.color.ember};
  transform: translateX(-50%) scaleX(0);
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .link.is-active::before {
  transform: translateX(-50%) scaleX(1);
 }
 .mn-badge {
  position: absolute;
  top: -4px;
  left: calc(50% + 6px);
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 14px;
  text-align: center;
  animation: ${badgePop} 380ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .link:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media only screen and (max-width: 900px) {
  display: flex;
  width: 100vw;
 }
 @media (prefers-reduced-motion: reduce) {
  .link,
  .mn-icon,
  .link::before {
   transition: none;
  }
  .link:active .mn-icon,
  .mn-badge {
   animation: none;
  }
 }
`;

export default function MobileNavigationBar() {
 const width = useWindowSize();
 const { state } = useAppContext();
 const router = useRouter();
 const pathname = usePathname() || "/";
 const token = authService.getToken(); // Assuming this function gets the token

 const handleAccountClick = (href) => {
  if (!token) {
   router.push("/login");
  } else {
   router.push(href);
  }
 };

 // which tab is "current"
 const isActive = (href: string) => {
  if (href === "/") return pathname === "/";
  if (href === "/profile")
   return ["/profile", "/orders", "/address", "/wish-list", "/credit-history", "/support-tickets"].some((p) =>
    pathname.startsWith(p)
   );
  if (href === "/mobile-category-nav") return pathname.startsWith("/mobile-category-nav") || pathname.startsWith("/category");
  return pathname.startsWith(href);
 };

 if (width <= 900) {
  const count = state.cart.length;
  return (
   <Wrapper aria-label="Main">
    {list.map((item) => {
     const active = isActive(item.href);
     return (
      <NavLink
       className={`link${active ? " is-active" : ""}`}
       href={item.href}
       key={item.title}
       aria-current={active ? "page" : undefined}
       onClick={(e) => {
        if (item.title === "Account") {
         e.preventDefault();
         handleAccountClick(item.href);
        }
       }}
      >
       <span className="mn-icon">
        <Icon variant="small">{item.icon}</Icon>
        {item.title === "Cart" && !!count && (
         <span key={count} className="mn-badge" aria-label={`${count} items in cart`}>
          {count > 99 ? "99+" : count}
         </span>
        )}
       </span>
       {item.title}
      </NavLink>
     );
    })}
   </Wrapper>
  );
 }

 return null;
}

const list = [
 { title: "Home", icon: "home", href: "/" },
 { title: "Category", icon: "category", href: "/mobile-category-nav" },
 { title: "Cart", icon: "bag", href: "/cart" },
 { title: "Account", icon: "user-2", href: "/profile" },
];
