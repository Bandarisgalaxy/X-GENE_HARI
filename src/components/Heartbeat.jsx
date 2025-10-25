import { motion } from 'framer-motion';

const Heartbeat = ({ bpm = 72, color = '#ff3d3d', size = 200 }) => {
  const beatDuration = 60 / bpm;

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{
          scale: [1, 1.15, 1, 1.05, 1],
        }}
        transition={{
          duration: beatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 61, 61, 0.5))' }}
        >
          <motion.path
            d={heartPath}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          width: size * 1.5,
          height: size * 1.5,
          border: `2px solid ${color}`,
          borderRadius: '50%',
          opacity: 0,
        }}
        animate={{
          scale: [1, 1.5],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: beatDuration,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default Heartbeat;
