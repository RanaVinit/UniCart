import React from 'react';

const ProductCard = ({ product, onPurchase }) => {
    return (
        <div className="product-card">
            <div className="img-container">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: '2rem' }}>
                        📦
                    </div>
                )}
                {product.isSold && (
                    <div className="glass-effect" style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
                        Archived
                    </div>
                )}
            </div>

            <div className="card-details" style={{ padding: '0 1.5rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'capitalize' }}>
                        {product.category.toLowerCase()}
                    </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 700, lineHeight: 1.3 }}>
                    {product.title}
                </h3>

                <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                            {product.seller?.name?.charAt(0) || 'U'}
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                            {product.seller?.name || 'Seller'}
                        </span>
                    </div>

                    <button
                        onClick={() => onPurchase(product.id)}
                        disabled={product.isSold}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: product.isSold ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: product.isSold ? '#cbd5e1' : '#64748b',
                            transition: 'color 0.2s',
                            padding: 0
                        }}
                    >
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{product.price}</span>
                        {!product.isSold && (
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                →
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
