import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import './productlist.css'
import { useSelector } from 'react-redux';

function ProductList() {
  // Hooks
  const { products, loading, error } = useFetchProducts();
// Get search query from Redux store
  const query = useSelector((state) => state.search.query || '');
// Handle loading and error states
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>;
  }
// Handle error state
  if (error) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;
  }
// Filter products based on search query
  const q = (query || '').trim().toLowerCase();
  const filteredProducts = q
    ? products.filter((p) => {
        const title = (p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const category = (p.category || '').toLowerCase();
        return (
          title.includes(q) ||
          desc.includes(q) ||
          brand.includes(q) ||
          category.includes(q)
        );
      })
    : products;
// Render
  return (
    <div className="product-list-container">
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Our Products</h2>
        <div className='main'>
            {
               filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>{q ? `No results for "${query}"` : 'No products available'}</p>
              )
            }
        </div>
      
    </div>
  );
}

export default ProductList;