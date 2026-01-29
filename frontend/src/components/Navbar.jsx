import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="header-minimal">
            <nav className="container-minimal nav-minimal">
                <NavLink to="/" className="brand-logo">
                    UniCart.
                </NavLink>
                <div className="nav-links">
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Catalog</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Orders</NavLink>
                            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Logout</button>
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
