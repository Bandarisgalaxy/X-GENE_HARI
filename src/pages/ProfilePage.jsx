import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Droplet, Ruler, Weight, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    gender: user?.gender || '',
    bloodgroup: user?.bloodgroup || '',
    height: user?.height || '',
    weight: user?.weight || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'fullname', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe' },
    { name: 'dob', label: 'Date of Birth', icon: Calendar, type: 'date' },
    { name: 'gender', label: 'Gender', icon: User, type: 'select', options: ['Male', 'Female', 'Other'] },
    { name: 'bloodgroup', label: 'Blood Group', icon: Droplet, type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    { name: 'height', label: 'Height (cm)', icon: Ruler, type: 'number', placeholder: '170' },
    { name: 'weight', label: 'Weight (kg)', icon: Weight, type: 'number', placeholder: '70' }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 214, 143, 0.1) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '40px 0'
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>
              Your <span className="gradient-text">Profile</span>
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: 18 }}>
              Manage your personal and health information
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40, maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            padding: 40,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
                {user?.username}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a3a3a3' }}>
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
            </div>

            <motion.button
              onClick={() => setEditing(!editing)}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: editing ? 'rgba(255, 61, 61, 0.1)' : 'rgba(0, 119, 204, 0.1)',
                border: `1px solid ${editing ? 'rgba(255, 61, 61, 0.3)' : 'rgba(0, 119, 204, 0.3)'}`,
                color: editing ? '#ff3d3d' : '#0077cc',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit2 size={18} />
              {editing ? 'Cancel' : 'Edit Profile'}
            </motion.button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: 16,
                marginBottom: 24,
                background: message.includes('success') ? 'rgba(0, 214, 143, 0.1)' : 'rgba(255, 61, 61, 0.1)',
                border: `1px solid ${message.includes('success') ? 'rgba(0, 214, 143, 0.3)' : 'rgba(255, 61, 61, 0.3)'}`,
                borderRadius: 12,
                color: message.includes('success') ? '#00d68f' : '#ff3d3d',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 640 ? 'repeat(2, 1fr)' : '1fr', gap: 24 }}>
              {fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#d4d4d4' }}>
                    {field.label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <field.icon size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />

                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        disabled={!editing}
                        style={{
                          width: '100%',
                          padding: '14px 16px 14px 48px',
                          background: editing ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#ffffff',
                          fontSize: 16,
                          outline: 'none',
                          cursor: editing ? 'pointer' : 'not-allowed'
                        }}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt} style={{ background: '#171717' }}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder={field.placeholder}
                        style={{
                          width: '100%',
                          padding: '14px 16px 14px 48px',
                          background: editing ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#ffffff',
                          fontSize: 16,
                          outline: 'none',
                          cursor: editing ? 'text' : 'not-allowed'
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {editing && (
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  width: '100%',
                  marginTop: 32,
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
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </motion.button>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
