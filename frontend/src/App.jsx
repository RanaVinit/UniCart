import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = () => (
  <div className="hero-wrapper fade-in-up">
    <div className="container-minimal" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', display: 'inline-block', padding: '0.5rem 1rem', background: '#eff6ff', borderRadius: '50px', color: '#2563eb', fontSize: '0.85rem', fontWeight: 600 }}>
        New for 2026 Semester 🚀
      </div>
      <h1 className="hero-title">
        The Campus <br /> Trading Standard.
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        A secure, exclusive marketplace for university essentials. <br />
        Buy, sell, and connect with verified peers in seconds.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <NavLink to="/products" className="btn-primary-minimal">
          Browse Marketplace
        </NavLink>
        <NavLink to="/register" className="btn-secondary">
          Join Now
        </NavLink>
      </div>
    </div>
  </div>
);

function App() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!['/', '/login', '/register'].includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
}

export default App;