import { motion } from 'framer-motion';
import { Activity, Heart, Footprints, Moon, Flame } from 'lucide-react';
import Heartbeat from '../components/Heartbeat';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const HealthMetricsPage = () => {
  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    steps: Math.floor(7000 + Math.random() * 5000),
    heartRate: Math.floor(68 + Math.random() * 15),
    sleep: 6 + Math.random() * 3,
    calories: Math.floor(1800 + Math.random() * 600)
  }));

  const metrics = [
    { icon: Heart, label: 'Avg Heart Rate', value: '72 BPM', color: '#ff3d3d', data: monthlyData.map(d => d.heartRate) },
    { icon: Footprints, label: 'Daily Steps', value: '8,450', color: '#0077cc', data: monthlyData.map(d => d.steps) },
    { icon: Moon, label: 'Sleep Quality', value: '7.5h', color: '#ffb800', data: monthlyData.map(d => d.sleep) },
    { icon: Flame, label: 'Calories Burned', value: '2,100', color: '#00d68f', data: monthlyData.map(d => d.calories) }
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
              <span className="gradient-text">Health Metrics</span> Dashboard
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: 18 }}>
              Track your fitness and wellness data over time
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? 'repeat(2, 1fr)' : '1fr', gap: 24, marginBottom: 40 }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                padding: 32,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${metric.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <metric.icon size={24} style={{ color: metric.color }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 600 }}>{metric.label}</h3>
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: metric.color }}>
                    {metric.value}
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={metric.label.includes('Heart') ? 'heartRate' : metric.label.includes('Steps') ? 'steps' : metric.label.includes('Sleep') ? 'sleep' : 'calories'}
                    stroke={metric.color}
                    fillOpacity={1}
                    fill={`url(#gradient-${index})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '2fr 1fr' : '1fr', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>30-Day Activity Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
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
                <Line type="monotone" dataKey="steps" stroke="#0077cc" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="heartRate" stroke="#ff3d3d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
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
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Real-Time Heart Rate</h3>
            <Heartbeat bpm={72} size={140} />
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 8 }}>Last Updated</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Just now</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsPage;
