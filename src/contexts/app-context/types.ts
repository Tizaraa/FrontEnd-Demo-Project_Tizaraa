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

// interface SizeColorWithPrice {
//   size: string;
//   price: number;
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
//   sizecolorwithprice?: any; 
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

// interface SizeColorWithPrice {
//   size: string;
//   price: number;
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
//   sizecolorwithprice?: any; 
//   b2bPricing?:any;
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

// types.ts
export interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  image: string | null;
  phone: string;
  status: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string | null;
  user_vercode: string | null;
}

export interface InitialState {
  cart: CartItem[];
  isHeaderFixed: boolean;
  authToken: string | null;
  userInfo: UserInfo | null;
}

export interface CartItem {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  productStock: number;
  imgUrl?: string;
  id: string | number;
  totalDiscount?: number;
  discountPrice?: number;
  productId: string | number; 
  sellerId: string | number;
  sizecolorwithprice?: any; 
  b2bPricing?:any;
  measurementUnit?:any;
  productType?: string;
  attributes?: string;
  total_amount?: number;
  shopname?: string;
  shopimage?: string;
  brand?: string;
  delivereyType?: string;
}

export type ActionType =
  | { type: 'TOGGLE_HEADER'; payload: boolean }
  | { type: 'CHANGE_CART_AMOUNT'; payload: CartItem }
  | { type: 'SET_BUY_NOW_ITEM'; payload: CartItem }
  | { type: 'LOGIN'; payload: { authToken: string, userInfo: UserInfo } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER_INFO'; payload: UserInfo }
  | { type: 'CLEAR_CART' };  // New action type to clear the cart
