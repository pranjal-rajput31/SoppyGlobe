// 


import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';
import { FaCartArrowDown } from "react-icons/fa";
import './ProductDetails.css';
import axios from 'axios';

function ProductDetail() {
  // Hooks
  const { products } = useFetchProducts();
  const { id } = useParams();
  const navigate = useNavigate();


  // ✅ Match MongoDB _id instead of dummyjson id
  const product = products.find((prod) => prod._id === id);

  // Handle product not found
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Product not found.</h2>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Handler to add product to cart
  const handleAddToCart = async (e) => {
     e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token"); // JWT from login

    try {
      await axios.post(
        "http://localhost:5000/cart", // backend route
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item. Please log in first.");
    }
  };


  // Render
  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Products
      </button>

      <div className="detail-container">
        <div className="detail-images">
          <img
            src={product.image}
            alt={product.name}
            className="detail-main-image"
            loading="lazy"
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating">
            <span className="rating-value">★ {product.rating}/5</span>
            <span className="stock-status">
              {product.stock > 0 ? '✓ In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-specs">
            <p><strong>Category:</strong> {product.category || 'N/A'}</p>
            <p><strong>Stock Available:</strong> {product.stock}</p>
          </div>

          <div className="detail-price-section">
            <div className="price-info">
              <span className="current-price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="discount">-{product.discountPercentage}% OFF</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="add-to-cart-button"
            >
              <FaCartArrowDown style={{ marginRight: '8px' }} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;