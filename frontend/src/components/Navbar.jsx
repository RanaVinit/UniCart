import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/products');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header-minimal">
            <nav className="container-minimal nav-minimal">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                    <NavLink to="/" className="brand-logo">
                        UniCart.
                    </NavLink>

                    {location.pathname === '/products' && (
                        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '220px', position: 'relative' }}>
                            <Search
                                size={18}
                                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input-minimal"
                                style={{ paddingLeft: '2.8rem', height: '40px', borderRadius: '50px' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    )}
                </div>

                <div className="nav-links">
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Catalog</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/add-product" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Sell</NavLink>
                            <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Orders</NavLink>
                            {user.role === 'ADMIN' && (
                                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: '#3b82f6', fontWeight: 600 }}>Admin</NavLink>
                            )}
                            <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Sign In</NavLink>
                            <NavLink to="/register" className="btn-primary-minimal" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                                Get Started
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
