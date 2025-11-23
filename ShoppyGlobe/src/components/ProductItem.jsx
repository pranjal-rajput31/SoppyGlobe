import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ProductItem.css';

import { FaCartArrowDown } from "react-icons/fa";
import { addItem } from '../store/cartSlice';

function ProductItem({ product }) {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
// Handlers
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
// Dispatch add item action
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      })
    );

    alert(`${product.title} added to cart!`);
  };
// Handler to view product details
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };
// Render
  return (
    // Product Item Card
    <div className="product-item-card" onClick={handleViewDetails}>
      <div className="product-image-container">
        <img src={product.images[0]} alt={product.title} className="product-item-image" loading="lazy" />
        {product.discountPercentage && (
          <div className="discount-badge">-{product.discountPercentage}%</div>
        )}
      </div>
        {/* product information */}
      <div className="product-item-info">
        <h3 className="product-item-title">{product.title}</h3>
        
        <p className="product-item-description">
          {product.description.length > 50 
            ? product.description.substring(0, 50) + '...' 
            : product.description}
        </p>

        <div className="product-item-rating">
          <span className="rating-stars">★ {product.rating}/5</span>
          <span className="in-stock">{product.stock > 0 ? '✓ In Stock' : 'Out of Stock'}</span>
        </div>

        <div className="product-item-footer">
          <div className="product-item-price">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={product.stock === 0}
          >
            <FaCartArrowDown style={{ fontSize: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;