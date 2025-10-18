import { motion } from 'motion/react';
import { Sparkles, Package } from 'lucide-react';
import { Button } from './ui/button';

interface TrashContainerProps {
  onStartSorting: () => void;
}

export function TrashContainer({ onStartSorting }: TrashContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
    >
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-4 border-blue-500/50 shadow-2xl shadow-blue-500/20 flex items-center justify-center relative overflow-hidden">
          {/* Mixed trash visualization */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center p-8 gap-3">
            {/* Plastic pieces */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-yellow-500 rounded-lg opacity-70"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-yellow-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-8 bg-yellow-600 rounded opacity-80"
            />
            
            {/* Fabric pieces */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="w-16 h-12 bg-purple-500 rounded-xl opacity-70"
            />
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-purple-400 rounded-lg opacity-60"
            />
            
            {/* Metal pieces */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gray-400 rounded-sm opacity-80 shadow-lg"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 bg-gray-500 rounded opacity-70 shadow-lg"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 bg-gray-300 rounded-full opacity-90 shadow-lg"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
        </div>

        {/* Floating particles */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </motion.div>
      </motion.div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-blue-300">
          <Package className="w-5 h-5" />
          <p className="text-lg">Mixed Space Debris Container</p>
        </div>
        <p className="text-slate-400 max-w-md">
          Contains plastic, fabric, and metal waste collected from Mars operations. 
          Unknown quantities - AI sorting required.
        </p>
      </div>

      <Button
        onClick={onStartSorting}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all"
      >
        <Sparkles className="w-6 h-6 mr-2" />
        Start AI Sorting
      </Button>
    </motion.div>
  );
}
