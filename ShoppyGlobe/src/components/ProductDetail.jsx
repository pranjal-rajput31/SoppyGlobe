// 


import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import { FaCartArrowDown } from "react-icons/fa";
import './ProductDetails.css';
import { addItem } from '../store/cartSlice';

function ProductDetail() {
  // Hooks
  const { products } = useFetchProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product._id,          // ✅ MongoDB ID
        name: product.name,       // ✅ backend field
        price: product.price,
        image: product.image,     // ✅ single image field
        quantity: 1,
      })
    );
    alert(`${product.name} added to cart!`);
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