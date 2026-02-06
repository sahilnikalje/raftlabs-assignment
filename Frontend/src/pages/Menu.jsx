import React from 'react'
import { getMenu } from '../services/api'
import { useCart } from '../context/CartContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Menu() {
    const[menuItems, setMenuItems]=useState([])
    const[loading, setLoading]=useState(true)

    const {addToCart}=useCart()
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchMenu=async()=>{
            try{
                const data=await getMenu()
                setMenuItems(data)
            }
            catch(err){
                console.log("Failed to load menu")
            }
            finally{
                setLoading(false)
            }
        }
        fetchMenu()
    },[])

    if(loading){
        return <div>Loading menu...</div>
    }
  return (
    <div>
        <h2>Menu</h2>

      <button onClick={() => navigate('/cart')}>
        Go to Cart
      </button>

        {menuItems.map((item)=>(
            <div key={item._id} className="menu-card">

                 <img
                   src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`}
                   alt={item.name}
                   style={{
                     width: "100%",
                     height: "180px",
                     objectFit: "cover",
                     borderRadius: "10px",
                     marginBottom: "12px"
                   }}
                 />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>₹{item.price}</p>

                <button 
                onClick={()=>{addToCart(item)
                console.log("Added to cart:", item)     
                }}
                
                >Add to Cart</button>
            </div>
        ))}
    </div>
  )
}

export default Menu