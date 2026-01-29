import React from 'react';

const ProductCard = ({ product, onPurchase }) => {
    return (
        <div className="product-card">
            <div className="img-container">
                <img
                    src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop`}
                    alt={product.title}
                />
                {product.isSold && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <span className="badge badge-sold">Sold Out</span>
                    </div>
                )}
            </div>

            <div className="card-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <h3 className="card-title">{product.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                            {product.pickupLocation}
                        </p>
                    </div>
                    <span className="card-price">${product.price}</span>
                </div>

                <button
                    onClick={() => onPurchase(product.id)}
                    disabled={product.isSold}
                    className={product.isSold ? "btn-secondary" : "btn-primary-minimal"}
                    style={{ width: '100%', opacity: product.isSold ? 0.6 : 1, textAlign: 'center' }}
                >
                    {product.isSold ? 'Archived' : 'Purchase Now'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
