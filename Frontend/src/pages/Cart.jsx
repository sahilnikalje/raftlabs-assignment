import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id} className="cart-card">

          <img
            src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`}
            alt={item.name}
            className="card-image"
          />

          <h4>{item.name}</h4>
          <p>₹{item.price}</p>

          <div className="quantity-control">
            <button
              onClick={() =>
                updateQuantity(item._id, item.quantity - 1)
              }
              disabled={item.quantity === 1}
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item._id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalAmount}</h3>

      <button onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Cart
