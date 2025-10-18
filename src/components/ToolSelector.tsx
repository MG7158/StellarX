import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Coffee, Box, Wrench, Hammer, Drill, Scissors } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface ToolSelectorProps {
  machineType: 'filament' | 'metal';
  availableMaterial: number;
  onClose: () => void;
}

interface Tool {
  name: string;
  icon: React.ReactNode;
  cost: number;
  description: string;
}

const filamentTools: Tool[] = [
  { name: 'Cup', icon: <Coffee className="w-8 h-8" />, cost: 0.5, description: 'Drinking vessel' },
  { name: 'Storage Box', icon: <Box className="w-8 h-8" />, cost: 2.0, description: 'Container for parts' },
  { name: 'Wrench', icon: <Wrench className="w-8 h-8" />, cost: 1.5, description: 'Adjustable tool' },
  { name: 'Scissors', icon: <Scissors className="w-8 h-8" />, cost: 0.8, description: 'Cutting tool' },
];

const metalTools: Tool[] = [
  { name: 'Hammer', icon: <Hammer className="w-8 h-8" />, cost: 3.0, description: 'Heavy duty hammer' },
  { name: 'Drill Bit', icon: <Drill className="w-8 h-8" />, cost: 2.5, description: 'Precision drilling' },
  { name: 'Wrench Set', icon: <Wrench className="w-8 h-8" />, cost: 4.0, description: 'Complete set' },
  { name: 'Metal Box', icon: <Box className="w-8 h-8" />, cost: 5.0, description: 'Reinforced container' },
];

export function ToolSelector({ machineType, availableMaterial, onClose }: ToolSelectorProps) {
  const tools = machineType === 'filament' ? filamentTools : metalTools;
  const [producing, setProducing] = useState<string | null>(null);

  const handleProduce = (tool: Tool) => {
    if (tool.cost > availableMaterial) {
      toast.error('Mars Recycling System', {
        description: `Insufficient material. Need ${tool.cost} kg, have ${availableMaterial.toFixed(1)} kg`
      });
      return;
    }

    setProducing(tool.name);
    
    setTimeout(() => {
      toast.success('Mars Recycling System', {
        description: `Successfully created ${tool.name}!`
      });
      setProducing(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-blue-500/50 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-blue-400">Tool Manufacturing</h3>
            <p className="text-sm text-slate-400 mt-1">
              Available Material: {availableMaterial.toFixed(1)} kg
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ scale: 1.02 }}
              className={`bg-slate-800/50 border-2 ${
                tool.cost <= availableMaterial ? 'border-blue-500/30' : 'border-red-500/30'
              } rounded-xl p-4 text-center`}
            >
              <div className="flex justify-center mb-3 text-blue-400">
                {tool.icon}
              </div>
              <h4 className="text-lg mb-1">{tool.name}</h4>
              <p className="text-xs text-slate-400 mb-3">{tool.description}</p>
              <p className="text-sm text-blue-300 mb-3">Cost: {tool.cost} kg</p>
              
              <Button
                onClick={() => handleProduce(tool)}
                disabled={tool.cost > availableMaterial || producing === tool.name}
                size="sm"
                className={`w-full ${
                  tool.cost <= availableMaterial
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : 'bg-slate-700'
                }`}
              >
                {producing === tool.name ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
