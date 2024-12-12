

// "use client";

// import { useMemo, useReducer, useContext, createContext, PropsWithChildren, useEffect, useState } from "react";

// // TYPES
// import { ActionType, InitialState, ContextProps } from "./types";
// import { toast, ToastContainer } from "react-toastify";

// // Initial State
// const INITIAL_STATE: InitialState = {
//   cart: [], // Start with an empty cart
//   isHeaderFixed: false,
//   authToken: null, // Initially, no user is logged in
//   userInfo: null,   // Initially, no user information is available
// };


// export const AppContext = createContext<ContextProps>({
//   state: INITIAL_STATE,
//   dispatch: () => {}
// });



//  // Helper function to get the applicable B2B price based on quantity
//  const getB2BPrice = (quantity, b2bPricing) => {
//   const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
//   applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
//   return applicablePricing.length > 0 ? applicablePricing[0].price : null;
// };
// // Helper functions
// const updateCartItem = (
//   cart: any[],
//   cartItem: any
// ) => {
//   const exist = cart.find((item) => item.id === cartItem.id);
//   // Check if the requested quantity exceeds stock
//   if (cartItem.qty > cartItem.productStock) {
//     //toast.error("Out of Stock");// Display toast message
//     return cartItem; // Do not update the cart
//   }
  
//   // Calculate the price based on quantity and B2B pricing if available
//   let calculatedPrice = cartItem.price; // Default to base price
//   let b2bPricing =cartItem.b2bPricing;
  
//   console.log(cartItem);
//   //toast.error("Out of Stock");


//   if (b2bPricing && cartItem.qty > 0) {
   
//     // Check if B2B pricing applies based on quantity
//     let applicablePricing = getB2BPrice(cartItem.qty , b2bPricing) || calculatedPrice;


//     if (applicablePricing) {
     
//       calculatedPrice = applicablePricing; // Use the best applicable B2B price
//     }
//   }

//   // Update quantity and price if item already exists
//   if (exist) {
//     if (cartItem.qty < 1) {
//       return cart.filter((item) => item.id !== cartItem.id); // Remove item if qty is less than 1
//     }
//     return cart.map((item) =>
//       item.id === cartItem.id ? { ...item, qty: cartItem.qty, price: calculatedPrice } : item
//     );
//   }

//   // If the item is new, add it to the cart with the calculated price
//   return [...cart, { ...cartItem, qty: cartItem.qty, price: calculatedPrice }];
// };

// // Reducer function
// const reducer = (state: InitialState, action: ActionType) => {
//   switch (action.type) {
//     case "TOGGLE_HEADER":
//       return { ...state, isHeaderFixed: action.payload };

//     case "CHANGE_CART_AMOUNT": {
//       const newCart = updateCartItem(state.cart, action.payload);
//       return { ...state, cart: newCart };
//     }

    

//     case "LOGIN":
//       return {
//         ...state,
//         authToken: action.payload.authToken,
//         userInfo: action.payload.userInfo
//       };

//     case "LOGOUT":
//       return {
//         ...state,
//         authToken: null,
//         userInfo: null
//       };

//     case "UPDATE_USER_INFO":
//       return {
//         ...state,
//         userInfo: action.payload
//       };

//     default:
//       return state;
//   }
// };

// // Custom hook to handle local storage
// const useLocalStorage = (key: string, initialValue: any) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: any) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return [storedValue, setValue];
// };

// // AppProvider component
// export function AppProvider({ children }: PropsWithChildren) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
//   const [isMounted, setIsMounted] = useState(false);
//   const [storedCart, setStoredCart] = useLocalStorage("cart", []);

//   useEffect(() => {
//     setIsMounted(true);
//     if (storedCart.length > 0) {
//       storedCart.forEach(item => {
//         dispatch({ type: "CHANGE_CART_AMOUNT", payload: item });
//       });
//     }
//   }, [storedCart]);

//   const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

//   // Save cart to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cart));
//   }, [state.cart]);

//   return (
//     <AppContext.Provider value={contextValue}>
//       {isMounted ? children : null}
//     </AppContext.Provider>
//   );
// }

// export const useAppContext = () => useContext<ContextProps>(AppContext);


"use client";

import { useMemo, useReducer, useContext, createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// TYPES
interface InitialState {
  cart: any[];
  isHeaderFixed: boolean;
  authToken: string | null;
  userInfo: any | null;
  selectedProducts: (string | number)[];
}

interface ContextProps {
  state: InitialState;
  dispatch: React.Dispatch<ActionType>;
}

type ActionType =
  | { type: "TOGGLE_HEADER"; payload: boolean }
  | { type: "CHANGE_CART_AMOUNT"; payload: any }
  | { type: "LOGIN"; payload: { authToken: string; userInfo: any } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER_INFO"; payload: any }
  | { type: "SELECT_PRODUCT"; payload: string | number }
  | { type: "DESELECT_PRODUCT"; payload: string | number }
  | { type: "SELECT_ALL_PRODUCTS" }
  | { type: "DESELECT_ALL_PRODUCTS" };

// Initial State
const INITIAL_STATE: InitialState = {
  cart: [],
  isHeaderFixed: false,
  authToken: null,
  userInfo: null,
  selectedProducts: [],
};

export const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

// Helper function to get the applicable B2B price based on quantity
const getB2BPrice = (quantity, b2bPricing) => {
  const applicablePricing = b2bPricing.filter(b => quantity >= b.min_qty);
  applicablePricing.sort((a, b) => b.min_qty - a.min_qty);
  return applicablePricing.length > 0 ? applicablePricing[0].price : null;
};

// Helper functions
const updateCartItem = (cart: any[], cartItem: any) => {
  const exist = cart.find((item) => item.id === cartItem.id);
  if (cartItem.qty > cartItem.productStock) {
    return cart; // Do not update the cart
  }
  
  let calculatedPrice = cartItem.price;
  let b2bPricing = cartItem.b2bPricing;
  
  if (b2bPricing && cartItem.qty > 0) {
    let applicablePricing = getB2BPrice(cartItem.qty, b2bPricing) || calculatedPrice;
    if (applicablePricing) {
      calculatedPrice = applicablePricing;
    }
  }

  if (exist) {
    if (cartItem.qty < 1) {
      return cart.filter((item) => item.id !== cartItem.id);
    }
    return cart.map((item) =>
      item.id === cartItem.id ? { ...item, qty: cartItem.qty, price: calculatedPrice } : item
    );
  }

  return [...cart, { ...cartItem, qty: cartItem.qty, price: calculatedPrice }];
};

// Reducer function
const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT": {
      const newCart = updateCartItem(state.cart, action.payload);
      return { ...state, cart: newCart };
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

    case "SELECT_PRODUCT":
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload]
      };

    case "DESELECT_PRODUCT":
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(id => id !== action.payload)
      };

    case "SELECT_ALL_PRODUCTS":
      return {
        ...state,
        selectedProducts: state.cart.map(item => item.id)
      };

    case "DESELECT_ALL_PRODUCTS":
      return {
        ...state,
        selectedProducts: []
      };

    default:
      return state;
  }
};

// Custom hook to handle local storage
const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// AppProvider component
export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isMounted, setIsMounted] = useState(false);
  const [storedCart, setStoredCart] = useLocalStorage("cart", []);

  useEffect(() => {
    setIsMounted(true);
    if (storedCart.length > 0) {
      storedCart.forEach(item => {
        dispatch({ type: "CHANGE_CART_AMOUNT", payload: item });
      });
    }
  }, [storedCart]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  

  useEffect(() => {
    // Restore cart and selected products from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedSelectedProducts = JSON.parse(
      localStorage.getItem("selectedProducts") || "[]"
    );

    if (storedCart.length > 0) {
      setIsMounted(true);
      storedCart.forEach((item) => {
        dispatch({ type: "CHANGE_CART_AMOUNT", payload: item });
      });
    }

    if (storedSelectedProducts.length > 0) {
      storedSelectedProducts.forEach((id: string | number) => {
        dispatch({ type: "SELECT_PRODUCT", payload: id });
      });
    }
  }, [storedCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(state.selectedProducts)
    );
  }, [state.cart, state.selectedProducts]);

  return (
    <AppContext.Provider value={contextValue}>
      {isMounted ? children : null}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext<ContextProps>(AppContext);

