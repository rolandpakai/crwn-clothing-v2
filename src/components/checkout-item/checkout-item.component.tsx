import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => { 
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
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={decrementHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearCartItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
})

export default CheckoutItem;