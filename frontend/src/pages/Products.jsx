import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Collection temporarily unavailable.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const { user } = useAuth();
    const navigate = useNavigate();

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
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Loading Collection...
        </div>
    );

    if (error) return (
        <div className="container-minimal" style={{ padding: '8rem 0', textAlign: 'center', color: '#ef4444' }}>
            {error}
        </div>
    );

    return (
        <div className="container-minimal fade-in-up" style={{ padding: '4rem 0' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <span className="badge" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: '1rem' }}>
                    S/S 2026 Collection
                </span>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Curated Essentials</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Verified items from students you trust.</p>
            </div>

            <div className="grid-minimal">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onPurchase={handleOrder}
                    />
                ))}
            </div>

            {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                    <h3>No items available yet.</h3>
                    <p>Be the first to list something!</p>
                </div>
            )}
        </div>
    );
};

export default Products;
