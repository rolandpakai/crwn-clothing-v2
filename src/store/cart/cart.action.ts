import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem):CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id
  });

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      if(cartItem.id === productToAdd.id) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      } else {
        return cartItem;
      }
    });
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem):CartItem[] => {
  
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id
  });

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== productToRemove.id
    });
  }

  return cartItems.map((cartItem) => {
    if(cartItem.id === productToRemove.id) {
      return {...cartItem, quantity: cartItem.quantity - 1}
    } else {
      return cartItem;
    }
  });
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== productToClear.id
  });
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));


export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
