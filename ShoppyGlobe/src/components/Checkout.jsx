import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from '../store/cartSelectors'
import { clearCart } from '../store/cartSlice'
import './Checkout.css'

function Checkout() {
// Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const totalPrice = useSelector(selectCartTotalPrice)
  const totalQuantity = useSelector(selectCartTotalQuantity)
// State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [placed, setPlaced] = useState(false)
// Handlers
  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Basic validation
    if (!name.trim() || !email.trim() || !address.trim()) {
      alert('Please fill in name, email and address before placing the order.')
      return
    }

    // Simulate placing order: clear cart, show message, redirect
    dispatch(clearCart())
    setPlaced(true)

    // After 1.8s redirect to home
    setTimeout(() => {
      navigate('/')
    }, 1800)
  }
// Render
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {placed ? (
        <div className="order-placed">Order placed</div>
      ) : (
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Shipping Details</h2>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
              Address
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>

            <button className="place-order-btn" type="submit">Place Order</button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {items && items.length > 0 ? (
                items.map((it) => (
                  <div key={it.id} className="summary-item">
                    <img src={it.image} alt={it.title} loading="lazy" />
                    <div>
                      <div className="s-title">{it.title}</div>
                      <div className="s-meta">Qty: {it.quantity}</div>
                    </div>
                    <div className="s-price">${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>

            <div className="summary-footer">
              <div className="row"><span>Items</span><span>{totalQuantity}</span></div>
              <div className="row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="row total"><span>Total</span><span>${(totalPrice).toFixed(2)}</span></div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Checkout
