import { useState, useEffect } from 'react';
import { CartContext } from './components/context';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Card from './components/Card/Card';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIventory() {
      const url = 'http://localhost:3001/products';
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(url)
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchIventory();
  }, []);

//displays inventory items once fetched
  const populateProductCards = (arr) => {
    return arr.map((el, index) => {
      return (
        <Card
          key={index}
          name={el.name}
          price={`Price: $${el.price}`}
          id={`id: ${el.id}`}
          quantity={`Currently in stock: ${el.quantity}`}
          onClick={() => {
            addToCart(el)
          }}
        />
      )
    })
  }
//add products clicked on to cart
  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1
    }]);
  }
//displays cart content
  const handleCartClick = () => setViewCart(true);
//displays inventory items for browsing
  const handleCartView = () => setViewCart(false);

  return (
    <>
      <CartContext.Provider value={cart}>
        <Header onCartClick={handleCartClick} />
        {isError && <h3 className='error'>Sorry, something went wrong ...</h3>}
        {
          !viewCart ?
            <div className='products-container'>
              {isLoading ? <h3 className='loading'>Loading ...</h3> :
                populateProductCards(inventory)
              }
            </div> :
            <Cart onClick={handleCartView} emptyCart={setCart} />
        }
      </CartContext.Provider>
    </>

  );
}

export default App;
