import { useState, useEffect } from 'react';
import api from '../services/api';

const Orders = () => {
    const [buyerOrders, setBuyerOrders] = useState([]);
    const [sellerOrders, setSellerOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('buyer');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [buyerRes, sellerRes] = await Promise.all([
                    api.get('/orders/buyer'),
                    api.get('/orders/seller')
                ]);
                setBuyerOrders(buyerRes.data);
                setSellerOrders(sellerRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error', err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await api.patch(`/orders/${orderId}/status`, { status });
            const sellerRes = await api.get('/orders/seller');
            setSellerOrders(sellerRes.data);
        } catch (err) {
            alert('Update failed.');
        }
    };

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );

    const ordersToShow = tab === 'buyer' ? buyerOrders : sellerOrders;

    return (
        <div className="container-minimal fade-in-up" style={{ padding: '80px 0', minHeight: '80vh' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Transactions.</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your purchase history and sales.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '12px' }}>
                    <button
                        onClick={() => setTab('buyer')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            background: tab === 'buyer' ? 'white' : 'transparent',
                            color: tab === 'buyer' ? 'var(--primary)' : 'var(--text-muted)',
                            boxShadow: tab === 'buyer' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        }}
                    >
                        Bought
                    </button>
                    <button
                        onClick={() => setTab('seller')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            background: tab === 'seller' ? 'white' : 'transparent',
                            color: tab === 'seller' ? 'var(--primary)' : 'var(--text-muted)',
                            boxShadow: tab === 'seller' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        }}
                    >
                        Sold
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {ordersToShow.map((order) => (
                    <div key={order.id} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                width: '60px', height: '60px',
                                background: tab === 'buyer' ? '#eff6ff' : '#f0fdf4',
                                color: tab === 'buyer' ? '#2563eb' : '#16a34a',
                                borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', fontWeight: 900
                            }}>
                                {tab === 'buyer' ? '↓' : '↑'}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{order.product?.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    {tab === 'buyer' ? `From: ${order.product?.seller?.name}` : `To: ${order.buyer?.name}`}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700 }}>${order.product?.price}</span>
                                <span style={{
                                    fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                                    color: order.status === 'ACCEPTED' ? '#16a34a' : order.status === 'REJECTED' ? '#ef4444' : '#f59e0b',
                                    padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'var(--bg-subtle)'
                                }}>
                                    {order.status}
                                </span>
                            </div>

                            {tab === 'seller' && order.status === 'PENDING' && (
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => handleUpdateStatus(order.id, 'ACCEPTED')}
                                        className="btn-primary-minimal"
                                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(order.id, 'REJECTED')}
                                        className="btn-secondary"
                                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#fee2e2', background: '#fef2f2' }}
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {ordersToShow.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)', background: 'white', borderRadius: '16px', border: '1px dashed var(--border-light)' }}>
                        <p style={{ fontWeight: 500 }}>No transaction history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
