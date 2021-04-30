import './Card.css';

const Card = ({id, name, price, quantity, onClick}) => {
  return (
    <div className='card'>
     <h2>{name}</h2>
     <p className='price'>{price}</p>
     <p>{quantity}</p>
     <p><button onClick={onClick}>Add to Cart</button></p>
    </div>
  )
}

export default Card;