import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../store/searchSlice';

function Header() {
  // Hooks
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query || '');
//Render
  return (
    <div className="header">
      <Link to="/">Home</Link>
    
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          aria-label="Search products"
          placeholder="Search products..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
        />

        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaCartArrowDown />
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Header;
