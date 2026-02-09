import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['ALL', 'ELECTRONICS', 'BOOKS', 'FASHION', 'ACADEMICS', 'OTHER'];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Use URLSearchParams to get search and category from URL
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get('search') || '';
    const categoryQuery = query.get('category') || 'ALL';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get('/products', {
                    params: {
                        search: searchQuery,
                        category: categoryQuery
                    }
                });
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Collection temporarily unavailable.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, categoryQuery]);

    const handleCategoryChange = (cat) => {
        const newQuery = new URLSearchParams(location.search);
        if (cat === 'ALL') {
            newQuery.delete('category');
        } else {
            newQuery.set('category', cat);
        }
        navigate(`/products?${newQuery.toString()}`);
    };

    const handleOrder = async (productId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await api.post('/orders', { productId });
            alert('Request sent successfully.');
        } catch (err) {
            alert(err.response?.data?.message || 'Error processing request.');
        }
    };

    if (loading) return (
        <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span className="spinner" style={{ borderTopColor: 'var(--accent)', width: '40px', height: '40px' }}></span>
        </div>
    );

    if (error) return (
        <div className="container-minimal" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🚧</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>500 | Internal Server Error</h2>
            <button
                onClick={() => window.location.reload()}
                className="btn-primary-minimal"
            >
                Retry Connection
            </button>
        </div>
    );

    return (
        <div className="container-minimal fade-in-up" style={{ padding: '2rem 0 6rem 0' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                {searchQuery && (
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                        Search results for "{searchQuery}"
                    </h2>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem', justifyContent: 'center' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            style={{
                                cursor: 'pointer',
                                border: categoryQuery === cat ? 'none' : '1px solid #e2e8f0',
                                background: categoryQuery === cat ? '#000000' : '#ffffff',
                                color: categoryQuery === cat ? '#ffffff' : '#475569',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                padding: '0 28px',
                                height: '40px',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderRadius: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {cat.charAt(0) + cat.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {products.length === 0 ? (
                <div style={{ padding: '8rem 0', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📦</div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>No items available yet.</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Be the first to list something in this category!</p>
                </div>
            ) : (
                <div className="grid-minimal">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onPurchase={handleOrder}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
