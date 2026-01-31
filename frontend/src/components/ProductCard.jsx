import React from 'react';

const ProductCard = ({ product, onPurchase }) => {
    return (
        <div className="product-card">
            <div className="img-container">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: '2rem' }}>
                        📦
                    </div>
                )}
                {product.isSold && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <span className="badge badge-sold">Sold Out</span>
                    </div>
                )}
            </div>

            <div className="card-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 className="card-title">{product.title}</h3>
                    <span className="card-price">₹{product.price}</span>
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
