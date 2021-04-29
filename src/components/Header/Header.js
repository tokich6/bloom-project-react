import Cart from '../Cart/Cart';
import './Header.css';



const Header = () => {
  return (
    <>
      <header className="App-header">
        <h1>
          Welcome to our store
        </h1>
        <Cart />
      </header>
    </>
  )
}

export default Header;