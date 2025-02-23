
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  multiplier: number;
  count: number;
  perSecond: number;
}

const INITIAL_UPGRADES: Upgrade[] = [
  { id: 'click', name: 'Better Click', cost: 10, multiplier: 1, count: 0, perSecond: 0 },
  { id: 'auto', name: 'Auto Clicker', cost: 50, multiplier: 0, count: 0, perSecond: 1 },
  { id: 'boost', name: 'Point Boost', cost: 100, multiplier: 2, count: 0, perSecond: 0 },
];

const Index = () => {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('clickerScore');
    return saved ? parseInt(saved) : 0;
  });
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    const saved = localStorage.getItem('clickerUpgrades');
    return saved ? JSON.parse(saved) : INITIAL_UPGRADES;
  });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Calculate total multiplier and points per second
  const totalMultiplier = upgrades.reduce((acc, upgrade) => 
    acc + (upgrade.multiplier * upgrade.count), 1);
  const pointsPerSecond = upgrades.reduce((acc, upgrade) => 
    acc + (upgrade.perSecond * upgrade.count), 0);

  // Auto-clicker effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (pointsPerSecond > 0) {
        setScore(prev => prev + pointsPerSecond);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [pointsPerSecond]);

  // Save game state
  useEffect(() => {
    localStorage.setItem('clickerScore', score.toString());
    localStorage.setItem('clickerUpgrades', JSON.stringify(upgrades));
  }, [score, upgrades]);

  // Handle main click
  const handleClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setScore(prev => prev + totalMultiplier);
    setParticles(prev => [
      ...prev,
      { id: Date.now(), x, y }
    ]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== Date.now()));
    }, 1000);
  };

  // Handle upgrade purchase
  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    if (score >= upgrade.cost) {
      setScore(prev => prev - upgrade.cost);
      setUpgrades(prev => prev.map(u => 
        u.id === upgradeId 
          ? { 
              ...u, 
              count: u.count + 1,
              cost: Math.floor(u.cost * 1.5) // Increase cost for next purchase
            }
          : u
      ));
      toast.success(`Purchased ${upgrade.name}!`);
    } else {
      toast.error("Not enough points!");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Score Display */}
        <div className="glass-panel rounded-2xl p-6 text-center space-y-2">
          <h1 className="text-4xl font-bold">{score.toLocaleString()} Points</h1>
          <p className="text-muted-foreground">
            {pointsPerSecond > 0 && `${pointsPerSecond} points per second`}
          </p>
        </div>

        {/* Main Clicker Button */}
        <div className="relative flex justify-center">
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }}
                animate={{ opacity: 0, scale: 2, y: particle.y - 100 }}
                exit={{ opacity: 0 }}
                className="absolute text-primary font-bold"
                transition={{ duration: 1 }}
              >
                +{totalMultiplier}
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            onClick={handleClick}
            className="w-48 h-48 rounded-full glass-panel hover:bg-accent/20 
              active:scale-95 transition-all duration-200 shadow-lg hover:shadow-primary/20
              flex items-center justify-center text-2xl font-bold"
          >
            CLICK!
          </button>
        </div>

        {/* Upgrades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upgrades.map(upgrade => (
            <button
              key={upgrade.id}
              onClick={() => buyUpgrade(upgrade.id)}
              className="glass-panel p-4 rounded-xl text-left space-y-2 hover:bg-accent/20 
                transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={score < upgrade.cost}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{upgrade.name}</h3>
                <span className="text-sm text-muted-foreground">
                  Cost: {upgrade.cost}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Owned: {upgrade.count}
                {upgrade.multiplier > 0 && ` (${upgrade.multiplier}x per click)`}
                {upgrade.perSecond > 0 && ` (+${upgrade.perSecond}/s)`}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
