import Cart from '../ShoppingCart/ShoppingCart';
import './Header.css';

const Header = ({ onCartClick }) => {
  return (
    <>
      <header className="App-header">
        <h1>
          Shopping
        </h1>
        <Cart onClick={onCartClick} />
      </header>
    </>
  )
}

export default Header;