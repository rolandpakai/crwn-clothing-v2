import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => { 
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { quantityOfCartItems } = useContext(CartContext);

  const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount>{quantityOfCartItems}</ItemCount>
    </CartIconContainer>
  )
 }

 export default CartIcon;