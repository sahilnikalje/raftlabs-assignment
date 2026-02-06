import React, { useEffect, useState } from 'react'
import { getMenu } from '../services/api'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const { addToCart, cartItems } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu()
        setMenuItems(data)
      } catch (err) {
        console.log("Failed to load menu")
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) {
    return <div>Loading menu...</div>
  }

  return (
    <div>
      <h2>Menu</h2>

      <button onClick={() => navigate('/cart')}>
        Go to Cart ({cartItems.length})
      </button>

      {menuItems.map((item) => {
        const inCart = cartItems.find(
          (cartItem) => cartItem._id === item._id
        )

        return (
          <div key={item._id} className="menu-card">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`}
              alt={item.name}
              className="card-image"
            />

            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p><strong>₹{item.price}</strong></p>

            <button
              onClick={() => addToCart(item)}
              disabled={!!inCart}
            >
              {inCart ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Menu
