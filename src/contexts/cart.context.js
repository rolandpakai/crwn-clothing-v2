import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const carReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: return {
      ...state,
      ...payload
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: return {
      ...state,
      isCartOpen: payload
    }
    default: throw new Error(`Unhandled type: ${type}`)
  }
}

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(carReducer, INITIAL_STATE);
  const{ cartItems, isCartOpen, cartTotal, cartCount} = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity 
    }, 0);

    const newCartTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price 
    }, 0);

    dispatch(
      createAction( 'SET_CART_ITEMS',
      {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      }
    ));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen =  (isCartOpen) => {
    dispatch(
      createAction('SET_IS_CART_OPEN', isCartOpen)
    );
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart,
    cartItems, 
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  )
}