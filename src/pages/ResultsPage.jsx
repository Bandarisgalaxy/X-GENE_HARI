import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Shield, Brain, Download, Share2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import axios from 'axios';

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [preventionPlan, setPreventionPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = localStorage.getItem('genomicResult');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/upload');
    }
  }, [navigate]);

  const fetchPreventionPlan = async (disease, probability) => {
    setLoadingPlan(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_FLASK_API_URL || 'http://localhost:8000'}/personalized_prevention`,
        {
          disease,
          risk_score: parseFloat(probability)
        }
      );
      setPreventionPlan(response.data.personalized_plan);
    } catch (error) {
      console.error('Failed to fetch prevention plan:', error);
    } finally {
      setLoadingPlan(false);
    }
  };

  if (!results) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ width: 40, height: 40, border: '4px solid rgba(0,119,204,0.3)', borderTopColor: '#0077cc', borderRadius: '50%' }}
        />
      </div>
    );
  }

  const risks = results.identified_risks || [];
  const riskLevels = risks.map(r => ({
    name: r.risk_name,
    score: parseFloat(r.probability) * 100,
    color: parseFloat(r.probability) > 0.6 ? '#ff3d3d' : parseFloat(r.probability) > 0.3 ? '#ffb800' : '#00d68f'
  }));

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
              <span className="gradient-text">Genomic Analysis</span> Results
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: 18 }}>
              AI-powered risk assessment based on your genetic profile
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <motion.button
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(0, 119, 204, 0.1)',
              border: '1px solid rgba(0, 119, 204, 0.3)',
              color: '#0077cc',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            whileHover={{ scale: 1.05, background: 'rgba(0, 119, 204, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Export Report
          </motion.button>

          <motion.button
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} />
            Share with Doctor
          </motion.button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '1fr 1fr' : '1fr', gap: 32, marginBottom: 40 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              padding: 32,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Risk Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskLevels}>
                <XAxis dataKey="name" stroke="#525252" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#525252" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(23, 23, 23, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {riskLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>File Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>File Name</div>
                <div style={{ fontWeight: 500 }}>{results.file_processed}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>Format</div>
                <div style={{ fontWeight: 500 }}>{results.genomic_summary?.file_type}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>Processed At</div>
                <div style={{ fontWeight: 500 }}>
                  {new Date(results.genomic_summary?.processed_at).toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: '#a3a3a3', marginBottom: 4 }}>Analysis Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={20} style={{ color: '#00d68f' }} />
                  <span style={{ fontWeight: 500, color: '#00d68f' }}>Complete</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            padding: 32,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
            marginBottom: 40
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Identified Health Risks</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {risks.map((risk, index) => {
              const probability = parseFloat(risk.probability);
              const riskLevel = probability > 0.6 ? 'High' : probability > 0.3 ? 'Moderate' : 'Low';
              const riskColor = probability > 0.6 ? '#ff3d3d' : probability > 0.3 ? '#ffb800' : '#00d68f';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  style={{
                    padding: 24,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${riskColor}40`,
                    borderRadius: 12,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedRisk(risk);
                    fetchPreventionPlan(risk.risk_name, risk.probability);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <AlertTriangle size={24} style={{ color: riskColor }} />
                        <h4 style={{ fontSize: 18, fontWeight: 600 }}>{risk.risk_name}</h4>
                        <div
                          style={{
                            padding: '4px 12px',
                            borderRadius: 6,
                            background: `${riskColor}20`,
                            fontSize: 12,
                            fontWeight: 600,
                            color: riskColor
                          }}
                        >
                          {riskLevel} Risk
                        </div>
                      </div>

                      <p style={{ color: '#a3a3a3', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                        {risk.reason}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 12, color: '#737373', marginBottom: 4 }}>Probability</div>
                          <div style={{ fontSize: 24, fontWeight: 700, color: riskColor }}>
                            {(probability * 100).toFixed(0)}%
                          </div>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{
                            width: '100%',
                            height: 8,
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 4,
                            overflow: 'hidden'
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${probability * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              style={{
                                height: '100%',
                                background: riskColor,
                                borderRadius: 4
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={24} style={{ color: '#525252' }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {selectedRisk && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              padding: 32,
              background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 214, 143, 0.1) 100%)',
              border: '1px solid rgba(0, 119, 204, 0.3)',
              borderRadius: 16,
              marginBottom: 40
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
              Prevention Plan for <span className="gradient-text">{selectedRisk.risk_name}</span>
            </h3>
            <p style={{ color: '#a3a3a3', fontSize: 16, marginBottom: 32 }}>
              Personalized recommendations based on your genetic profile
            </p>

            {loadingPlan ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 40, height: 40, border: '4px solid rgba(0,119,204,0.3)', borderTopColor: '#0077cc', borderRadius: '50%' }}
                />
              </div>
            ) : preventionPlan && (
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? 'repeat(2, 1fr)' : '1fr', gap: 24 }}>
                <div
                  style={{
                    padding: 24,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 12
                  }}
                >
                  <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Brain size={20} style={{ color: '#0077cc' }} />
                    Lifestyle Plan
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#d4d4d4' }}>
                    <div>
                      <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Exercise:</span> {preventionPlan.lifestyle_plan?.exercise}
                    </div>
                    <div>
                      <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Sleep:</span> {preventionPlan.lifestyle_plan?.sleep}
                    </div>
                    <div>
                      <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Stress:</span> {preventionPlan.lifestyle_plan?.stress_management}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: 24,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 12
                  }}
                >
                  <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Shield size={20} style={{ color: '#00d68f' }} />
                    Monitoring & Medication
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#d4d4d4' }}>
                    <div>
                      <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Monitoring:</span> {preventionPlan.medication_and_monitoring?.monitoring_schedule}
                    </div>
                    <div>
                      <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Medications:</span>
                      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                        {preventionPlan.medication_and_monitoring?.recommended_meds?.slice(0, 3).map((med, i) => (
                          <li key={i}>{med}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
