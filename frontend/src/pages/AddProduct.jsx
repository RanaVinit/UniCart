import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        categories: []
    });

    const CATEGORIES = ['ELECTRONICS', 'BOOKS', 'FASHION', 'ACADEMICS', 'OTHER'];

    const toggleCategory = (cat) => {
        setFormData(prev => {
            const categories = prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat];
            return { ...prev, categories };
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.categories.length === 0) {
            alert('Please select at least one category');
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('price', formData.price);

        // Append each category individually so it's received as an array
        formData.categories.forEach(cat => {
            data.append('categories', cat);
        });

        if (image) {
            data.append('image', image);
        }

        try {
            await api.post('/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product submitted for review!');
            navigate('/products');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-minimal fade-in-up" style={{ padding: '4rem 0', maxWidth: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>List an Item</h1>
                <p style={{ color: 'var(--text-muted)' }}>Share your essentials with the campus community.</p>
            </div>

            <form onSubmit={handleSubmit} className="card-minimal" style={{ padding: '2.5rem' }}>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Product Title</label>
                    <input
                        type="text"
                        name="title"
                        className="input-minimal"
                        placeholder="e.g. Python Book"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        className="input-minimal"
                        placeholder="0.00"
                        min="0"
                        step="1"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.85rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>
                        Categories
                    </label>
                    <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => toggleCategory(cat)}
                                style={{
                                    cursor: 'pointer',
                                    border: formData.categories.includes(cat) ? 'none' : '1px solid #e2e8f0',
                                    background: formData.categories.includes(cat) ? '#000000' : '#ffffff',
                                    color: formData.categories.includes(cat) ? '#ffffff' : '#64748b',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: '8px 18px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
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

                <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Product Image</label>
                    <div
                        style={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: '12px',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s'
                        }}
                        onClick={() => document.getElementById('imageUpload').click()}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                        ) : (
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to upload image</p>
                            </div>
                        )}
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary-minimal"
                    style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Submitting...
                        </>
                    ) : 'Submit Post'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
