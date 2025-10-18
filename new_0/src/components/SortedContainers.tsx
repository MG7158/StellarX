import { motion } from 'motion/react';
import { ArrowRight, Package2 } from 'lucide-react';
import { Button } from './ui/button';
import type { TrashAmounts } from '../App';

interface SortedContainersProps {
  trashAmounts: TrashAmounts;
  onProceed: () => void;
}

export function SortedContainers({ trashAmounts, onProceed }: SortedContainersProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-12 py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Sorting Complete!
        </h2>
        <p className="text-blue-200">Space debris successfully categorized and ready for processing</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Plastic Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-950/40 border-2 border-yellow-500/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Package2 className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-center text-xl text-yellow-300 mb-2">Plastic</h3>
            
            {/* Visual representation */}
            <div className="relative h-40 bg-yellow-950/30 rounded-xl border border-yellow-600/30 mb-4 overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(trashAmounts.plastic / 80) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-500 to-yellow-600/50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-4xl text-white drop-shadow-lg z-10"
                >
                  {trashAmounts.plastic} kg
                </motion.div>
              </div>
            </div>
            
            <div className="text-center text-sm text-yellow-200/70">
              Recyclable polymers and composites
            </div>
          </div>
        </motion.div>

        {/* Fabric Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border-2 border-purple-500/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Package2 className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-center text-xl text-purple-300 mb-2">Fabric</h3>
            
            {/* Visual representation */}
            <div className="relative h-40 bg-purple-950/30 rounded-xl border border-purple-600/30 mb-4 overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(trashAmounts.fabric / 65) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-600/50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-4xl text-white drop-shadow-lg z-10"
                >
                  {trashAmounts.fabric} kg
                </motion.div>
              </div>
            </div>
            
            <div className="text-center text-sm text-purple-200/70">
              Textiles and fibrous materials
            </div>
          </div>
        </motion.div>

        {/* Metal Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-2 border-gray-400/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Package2 className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-center text-xl text-gray-300 mb-2">Metals</h3>
            
            {/* Visual representation */}
            <div className="relative h-40 bg-gray-950/30 rounded-xl border border-gray-600/30 mb-4 overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(trashAmounts.metals / 55) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="absolute bottom-0 w-full bg-gradient-to-t from-gray-400 to-gray-500/50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-4xl text-white drop-shadow-lg z-10"
                >
                  {trashAmounts.metals} kg
                </motion.div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-300/70">
              Aluminum, steel, and alloys
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={onProceed}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-6 text-xl shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all"
        >
          Proceed to Recycling Machines
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
