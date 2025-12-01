import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Call your backend instead of dummyjson
        const response = await fetch("http://localhost:5000/products");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Backend returns array directly
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;