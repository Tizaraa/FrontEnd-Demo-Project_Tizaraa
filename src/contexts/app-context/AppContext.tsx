// "use client";

// import { useMemo, useReducer, useContext, createContext, PropsWithChildren } from "react";

// // TYPES
// import { ActionType, InitialState, ContextProps } from "./types";
// // DATA
// import { INITIAL_CART } from "./data";

// const INITIAL_STATE = { cart: INITIAL_CART, isHeaderFixed: false,
//   authToken: null, // Initially, no user is logged in
//   userInfo: null   // Initially, no user information is available
// };





// export const AppContext = createContext<ContextProps>({
//   state: INITIAL_STATE,
//   dispatch: () => {}
// });

// // const reducer = (state: InitialState, action: ActionType) => {
// //   switch (action.type) {
// //     case "TOGGLE_HEADER":
// //       return { ...state, isHeaderFixed: action.payload };

// //     case "CHANGE_CART_AMOUNT":
// //       let cartList = state.cart;
// //       let cartItem = action.payload;
// //       let exist = cartList.find((item) => item.id === cartItem.id);

// //       if (cartItem.qty < 1) {
// //         const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
// //         return { ...state, cart: filteredCart };
// //       }

// //       // IF PRODUCT ALREADY EXITS IN CART
// //       if (exist) {
// //         const newCart = cartList.map((item) =>
// //           item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
// //         );

// //         return { ...state, cart: newCart };
// //       }

// //       return { ...state, cart: [...cartList, cartItem] };

// //     default: {
// //       return state;
// //     }
// //   }
// // };

// const reducer = (state: InitialState, action: ActionType) => {
//   switch (action.type) {
//     case 'TOGGLE_HEADER':
//       return { ...state, isHeaderFixed: action.payload };

//     case 'CHANGE_CART_AMOUNT':
//       let cartList = state.cart;
//       let cartItem = action.payload;
//       let exist = cartList.find((item) => item.id === cartItem.id);

//       if (cartItem.qty < 1) {
//         const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
//         return { ...state, cart: filteredCart };
//       }

//       if (exist) {
//         const newCart = cartList.map((item) =>
//           item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
//         );

//         return { ...state, cart: newCart };
//       }

//       return { ...state, cart: [...cartList, cartItem] };

//     case 'LOGIN':
//       return {
//         ...state,
//         authToken: action.payload.authToken,
//         userInfo: action.payload.userInfo
//       };

//     case 'LOGOUT':
//       return {
//         ...state,
//         authToken: null,
//         userInfo: null
//       };

//     case 'UPDATE_USER_INFO':
//       return {
//         ...state,
//         userInfo: action.payload
//       };

//     default:
//       return state;
//   }
// };


// export function AppProvider({ children }: PropsWithChildren) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
//   const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

//   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
// }

// export const useAppContext = () => useContext<ContextProps>(AppContext);


"use client";

import { useMemo, useReducer, useContext, createContext, PropsWithChildren, useEffect, useState } from "react";

// TYPES
import { ActionType, InitialState, ContextProps } from "./types";
// DATA
import { INITIAL_CART } from "./data";

const INITIAL_STATE = {
  cart: [], // Start with an empty cart
  isHeaderFixed: false,
  authToken: null, // Initially, no user is logged in
  userInfo: null,   // Initially, no user information is available
};

export const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

// Reducer function
const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT": {
      const cartList = state.cart;
      const cartItem = action.payload;
      const exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      const updatedCart = [...cartList, cartItem];
      return { ...state, cart: updatedCart };
    }

    case "LOGIN":
      return {
        ...state,
        authToken: action.payload.authToken,
        userInfo: action.payload.userInfo
      };

    case "LOGOUT":
      return {
        ...state,
        authToken: null,
        userInfo: null
      };

    case "UPDATE_USER_INFO":
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
};

// AppProvider component
export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isMounted, setIsMounted] = useState(false); // State to track if component has mounted

  useEffect(() => {
    // Set mounted state
    setIsMounted(true);

    // Load cart from localStorage if available
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      cart.forEach(item => {
        dispatch({ type: "CHANGE_CART_AMOUNT", payload: item }); // Dispatch to set initial cart items
      });
    }
  }, []);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Sync cart with localStorage on state change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return <AppContext.Provider value={contextValue}>{isMounted ? children : null}</AppContext.Provider>;
}

export const useAppContext = () => useContext<ContextProps>(AppContext);