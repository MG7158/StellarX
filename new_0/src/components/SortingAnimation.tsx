import { motion } from 'motion/react';
import { Bot, Zap } from 'lucide-react';

export function SortingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-12"
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex items-center justify-center gap-3"
        >
          <Bot className="w-12 h-12 text-blue-400" />
          <h2 className="text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Sorting in Progress
          </h2>
          <Zap className="w-12 h-12 text-purple-400" />
        </motion.div>
        <p className="text-blue-200">Advanced robotic systems analyzing and categorizing debris...</p>
      </div>

      {/* Robotic Arm Animation */}
      <div className="relative w-full max-w-4xl h-96">
        {/* Source container */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-32 bg-slate-800 border-2 border-blue-500 rounded-2xl flex items-center justify-center"
        >
          <div className="text-center text-sm text-blue-300">Mixed Trash</div>
        </motion.div>

        {/* Robotic Arm */}
        <motion.div
          className="absolute left-1/2 top-32 -translate-x-1/2"
          animate={{
            rotate: [-30, 30, -30],
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            {/* Arm base */}
            <div className="w-4 h-24 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50" />
            
            {/* Gripper */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
              animate={{
                scaleX: [1, 0.7, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex gap-1">
                <div className="w-2 h-6 bg-yellow-400 rounded" />
                <div className="w-2 h-6 bg-yellow-400 rounded" />
              </div>
            </motion.div>

            {/* Energy effect */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Zap className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Target containers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-yellow-400 rounded-xl flex items-center justify-center text-xs text-center"
          >
            Plastic
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-purple-400 rounded-xl flex items-center justify-center text-xs text-center"
          >
            Fabric
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-24 h-24 bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-300 rounded-xl flex items-center justify-center text-xs text-center"
          >
            Metals
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
