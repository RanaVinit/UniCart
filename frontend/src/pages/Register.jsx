import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{
            height: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div className="fade-in" style={{ width: '100%', maxWidth: '360px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Join.</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create your student marketplace profile.</p>
                </div>

                {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            style={{ padding: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                            placeholder="Student Name"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{ padding: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                            placeholder="name@unicart.edu"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{ padding: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn-primary-minimal" style={{ marginTop: '0.5rem', padding: '1rem', width: '100%', borderRadius: '8px' }}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Already have an account? <NavLink to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;
