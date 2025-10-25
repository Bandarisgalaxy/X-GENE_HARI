import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dna, LogOut, User, Upload, Activity, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'Upload Data', icon: Upload },
    { path: '/health-metrics', label: 'Health Metrics', icon: Activity },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(23, 23, 23, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <Link to={isAuthenticated ? '/dashboard' : '/'}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Dna size={32} style={{ color: '#0077cc' }} />
            <span style={{ fontSize: 24, fontWeight: 700, background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AURA
            </span>
          </motion.div>
        </Link>

        {isAuthenticated && (
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 8,
                    color: isActive(item.path) ? '#00d68f' : '#a3a3a3',
                    background: isActive(item.path) ? 'rgba(0, 214, 143, 0.1)' : 'transparent',
                    fontWeight: 500,
                  }}
                  whileHover={{ scale: 1.05, color: '#00d68f' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={20} />
                  <span style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>{item.label}</span>
                </motion.div>
              </Link>
            ))}

            <motion.button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 61, 61, 0.1)',
                border: '1px solid rgba(255, 61, 61, 0.3)',
                color: '#ff3d3d',
                fontWeight: 500,
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255, 61, 61, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
              <span style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>Logout</span>
            </motion.button>
          </div>
        )}

        {!isAuthenticated && location.pathname !== '/' && (
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/login">
              <motion.button
                style={{
                  padding: '10px 24px',
                  borderRadius: 8,
                  background: 'transparent',
                  border: '1px solid rgba(0, 119, 204, 0.5)',
                  color: '#0077cc',
                  fontWeight: 500,
                }}
                whileHover={{ scale: 1.05, borderColor: '#0077cc' }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                style={{
                  padding: '10px 24px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 500,
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 119, 204, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
