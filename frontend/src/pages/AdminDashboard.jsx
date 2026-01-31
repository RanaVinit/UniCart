import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingProducts();
    }, []);

    const fetchPendingProducts = async () => {
        try {
            const response = await api.get('/products/admin');
            setProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch admin products', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.patch(`/products/${id}/status`, { status });
            setProducts(products.map(p => p.id === id ? { ...p, status } : p));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span className="spinner" style={{ borderTopColor: 'var(--accent)', width: '40px', height: '40px' }}></span>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Authenticating Administration...</p>
        </div>
    );

    return (
        <div className="container-minimal fade-in-up" style={{ padding: '4rem 0' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control</h1>
                <p style={{ color: 'var(--text-muted)' }}>Review and moderate campus listings.</p>
            </div>

            <div className="card-minimal" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '1.25rem' }}>Product</th>
                            <th style={{ padding: '1.25rem' }}>Seller</th>
                            <th style={{ padding: '1.25rem' }}>Price</th>
                            <th style={{ padding: '1.25rem' }}>Status</th>
                            <th style={{ padding: '1.25rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {product.imageUrl && (
                                            <img src={product.imageUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                        )}
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{product.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.pickupLocation}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ fontWeight: 500 }}>{product.seller?.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.seller?.email}</div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>₹{product.price}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span className={`badge`} style={{
                                        background: product.status === 'APPROVED' ? '#dcfce7' : product.status === 'REJECTED' ? '#fee2e2' : '#fef9c3',
                                        color: product.status === 'APPROVED' ? '#166534' : product.status === 'REJECTED' ? '#991b1b' : '#854d0e'
                                    }}>
                                        {product.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    {product.status === 'PENDING' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleStatusUpdate(product.id, 'APPROVED')}
                                                className="btn-primary-minimal"
                                                style={{ padding: '5px 12px', fontSize: '0.8rem', background: '#10b981' }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(product.id, 'REJECTED')}
                                                className="btn-secondary"
                                                style={{ padding: '5px 12px', fontSize: '0.8rem', color: '#ef4444' }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No products found in the database.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
