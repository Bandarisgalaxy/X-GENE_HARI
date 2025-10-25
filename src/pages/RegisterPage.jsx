import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dna, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Chromosome from '../components/Chromosome';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (strength < 3) {
      setError('Password is too weak. Use at least 8 characters with mixed case and numbers.');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 119, 204, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 214, 143, 0.15) 0%, transparent 50%)',
          zIndex: -1,
        }}
      />

      <div style={{ position: 'absolute', top: '5%', left: '5%', display: 'flex', gap: 16, opacity: 0.2 }}>
        {[1, 2, 3].map(i => <Chromosome key={i} number={i} size={60} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: 480,
          padding: 48,
          margin: '0 24px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            whileHover={{ scale: 1.05 }}
          >
            <Dna size={40} style={{ color: '#0077cc' }} />
            <span style={{ fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AURA
            </span>
          </motion.div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Create Account</h2>
          <p style={{ color: '#a3a3a3', fontSize: 16 }}>Start your genetic health journey today</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              padding: 16,
              marginBottom: 24,
              background: 'rgba(255, 61, 61, 0.1)',
              border: '1px solid rgba(255, 61, 61, 0.3)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <AlertCircle size={20} style={{ color: '#ff3d3d', flexShrink: 0 }} />
            <span style={{ color: '#ff3d3d', fontSize: 14 }}>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#d4d4d4' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0077cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#d4d4d4' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0077cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#d4d4d4' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0077cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
            {formData.password && (
              <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: i <= strength
                        ? strength <= 2 ? '#ff3d3d' : strength === 3 ? '#ffb800' : '#00d68f'
                        : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#d4d4d4' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0077cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <CheckCircle2 size={20} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#00d68f' }} />
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 12,
              background: loading ? '#525252' : 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
              border: 'none',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: loading ? 'none' : '0 10px 30px rgba(0, 119, 204, 0.3)',
            }}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 15px 40px rgba(0, 119, 204, 0.4)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff', borderRadius: '50%' }}
              />
            ) : (
              <>
                Create Account <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#a3a3a3', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login">
              <motion.span
                style={{ color: '#0077cc', fontWeight: 500, cursor: 'pointer' }}
                whileHover={{ color: '#00d68f' }}
              >
                Sign In
              </motion.span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
