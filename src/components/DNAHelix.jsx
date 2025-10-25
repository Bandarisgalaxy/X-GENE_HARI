import { motion } from 'framer-motion';

const DNAHelix = ({ size = 400, speed = 20 }) => {
  const particles = 50;
  const radius = size / 8;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0077cc', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#1a9bff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00d68f', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: particles }).map((_, i) => {
          const t = (i / particles) * Math.PI * 4;
          const x1 = size / 2 + radius * Math.cos(t);
          const y1 = (i / particles) * size;
          const x2 = size / 2 - radius * Math.cos(t);
          const y2 = y1;

          return (
            <g key={i}>
              <motion.circle
                cx={x1}
                cy={y1}
                r={4}
                fill="url(#helixGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.circle
                cx={x2}
                cy={y2}
                r={4}
                fill="url(#helixGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.02 + 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#helixGradient)"
                strokeWidth={1.5}
                opacity={0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: i * 0.01,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DNAHelix;
