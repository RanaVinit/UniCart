import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-minimal" style={{ marginTop: 'auto', textAlign: 'left', padding: '4rem 0' }}>
            <div className="container-minimal">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand Column */}
                    <div>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>UniCart.</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            The exclusive, secure marketplace for university students. Buy, sell, and connect.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h5 style={{ fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--primary)' }}>Platform</h5>
                        <NavLink to="/products" className="nav-link">Browse Catalog</NavLink>
                        <NavLink to="/orders" className="nav-link">Your Orders</NavLink>
                        <NavLink to="/register" className="nav-link">Become a Seller</NavLink>
                    </div>

                    {/* Support Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h5 style={{ fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--primary)' }}>Support</h5>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Help Center</span>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Safety Guidelines</span>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Platform Status</span>
                    </div>

                    {/* Legal Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h5 style={{ fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--primary)' }}>Legal</h5>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Terms of Service</span>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Privacy Policy</span>
                        <span className="nav-link" style={{ cursor: 'pointer' }}>Cookie Policy</span>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        © 2026 Campus Marketplace Inc. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}><i className="fa-brands fa-twitter"></i> Twitter</span>
                        <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}><i className="fa-brands fa-instagram"></i> Instagram</span>
                        <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}><i className="fa-brands fa-linkedin"></i> LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
