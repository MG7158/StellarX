import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Factory, Play, CheckCircle2, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ToolSelector } from './ToolSelector';
import { toast } from 'sonner@2.0.3';
import type { TrashAmounts } from '../App';
import type { MachineOutput } from './MachineSection';

interface MachineCardProps {
  name: string;
  description: string;
  acceptedMaterials: Array<keyof TrashAmounts>;
  trashAmounts: TrashAmounts;
  setTrashAmounts: React.Dispatch<React.SetStateAction<TrashAmounts>>;
  outputs: MachineOutput;
  setOutputs: React.Dispatch<React.SetStateAction<MachineOutput>>;
  color: 'yellow' | 'gray' | 'green' | 'blue';
}

export function MachineCard({
  name,
  description,
  acceptedMaterials,
  trashAmounts,
  setTrashAmounts,
  outputs,
  setOutputs,
  color
}: MachineCardProps) {
  const [inputs, setInputs] = useState<Partial<TrashAmounts>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToolSelector, setShowToolSelector] = useState(false);

  const colorClasses = {
    yellow: {
      border: 'border-yellow-500/50',
      bg: 'from-yellow-900/40 to-yellow-950/40',
      text: 'text-yellow-400',
      button: 'from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-yellow-500/50',
      glow: 'bg-yellow-500/20'
    },
    gray: {
      border: 'border-gray-400/50',
      bg: 'from-gray-800/40 to-gray-900/40',
      text: 'text-gray-300',
      button: 'from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 shadow-gray-500/50',
      glow: 'bg-gray-400/20'
    },
    green: {
      border: 'border-green-500/50',
      bg: 'from-green-900/40 to-green-950/40',
      text: 'text-green-400',
      button: 'from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-green-500/50',
      glow: 'bg-green-500/20'
    },
    blue: {
      border: 'border-blue-500/50',
      bg: 'from-blue-900/40 to-blue-950/40',
      text: 'text-blue-400',
      button: 'from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 shadow-blue-500/50',
      glow: 'bg-blue-500/20'
    }
  };

  const colors = colorClasses[color];

  const handleInputChange = (material: keyof TrashAmounts, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [material]: numValue }));
  };

  const handleProcess = () => {
    // Validation
    const totalInput = Object.entries(inputs).reduce((sum, [key, value]) => {
      if (acceptedMaterials.includes(key as keyof TrashAmounts)) {
        return sum + (value || 0);
      }
      return sum;
    }, 0);

    if (totalInput <= 0) {
      toast.error('Mars Recycling System', {
        description: 'Please enter material amounts to process'
      });
      return;
    }

    // Check if sufficient materials available
    for (const [material, amount] of Object.entries(inputs)) {
      if (amount && amount > 0) {
        const available = trashAmounts[material as keyof TrashAmounts];
        if (amount > available) {
          toast.error('Mars Recycling System', {
            description: `Insufficient ${material}. Available: ${available.toFixed(1)} kg`
          });
          return;
        }
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Deduct materials
      const newAmounts = { ...trashAmounts };
      Object.entries(inputs).forEach(([material, amount]) => {
        if (amount && amount > 0) {
          newAmounts[material as keyof TrashAmounts] = Math.max(0, newAmounts[material as keyof TrashAmounts] - amount);
        }
      });
      setTrashAmounts(newAmounts);

      // Calculate outputs based on machine type
      const newOutputs = { ...outputs };
      
      if (name === 'Refabricator') {
        const plasticUsed = inputs.plastic || 0;
        newOutputs.refabricator.filament += plasticUsed * 0.85; // 85% conversion rate
        toast.success('Mars Recycling System', {
          description: `Produced ${(plasticUsed * 0.85).toFixed(1)} kg of 3D filament`
        });
      } else if (name === 'FACM') {
        const metalsUsed = inputs.metals || 0;
        newOutputs.facm.ingots += metalsUsed * 0.90; // 90% conversion rate
        toast.success('Mars Recycling System', {
          description: `Forged ${(metalsUsed * 0.90).toFixed(1)} kg of metal ingots`
        });
      } else if (name === 'Oscar') {
        const plasticUsed = inputs.plastic || 0;
        const fabricUsed = inputs.fabric || 0;
        const totalUsed = plasticUsed + fabricUsed;
        newOutputs.oscar.syngas += totalUsed * 0.70; // 70% syngas
        newOutputs.oscar.char += totalUsed * 0.05; // 5% char (small amount)
        toast.success('Mars Recycling System', {
          description: `Generated ${(totalUsed * 0.70).toFixed(1)} kg syngas and ${(totalUsed * 0.05).toFixed(2)} kg char`
        });
      } else if (name === 'HMC') {
        const plasticUsed = inputs.plastic || 0;
        const fabricUsed = inputs.fabric || 0;
        const totalUsed = plasticUsed + fabricUsed;
        newOutputs.hmc.tiles += Math.floor(totalUsed / 2); // 2kg makes 1 tile
        toast.success('Mars Recycling System', {
          description: `Manufactured ${Math.floor(totalUsed / 2)} radiation-shielding tiles`
        });
      }

      setOutputs(newOutputs);
      setInputs({});
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden`}
    >
      {/* Processing overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Factory className={`w-16 h-16 ${colors.text}`} />
            </motion.div>
            <p className="mt-4 text-lg">Processing...</p>
            <div className="w-48 h-1 bg-slate-700 rounded-full mt-4 overflow-hidden">
              <motion.div
                className={`h-full ${colors.glow} bg-gradient-to-r`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-2xl ${colors.text} mb-1`}>{name}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <Factory className={`w-8 h-8 ${colors.text}`} />
      </div>

      {/* Accepted Materials */}
      <div className="mb-4">
        <Label className="text-xs text-slate-400 mb-2 block">Accepted Materials:</Label>
        <div className="flex gap-2 flex-wrap">
          {acceptedMaterials.map(material => (
            <span
              key={material}
              className={`px-3 py-1 rounded-full text-xs ${
                material === 'plastic' ? 'bg-yellow-500/20 text-yellow-300' :
                material === 'fabric' ? 'bg-purple-500/20 text-purple-300' :
                'bg-gray-500/20 text-gray-300'
              }`}
            >
              {material.charAt(0).toUpperCase() + material.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="space-y-3 mb-4">
        {acceptedMaterials.map(material => (
          <div key={material}>
            <Label className="text-sm text-slate-300 mb-1 block capitalize">{material} (kg)</Label>
            <Input
              type="number"
              min="0"
              max={trashAmounts[material]}
              step="0.1"
              value={inputs[material] || ''}
              onChange={(e) => handleInputChange(material, e.target.value)}
              placeholder={`Available: ${trashAmounts[material].toFixed(1)} kg`}
              className="bg-slate-900/50 border-slate-700 text-white"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleProcess}
        disabled={isProcessing}
        className={`w-full bg-gradient-to-r ${colors.button} text-white shadow-lg transition-all mb-4`}
      >
        <Play className="w-4 h-4 mr-2" />
        {isProcessing ? 'Processing...' : 'Start Processing'}
      </Button>

      {/* Outputs */}
      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
        <h4 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Production Output
        </h4>
        <div className="space-y-2">
          {name === 'Refabricator' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">3D Filament:</span>
                <span className={`${colors.text}`}>{outputs.refabricator.filament.toFixed(1)} kg</span>
              </div>
              {outputs.refabricator.filament > 0 && (
                <Button
                  onClick={() => setShowToolSelector(!showToolSelector)}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  3D Print Tools
                </Button>
              )}
            </>
          )}
          {name === 'FACM' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Metal Ingots:</span>
                <span className={`${colors.text}`}>{outputs.facm.ingots.toFixed(1)} kg</span>
              </div>
              {outputs.facm.ingots > 0 && (
                <Button
                  onClick={() => setShowToolSelector(!showToolSelector)}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Forge Tools
                </Button>
              )}
            </>
          )}
          {name === 'Oscar' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Syngas:</span>
                <span className={`${colors.text}`}>{outputs.oscar.syngas.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Biochar:</span>
                <span className={`${colors.text}`}>{outputs.oscar.char.toFixed(2)} kg</span>
              </div>
            </>
          )}
          {name === 'HMC' && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Radiation Tiles:</span>
              <span className={`${colors.text}`}>{outputs.hmc.tiles} units</span>
            </div>
          )}
        </div>
      </div>

      {/* Tool Selector */}
      <AnimatePresence>
        {showToolSelector && (
          <ToolSelector
            machineType={name === 'Refabricator' ? 'filament' : 'metal'}
            availableMaterial={name === 'Refabricator' ? outputs.refabricator.filament : outputs.facm.ingots}
            onClose={() => setShowToolSelector(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
