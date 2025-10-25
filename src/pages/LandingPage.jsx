import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dna, Shield, Zap, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import DNAHelix from '../components/DNAHelix';
import Chromosome from '../components/Chromosome';

const LandingPage = () => {
  const features = [
    {
      icon: Dna,
      title: 'Advanced Genomic Analysis',
      description: 'Upload and analyze multiple genomic file formats including VCF, FASTA, PED, and more.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Risk Assessment',
      description: 'Leverage cutting-edge AI to identify disease risks with probability scores and detailed explanations.'
    },
    {
      icon: Shield,
      title: 'Personalized Prevention Plans',
      description: 'Receive custom diet, lifestyle, and medication recommendations based on your genetic profile.'
    },
    {
      icon: Zap,
      title: 'Real-Time Health Tracking',
      description: 'Integrate with Google Fit to monitor your health metrics and progress continuously.'
    }
  ];

  const benefits = [
    'Comprehensive genomic data processing',
    'HIPAA-compliant secure storage',
    'Evidence-based medical insights',
    'Continuous health monitoring',
    'Personalized action plans',
    'Expert-reviewed algorithms'
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
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

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '1fr 1fr' : '1fr', gap: 64, alignItems: 'center', padding: '80px 24px' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(0, 119, 204, 0.1)',
                border: '1px solid rgba(0, 119, 204, 0.3)',
                borderRadius: 24,
                color: '#0077cc',
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 24
              }}
            >
              Next-Generation Genetic Risk Assessment
            </motion.div>

            <h1 style={{ fontSize: window.innerWidth > 768 ? '3.5rem' : '2.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
              Decode Your DNA,{' '}
              <span className="gradient-text">
                Optimize Your Health
              </span>
            </h1>

            <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, marginBottom: 40, maxWidth: 560 }}>
              AURA combines advanced genomic analysis with AI-powered insights to provide personalized health risk assessments and prevention strategies tailored to your unique genetic profile.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/register">
                <motion.button
                  style={{
                    padding: '16px 32px',
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
                  Get Started <ArrowRight size={20} />
                </motion.button>
              </Link>

              <Link to="/login">
                <motion.button
                  style={{
                    padding: '16px 32px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#00d68f' }}>50K+</div>
                <div style={{ fontSize: 14, color: '#737373' }}>Genomes Analyzed</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#0077cc' }}>98%</div>
                <div style={{ fontSize: 14, color: '#737373' }}>Accuracy Rate</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#ffb800' }}>24/7</div>
                <div style={{ fontSize: 14, color: '#737373' }}>AI Monitoring</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <DNAHelix size={window.innerWidth > 768 ? 500 : 300} />
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <h2 style={{ fontSize: window.innerWidth > 768 ? '2.5rem' : '2rem', fontWeight: 700, marginBottom: 16 }}>
              Powered by <span className="gradient-text">Advanced Technology</span>
            </h2>
            <p style={{ fontSize: 18, color: '#a3a3a3', maxWidth: 640, margin: '0 auto' }}>
              Our platform combines state-of-the-art genomic analysis with artificial intelligence to deliver unparalleled insights.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? 'repeat(2, 1fr)' : '1fr', gap: 32 }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                style={{
                  padding: 32,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                }}
              >
                <motion.div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon size={28} color="#ffffff" />
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{feature.title}</h3>
                <p style={{ color: '#a3a3a3', lineHeight: 1.6 }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '1fr 1fr' : '1fr', gap: 80, alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ fontSize: window.innerWidth > 768 ? '2.5rem' : '2rem', fontWeight: 700, marginBottom: 24 }}>
                Comprehensive Genetic <span className="gradient-text">Health Insights</span>
              </h2>
              <p style={{ color: '#a3a3a3', fontSize: 18, marginBottom: 32, lineHeight: 1.6 }}>
                AURA analyzes your complete genetic profile across all 23 chromosome pairs to identify potential health risks and provide actionable recommendations.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <CheckCircle2 size={20} style={{ color: '#00d68f', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#d4d4d4' }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                padding: 32,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
              }}
            >
              {Array.from({ length: 23 }).map((_, i) => (
                <Chromosome key={i} number={i + 1} active={i % 5 === 0} size={40} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'rgba(0, 119, 204, 0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: window.innerWidth > 768 ? '2.5rem' : '2rem', fontWeight: 700, marginBottom: 24 }}>
              Ready to Take Control of <span className="gradient-text">Your Genetic Health?</span>
            </h2>
            <p style={{ color: '#a3a3a3', fontSize: 18, marginBottom: 40, maxWidth: 640, margin: '0 auto 40px' }}>
              Join thousands of users who have discovered their genetic potential and are living healthier lives.
            </p>
            <Link to="/register">
              <motion.button
                style={{
                  padding: '18px 48px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 10px 30px rgba(0, 119, 204, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 119, 204, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey <ArrowRight size={22} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '40px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <Dna size={28} style={{ color: '#0077cc' }} />
            <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AURA
            </span>
          </div>
          <p style={{ color: '#737373', fontSize: 14 }}>
            Advanced Genetic Risk Assessment Platform
          </p>
          <p style={{ color: '#525252', fontSize: 12, marginTop: 8 }}>
            Built with cutting-edge AI technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
