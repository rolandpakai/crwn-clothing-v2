import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

  const existingCartItems = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id
  });

  if (existingCartItems) {
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  quantityOfCartItems: 0
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantityOfCartItems, setQuantityOfCartItems] = useState(0);

  useEffect(() => {
    const newQuantityOfCartItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity 
    }, 0);

    setQuantityOfCartItems(newQuantityOfCartItems);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    //setQuantityOfCartItems(quantityOfCartItems + 1);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, quantityOfCartItems};

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  )
}