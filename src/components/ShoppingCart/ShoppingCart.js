import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../context';
import './ShoppingCart.css';

const ShoppingCart = ({ onClick }) => {

  const cart = useContext(CartContext);
  //total number of items in shopping cart
  const cartTotalItems = cart.length;

  return (
    <span className='cart' onClick={onClick}>
      <FiShoppingCart />
      <span className='badge'>{cartTotalItems}</span>
    </span>
  )
}

export default ShoppingCart;