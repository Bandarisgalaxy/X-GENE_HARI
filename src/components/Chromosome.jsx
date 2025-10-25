import { motion } from 'framer-motion';

const Chromosome = ({ number = 1, active = false, size = 80 }) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: size,
        height: size * 1.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg width={size} height={size * 1.5} viewBox="0 0 100 150">
        <defs>
          <linearGradient id={`chromoGrad${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: active ? '#00d68f' : '#1a9bff', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: active ? '#0077cc' : '#4db1ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: active ? '#00d68f' : '#1a9bff', stopOpacity: 1 }} />
          </linearGradient>
          <filter id={`chromoGlow${number}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 40 10 Q 30 30, 40 50 Q 50 70, 40 90 Q 30 110, 40 130 Q 45 140, 50 145"
          stroke={`url(#chromoGrad${number})`}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter={`url(#chromoGlow${number})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: active ? 1 : 0.6,
          }}
          transition={{ duration: 1, delay: number * 0.05 }}
        />

        <motion.path
          d="M 60 10 Q 70 30, 60 50 Q 50 70, 60 90 Q 70 110, 60 130 Q 55 140, 50 145"
          stroke={`url(#chromoGrad${number})`}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter={`url(#chromoGlow${number})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: active ? 1 : 0.6,
          }}
          transition={{ duration: 1, delay: number * 0.05 + 0.1 }}
        />

        <motion.circle
          cx="50"
          cy="75"
          r="8"
          fill={active ? '#00d68f' : '#0077cc'}
          filter={`url(#chromoGlow${number})`}
          animate={{
            scale: active ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect
            key={i}
            x={35 + (i % 2) * 30}
            y={20 + i * 15}
            width="5"
            height="10"
            rx="2"
            fill={`url(#chromoGrad${number})`}
            opacity={0.7}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
          />
        ))}
      </svg>

      <motion.div
        style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: 600,
          color: active ? '#00d68f' : '#4db1ff',
          fontFamily: 'JetBrains Mono, monospace',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        CHR {number}
      </motion.div>
    </motion.div>
  );
};

export default Chromosome;
