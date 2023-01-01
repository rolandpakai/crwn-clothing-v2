import { FC } from 'react';
import {CartItemContainer, ItemDetails, CartItemImg, ItemName, ItemPrice} from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={name}/>
      <ItemDetails>
        <ItemName className="name">{name}</ItemName>
        <ItemPrice className="price">{quantity} x ${price}</ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;