import { useState } from 'react';
import { motion } from 'motion/react';
import { MachineCard } from './MachineCard';
import type { TrashAmounts } from '../App';

interface MachineSectionProps {
  trashAmounts: TrashAmounts;
  setTrashAmounts: React.Dispatch<React.SetStateAction<TrashAmounts>>;
}

export interface MachineOutput {
  refabricator: { filament: number };
  facm: { ingots: number };
  oscar: { syngas: number; char: number };
  hmc: { tiles: number };
}

export function MachineSection({ trashAmounts, setTrashAmounts }: MachineSectionProps) {
  const [outputs, setOutputs] = useState<MachineOutput>({
    refabricator: { filament: 0 },
    facm: { ingots: 0 },
    oscar: { syngas: 0, char: 0 },
    hmc: { tiles: 0 }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Advanced Recycling Machines
        </h2>
        <p className="text-blue-200">Select materials and process them through our state-of-the-art systems</p>
      </div>

      {/* Current Inventory */}
      <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg text-blue-300 mb-4 text-center">Available Materials Inventory</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl text-yellow-400">{trashAmounts.plastic.toFixed(1)} kg</div>
            <div className="text-sm text-yellow-300/70">Plastic</div>
          </div>
          <div>
            <div className="text-2xl text-purple-400">{trashAmounts.fabric.toFixed(1)} kg</div>
            <div className="text-sm text-purple-300/70">Fabric</div>
          </div>
          <div>
            <div className="text-2xl text-gray-300">{trashAmounts.metals.toFixed(1)} kg</div>
            <div className="text-sm text-gray-400/70">Metals</div>
          </div>
        </div>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Refabricator */}
        <MachineCard
          name="Refabricator"
          description="Converts plastic waste into high-quality 3D printing filament"
          acceptedMaterials={['plastic']}
          trashAmounts={trashAmounts}
          setTrashAmounts={setTrashAmounts}
          outputs={outputs}
          setOutputs={setOutputs}
          color="yellow"
        />

        {/* FACM */}
        <MachineCard
          name="FACM"
          description="Forging and Casting Metal system - transforms scrap metal into usable ingots"
          acceptedMaterials={['metals']}
          trashAmounts={trashAmounts}
          setTrashAmounts={setTrashAmounts}
          outputs={outputs}
          setOutputs={setOutputs}
          color="gray"
        />

        {/* Oscar */}
        <MachineCard
          name="Oscar"
          description="Organic Syngas Conversion - processes all materials (except metals) into syngas and biochar"
          acceptedMaterials={['plastic', 'fabric']}
          trashAmounts={trashAmounts}
          setTrashAmounts={setTrashAmounts}
          outputs={outputs}
          setOutputs={setOutputs}
          color="green"
        />

        {/* HMC */}
        <MachineCard
          name="HMC"
          description="Hybrid Material Compactor - creates radiation-shielding tiles from plastic and fabric"
          acceptedMaterials={['plastic', 'fabric']}
          trashAmounts={trashAmounts}
          setTrashAmounts={setTrashAmounts}
          outputs={outputs}
          setOutputs={setOutputs}
          color="blue"
        />
      </div>
    </motion.div>
  );
}
