import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToRemove) => {
  
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id
  });

  if (existingCartItem.quantity === 1) {
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

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== productToClear.id
  });
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
}