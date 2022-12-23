import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.scss';

const CartDropdown = () => { 
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => { 
    navigate('/checkout');
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map((cartItem) => {
            return (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            )
          })
        }
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;