
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductItem.css";
import { FaCartArrowDown } from "react-icons/fa";

function ProductItem({ product }) {
  const navigate = useNavigate();

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

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-item-card" onClick={handleViewDetails}>
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-item-image"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <div className="discount-badge">-{product.discountPercentage}%</div>
        )}
      </div>

      <div className="product-item-info">
        <h3 className="product-item-title">{product.name}</h3>

        <p className="product-item-description">
          {product.description.length > 50
            ? product.description.substring(0, 50) + "..."
            : product.description}
        </p>

        <div className="product-item-rating">
          <span className="rating-stars">★ {product.rating}/5</span>
          <span className="in-stock">
            {product.stock > 0 ? "✓ In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="product-item-footer">
          <div className="product-item-price">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={product.stock === 0}
          >
            <FaCartArrowDown style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;