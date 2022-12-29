import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => { 
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const incrementHandler = () => { 
    dispatch(addItemToCart(cartItems, cartItem));
  }

  const decrementHandler = () => { 
    dispatch(removeItemFromCart(cartItems, cartItem));
  }

  const clearCartItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className='arrow' onClick={decrementHandler}>&#10094;</div>
          <span className='value'>{quantity}</span>
        <div className='arrow' onClick={incrementHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearCartItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;