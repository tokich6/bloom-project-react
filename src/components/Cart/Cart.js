import { useState, useContext } from 'react';
import { CartContext } from '../context';
import './Cart.css';

const Cart = ({ onClick, emptyCart }) => {

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isError, setIsError] = useState(false);
  const cartt = useContext(CartContext);

  //creates an array of items which is stringified on postOrder before added to db  
  const items = (arr) => {
    return arr.map(el => {
      return `${el.productName} (${el.quantity})`;
    })
  }
  //lists the items in the cart on cartview
  const cartItems = cartt.map((el, index) => (
    <li key={index} >
      {`${el.productName}: $${el.price} (${el.quantity})`}
    </li>
  ));
  //order total to add to db
  let cartTotal = cartt.reduce((total, { price = 0 }) => total + parseInt(price), 0);
  //order total to dispay
  function getTotal() {
    return cartTotal.toLocaleString()
  }

  // date to be added to db 
  const today = new Date();
  const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

  const handleCheckOut = () => {
    console.log('items checked out');
    postOrder()
    emptyCart([]);
    setIsOrderPlaced(true);
  }

  async function postOrder() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: date,
        items: items(cartt).toLocaleString(),
        total: cartTotal
      })
    };
    const url = 'http://localhost:3002/orders';

    try {
      const response = await fetch(url, requestOptions);
      console.log(`Status of postOrder: ${response.statusText}`);
    } catch (err) {
      setIsError(true);
      console.log(err);
    }
  }

  return (
    <>
      {
        <section>
          <ul>
            {cartItems}
          </ul>
          {isOrderPlaced && !isError && <p>Thank you for your order!</p>}
          {cartItems.length === 0 && !isOrderPlaced && <p> Cart is empty ... </p>}
          {cartItems.length > 0 && <p>Total to pay: ${getTotal()} </p>}
          {isError && <p>Sorry, something went wrong...Unable to place your order</p>}

          <button onClick={onClick}> Back to store</button>
          <button onClick={handleCheckOut} disabled={cartItems.length === 0}> Checkout</button>
        </section>
      }
    </>
  )
}

export default Cart;