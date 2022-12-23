import { createContext, useEffect, useState } from "react";

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
  quantityOfCartItems: 0,
  total: 0,
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantityOfCartItems, setQuantityOfCartItems] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newQuantityOfCartItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity 
    }, 0);

    setQuantityOfCartItems(newQuantityOfCartItems);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price 
    }, 0);

    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart,
    cartItems, 
    quantityOfCartItems,
    total,
  };

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  )
}