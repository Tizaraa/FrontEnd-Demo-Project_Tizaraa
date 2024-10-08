// export interface ContextProps {
//   state: InitialState;
//   dispatch: (args: ActionType) => void;
// }

// export interface UserInfo {
//   id: number;
//   name: string;
//   email: string;
//   image: string | null; // Image can be null
//   phone: string;
//   status: number;
//   email_verified_at: string | null; // Can be null
//   created_at: string; // ISO date string
//   updated_at: string | null; // Can be null
//   user_vercode: string | null; // Can be null, add if applicable
// }


// // export interface InitialState {
// //   cart: CartItem[];
// //   isHeaderFixed: boolean;
// // }

// export interface InitialState {
//   cart: CartItem[];
//   isHeaderFixed: boolean;
//   authToken: string | null;
//   userInfo: UserInfo | null;
// }


// export interface CartItem {
//   qty: number;
//   name: string;
//   slug?: string;
//   price: number;
//   imgUrl?: string;
//   id: string | number;
//   totalDiscount?: number;
//   discountPrice?: number;
//   productId: string | number; 
//   sellerId: string | number;
// }



// interface CartActionType {
//   type: "CHANGE_CART_AMOUNT";
//   payload: CartItem;
// }

// interface LayoutActionType {
//   type: "TOGGLE_HEADER";
//   payload: boolean;
// }

// // export type ActionType = CartActionType | LayoutActionType;

// export type ActionType =
//   | { type: 'TOGGLE_HEADER'; payload: boolean }
//   | { type: 'CHANGE_CART_AMOUNT'; payload: CartItem }
//   | { type: 'LOGIN'; payload: { authToken: string, userInfo: UserInfo } }
//   | { type: 'LOGOUT' }
//   | { type: 'UPDATE_USER_INFO'; payload: UserInfo };



import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// User Information Interface
interface UserInfo {
  id: number;
  name: string;
  email: string;
  image: string | null; // Image can be null
  phone: string;
  status: number;
  email_verified_at: string | null; // Can be null
  created_at: string; // ISO date string
  updated_at: string | null; // Can be null
  user_vercode: string | null; // Can be null
}

// Cart Item Interface
interface CartItem {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  totalDiscount?: number;
  discountPrice?: number;
  productId: string | number;
  sellerId: string | number;
}

// Initial State Interface
interface InitialState {
  cart: CartItem[];
  isHeaderFixed: boolean;
  authToken: string | null;
  userInfo: UserInfo | null;
  orderCount: number; // Manage the number of orders
}

// Action Types
type ActionType =
  | { type: 'TOGGLE_HEADER'; payload: boolean }
  | { type: 'CHANGE_CART_AMOUNT'; payload: CartItem }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; payload: { authToken: string; userInfo: UserInfo } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER_INFO'; payload: UserInfo }
  | { type: 'SET_ORDER_COUNT'; payload: number }; // Manage order count

// Create Context
interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

// Reducer Implementation
const appReducer = (state: InitialState, action: ActionType): InitialState => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };
    case "CHANGE_CART_AMOUNT":
      if (!action.payload) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] }; // Clear the cart
    case "LOGIN":
      return {
        ...state,
        authToken: action.payload.authToken,
        userInfo: action.payload.userInfo,
      };
    case "LOGOUT":
      return {
        ...state,
        authToken: null,
        userInfo: null,
        cart: [], // Clear the cart on logout
        orderCount: 0, // Reset order count on logout
      };
    case "UPDATE_USER_INFO":
      return { ...state, userInfo: action.payload };
    case "SET_ORDER_COUNT":
      return { ...state, orderCount: action.payload }; // Set the order count
    default:
      return state;
  }
};

// Define the initial state
const initialState: InitialState = {
  cart: [],
  isHeaderFixed: false,
  authToken: null,
  userInfo: null,
  orderCount: 0, // Initial order count
};

