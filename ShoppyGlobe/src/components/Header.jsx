

import React, { useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import './Header.css';
import axios from 'axios';

function Header() {
  const [cartCount, setCartCount] = useState(0);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // not logged in, skip

    const fetchCartCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = res.data.items || [];
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchCartCount();
  }, []);

  return (
    <div className="header">
      <Link to="/">Home</Link>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          aria-label="Search products"
          placeholder="Search products..."
          style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
        />

        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          <FaCartArrowDown />
          Cart
          {/* ✅ Cart count badge */}
          {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
          )}
        </Link>

        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Header;