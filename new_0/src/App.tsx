import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Rocket } from 'lucide-react';
import { TrashContainer } from './components/TrashContainer';
import { SortingAnimation } from './components/SortingAnimation';
import { SortedContainers } from './components/SortedContainers';
import { MachineSection } from './components/MachineSection';
import { StarField } from './components/StarField';
import { toast, Toaster } from 'sonner@2.0.3';

type Stage = 'initial' | 'sorting' | 'sorted' | 'machines';

export interface TrashAmounts {
  plastic: number;
  fabric: number;
  metals: number;
}

export default function App() {
  const [stage, setStage] = useState<Stage>('initial');
  const [trashAmounts, setTrashAmounts] = useState<TrashAmounts>({
    plastic: 0,
    fabric: 0,
    metals: 0
  });

  const handleStartSorting = () => {
    setStage('sorting');
    // Generate random amounts for demonstration
    setTimeout(() => {
      const amounts = {
        plastic: Math.floor(Math.random() * 50) + 30,
        fabric: Math.floor(Math.random() * 40) + 25,
        metals: Math.floor(Math.random() * 35) + 20
      };
      setTrashAmounts(amounts);
      setStage('sorted');
      toast.success('Mars Recycling System: AI sorting complete!', {
        description: `Sorted ${amounts.plastic + amounts.fabric + amounts.metals} kg of space debris`
      });
    }, 4000);
  };

  const handleProceedToMachines = () => {
    setStage('machines');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative">
      <StarField />
      
      {/* Header */}
      <header className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4"
          >
            <Rocket className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl md:text-6xl text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mars Recycling System
            </h1>
            <Sparkles className="w-10 h-10 text-purple-400" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-4 text-blue-200 text-lg"
          >
            Advanced AI-Powered Space Debris Recycling Technology
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {stage === 'initial' && (
            <TrashContainer key="initial" onStartSorting={handleStartSorting} />
          )}
          
          {stage === 'sorting' && (
            <SortingAnimation key="sorting" />
          )}
          
          {stage === 'sorted' && (
            <SortedContainers
              key="sorted"
              trashAmounts={trashAmounts}
              onProceed={handleProceedToMachines}
            />
          )}
          
          {stage === 'machines' && (
            <MachineSection
              key="machines"
              trashAmounts={trashAmounts}
              setTrashAmounts={setTrashAmounts}
            />
          )}
        </AnimatePresence>
      </main>

      <Toaster 
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            border: '1px solid #3b82f6',
            color: '#e0f2fe',
          },
        }}
      />
    </div>
  );
}
