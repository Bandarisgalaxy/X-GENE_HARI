import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Upload, AlertTriangle, Heart, Brain, Shield, Dna } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Heartbeat from '../components/Heartbeat';
import Chromosome from '../components/Chromosome';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    steps: 8450,
    sleep: 7.5,
    calories: 2100
  });

  const riskData = [
    { name: 'Cardiovascular', value: 35, color: '#ff3d3d' },
    { name: 'Diabetes', value: 28, color: '#ffb800' },
    { name: 'Cancer', value: 15, color: '#0077cc' },
    { name: 'Low Risk', value: 22, color: '#00d68f' }
  ];

  const weeklyActivity = [
    { day: 'Mon', steps: 8200, heartRate: 70 },
    { day: 'Tue', steps: 9100, heartRate: 72 },
    { day: 'Wed', steps: 7500, heartRate: 69 },
    { day: 'Thu', steps: 8900, heartRate: 73 },
    { day: 'Fri', steps: 10200, heartRate: 75 },
    { day: 'Sat', steps: 11500, heartRate: 78 },
    { day: 'Sun', steps: 6800, heartRate: 68 }
  ];

  const stats = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: `${healthData.heartRate} BPM`,
      trend: '+2%',
      trendUp: true,
      color: '#ff3d3d'
    },
    {
      icon: Activity,
      label: 'Steps Today',
      value: healthData.steps.toLocaleString(),
      trend: '+12%',
      trendUp: true,
      color: '#0077cc'
    },
    {
      icon: Brain,
      label: 'Sleep Quality',
      value: `${healthData.sleep}h`,
      trend: '-5%',
      trendUp: false,
      color: '#ffb800'
    },
    {
      icon: Shield,
      label: 'Risk Score',
      value: '78/100',
      trend: '+8%',
      trendUp: true,
      color: '#00d68f'
    }
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
              Welcome back, <span className="gradient-text">{user?.username || 'User'}</span>
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: 18 }}>
              Here's your genetic health overview for today
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? 'repeat(4, 1fr)' : window.innerWidth > 640 ? 'repeat(2, 1fr)' : '1fr', gap: 24, marginBottom: 40 }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `${stat.color}20`, borderRadius: '50%', filter: 'blur(30px)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: stat.trendUp ? 'rgba(0, 214, 143, 0.1)' : 'rgba(255, 61, 61, 0.1)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: stat.trendUp ? '#00d68f' : '#ff3d3d'
                  }}
                >
                  {stat.trend}
                </div>
              </div>

              <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '2fr 1fr' : '1fr', gap: 24, marginBottom: 40 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>Weekly Activity</h3>
              <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: '#0077cc' }} />
                  <span style={{ color: '#a3a3a3' }}>Steps</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: '#00d68f' }} />
                  <span style={{ color: '#a3a3a3' }}>Heart Rate</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077cc" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0077cc" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d68f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00d68f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#525252" />
                <YAxis stroke="#525252" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(23, 23, 23, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    color: '#ffffff'
                  }}
                />
                <Area type="monotone" dataKey="steps" stroke="#0077cc" fillOpacity={1} fill="url(#stepsGradient)" />
                <Area type="monotone" dataKey="heartRate" stroke="#00d68f" fillOpacity={1} fill="url(#heartGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Live Heart Rate</h3>
            <Heartbeat bpm={healthData.heartRate} size={120} />
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>Current BPM</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#ff3d3d' }}>{healthData.heartRate}</div>
              <div style={{ fontSize: 12, color: '#00d68f', marginTop: 8 }}>Normal Range</div>
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '1fr 1fr' : '1fr', gap: 24, marginBottom: 40 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Risk Distribution</h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {riskData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: item.color }} />
                    <span style={{ fontSize: 14, color: '#d4d4d4' }}>{item.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: item.color, marginLeft: 'auto' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Chromosome Analysis</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, maxHeight: 200, overflowY: 'auto' }}>
              {Array.from({ length: 23 }).map((_, i) => (
                <Chromosome key={i} number={i + 1} active={[2, 7, 13, 19].includes(i)} size={30} />
              ))}
            </div>

            <div style={{ marginTop: 20, padding: 12, background: 'rgba(0, 214, 143, 0.1)', border: '1px solid rgba(0, 214, 143, 0.3)', borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: '#00d68f', fontWeight: 500 }}>
                4 chromosomes flagged for detailed analysis
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            padding: 32,
            background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 214, 143, 0.1) 100%)',
            border: '1px solid rgba(0, 119, 204, 0.3)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Dna size={32} style={{ color: '#0077cc' }} />
              <h3 style={{ fontSize: 24, fontWeight: 600 }}>Upload Genomic Data</h3>
            </div>
            <p style={{ color: '#a3a3a3', fontSize: 16 }}>
              Analyze your genetic profile and receive personalized health insights
            </p>
          </div>

          <Link to="/upload">
            <motion.button
              style={{
                padding: '14px 32px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
                border: 'none',
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 30px rgba(0, 119, 204, 0.3)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 119, 204, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload size={20} />
              Upload Data
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
