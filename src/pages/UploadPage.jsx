import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader, Dna, FileType } from 'lucide-react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const supportedFormats = [
    { ext: 'VCF', desc: 'Variant Call Format', icon: '🧬' },
    { ext: 'CSV', desc: 'Comma-Separated Values', icon: '📊' },
    { ext: 'FASTA', desc: 'Sequence Format', icon: '🔬' },
    { ext: 'PED', desc: 'Pedigree Format', icon: '👥' },
    { ext: 'BED', desc: 'Browser Extensible Data', icon: '📍' },
    { ext: 'PDF', desc: 'Genomic Reports', icon: '📄' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setAnalyzing(false);
    setProgress(0);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      let progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await axios.post(
        `${import.meta.env.VITE_FLASK_API_URL || 'http://localhost:8000'}/predict_risk`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      setUploading(false);
      setAnalyzing(true);

      setTimeout(() => {
        setAnalyzing(false);
        setResult(response.data);
        localStorage.setItem('genomicResult', JSON.stringify(response.data));
        setTimeout(() => {
          navigate('/results');
        }, 1500);
      }, 2000);

    } catch (err) {
      setUploading(false);
      setAnalyzing(false);
      setProgress(0);
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    }
  };

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
              <span className="gradient-text">Genomic Data</span> Upload
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: 18 }}>
              Upload your genomic data for AI-powered risk assessment
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 968 ? '2fr 1fr' : '1fr', gap: 32 }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              style={{
                padding: 48,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: file ? '2px solid #00d68f' : '2px dashed rgba(255, 255, 255, 0.2)',
                borderRadius: 16,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ borderColor: '#0077cc', background: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".vcf,.csv,.txt,.ped,.map,.bed,.fam,.bim,.fasta,.fa,.pdf"
              />

              <AnimatePresence mode="wait">
                {!file && (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Upload size={64} style={{ color: '#0077cc', marginBottom: 24 }} />
                    </motion.div>
                    <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                      Drop your file here
                    </h3>
                    <p style={{ color: '#a3a3a3', fontSize: 16, marginBottom: 24 }}>
                      or click to browse
                    </p>
                    <div style={{ fontSize: 14, color: '#737373' }}>
                      Supports: VCF, CSV, FASTA, PED, BED, PDF (Max 50MB)
                    </div>
                  </motion.div>
                )}

                {file && !uploading && !analyzing && (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <CheckCircle2 size={64} style={{ color: '#00d68f', marginBottom: 24 }} />
                    <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                      File Selected
                    </h3>
                    <div style={{
                      padding: 16,
                      background: 'rgba(0, 214, 143, 0.1)',
                      border: '1px solid rgba(0, 214, 143, 0.3)',
                      borderRadius: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 24
                    }}>
                      <FileText size={24} style={{ color: '#00d68f' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 500, color: '#ffffff' }}>{file.name}</div>
                        <div style={{ fontSize: 14, color: '#a3a3a3' }}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(uploading || analyzing) && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Dna size={64} style={{ color: '#0077cc', marginBottom: 24 }} />
                    </motion.div>
                    <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                      {uploading ? 'Uploading & Processing...' : 'Analyzing Genomic Data...'}
                    </h3>
                    <div style={{ width: '100%', maxWidth: 400, marginTop: 24 }}>
                      <div style={{
                        width: '100%',
                        height: 8,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #0077cc 0%, #00d68f 100%)',
                            borderRadius: 4
                          }}
                        />
                      </div>
                      <div style={{ marginTop: 8, fontSize: 14, color: '#a3a3a3' }}>
                        {progress}% complete
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: 'rgba(255, 61, 61, 0.1)',
                  border: '1px solid rgba(255, 61, 61, 0.3)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <AlertCircle size={20} style={{ color: '#ff3d3d', flexShrink: 0 }} />
                <span style={{ color: '#ff3d3d', fontSize: 14 }}>{error}</span>
              </motion.div>
            )}

            {file && !uploading && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 24, display: 'flex', gap: 16 }}
              >
                <motion.button
                  onClick={handleUpload}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #0077cc 0%, #00d68f 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 10px 30px rgba(0, 119, 204, 0.3)',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(0, 119, 204, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Dna size={20} />
                  Analyze Genomic Data
                </motion.button>

                <motion.button
                  onClick={() => {
                    setFile(null);
                    setError('');
                  }}
                  style={{
                    padding: '16px 24px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                  whileHover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
              </motion.div>
            )}
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                padding: 24,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
                Supported Formats
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {supportedFormats.map((format, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    style={{
                      padding: 12,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{format.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#ffffff' }}>
                        {format.ext}
                      </div>
                      <div style={{ fontSize: 12, color: '#a3a3a3' }}>
                        {format.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                marginTop: 24,
                padding: 24,
                background: 'rgba(0, 119, 204, 0.1)',
                border: '1px solid rgba(0, 119, 204, 0.3)',
                borderRadius: 16,
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#0077cc' }}>
                What Happens Next?
              </h4>
              <ul style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.8, paddingLeft: 20 }}>
                <li>Your file is processed securely</li>
                <li>AI analyzes genetic markers</li>
                <li>Risk assessment is generated</li>
                <li>Personalized recommendations provided</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
