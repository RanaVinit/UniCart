import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
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
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Entry.</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Access your campus trading account.</p>
                </div>

                {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                            placeholder="demo@unicart.edu"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ padding: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn-primary-minimal" style={{ marginTop: '0.5rem', padding: '1rem', width: '100%', borderRadius: '8px' }}>
                        Authenticate
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    New to the platform? <NavLink to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Register Agency</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
