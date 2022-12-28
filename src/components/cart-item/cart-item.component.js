import {CartItemContainer, ItemDetails, CartItemImg, ItemName, ItemPrice} from './cart-item.styles';

const CartItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={name}/>
      <ItemDetails>
        <ItemName className="name">{name}</ItemName>
        <ItemPrice className="price">{quantity} x {price}</ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;