import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MousePointerClick, Plus, DollarSign, Star, 
  Bot, Factory, Atom, Sparkles, Trophy,
  Timer, Zap
} from "lucide-react";

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  multiplier: number;
  count: number;
  perSecond: number;
  category: 'click' | 'passive' | 'multiplier' | 'special';
  description: string;
  icon: React.ReactNode;
}

const INITIAL_UPGRADES: Upgrade[] = [
  { 
    id: 'cursor', 
    name: 'Better Cursor', 
    cost: 10, 
    multiplier: 1, 
    count: 0, 
    perSecond: 0,
    category: 'click',
    description: 'Increases click value by 1',
    icon: <MousePointerClick className="w-5 h-5" />
  },
  { 
    id: 'doubleClick', 
    name: 'Double Click', 
    cost: 50, 
    multiplier: 2, 
    count: 0, 
    perSecond: 0,
    category: 'click',
    description: 'Two clicks for the price of one',
    icon: <Plus className="w-5 h-5" />
  },
  { 
    id: 'powerClick', 
    name: 'Power Click', 
    cost: 200, 
    multiplier: 5, 
    count: 0, 
    perSecond: 0,
    category: 'click',
    description: 'Massive click power boost',
    icon: <Zap className="w-5 h-5" />
  },

  { 
    id: 'autoClicker', 
    name: 'Auto Clicker', 
    cost: 15, 
    multiplier: 0, 
    count: 0, 
    perSecond: 0.1,
    category: 'passive',
    description: 'Automatically clicks every second',
    icon: <MousePointerClick className="w-5 h-5" />
  },
  { 
    id: 'robot', 
    name: 'Click Robot', 
    cost: 100, 
    multiplier: 0, 
    count: 0, 
    perSecond: 1,
    category: 'passive',
    description: 'A robot that clicks for you',
    icon: <Bot className="w-5 h-5" />
  },
  { 
    id: 'factory', 
    name: 'Click Factory', 
    cost: 500, 
    multiplier: 0, 
    count: 0, 
    perSecond: 5,
    category: 'passive',
    description: 'Industrial-scale clicking',
    icon: <Factory className="w-5 h-5" />
  },
  { 
    id: 'quantum', 
    name: 'Quantum Clicker', 
    cost: 2000, 
    multiplier: 0, 
    count: 0, 
    perSecond: 25,
    category: 'passive',
    description: 'Clicks across multiple dimensions',
    icon: <Atom className="w-5 h-5" />
  },

  { 
    id: 'boost', 
    name: 'Point Boost', 
    cost: 150, 
    multiplier: 2, 
    count: 0, 
    perSecond: 0,
    category: 'multiplier',
    description: 'Multiplies all points gained',
    icon: <Star className="w-5 h-5" />
  },
  { 
    id: 'superBoost', 
    name: 'Super Boost', 
    cost: 1000, 
    multiplier: 5, 
    count: 0, 
    perSecond: 0,
    category: 'multiplier',
    description: 'Massive point multiplication',
    icon: <Sparkles className="w-5 h-5" />
  },

  { 
    id: 'goldClick', 
    name: 'Golden Click', 
    cost: 300, 
    multiplier: 0, 
    count: 0, 
    perSecond: 0,
    category: 'special',
    description: '1% chance for 10x points on click',
    icon: <DollarSign className="w-5 h-5" />
  },
  { 
    id: 'timeDilation', 
    name: 'Time Dilation', 
    cost: 750, 
    multiplier: 0, 
    count: 0, 
    perSecond: 0,
    category: 'special',
    description: '5% faster passive income',
    icon: <Timer className="w-5 h-5" />
  }
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
  const [cursorPosition, setCursorPosition] = useState(0);
  const hasAutoClicker = upgrades.some(u => u.category === 'passive' && u.count > 0);

  const totalMultiplier = upgrades.reduce((acc, upgrade) => 
    acc + (upgrade.multiplier * upgrade.count), 1);
  const pointsPerSecond = upgrades.reduce((acc, upgrade) => 
    acc + (upgrade.perSecond * upgrade.count), 0);

  const timeDilationFactor = () => {
    const timeDilation = upgrades.find(u => u.id === 'timeDilation');
    return timeDilation ? 1 + (0.05 * timeDilation.count) : 1;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (pointsPerSecond > 0) {
        setScore(prev => prev + (pointsPerSecond * timeDilationFactor()));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [pointsPerSecond]);

  useEffect(() => {
    localStorage.setItem('clickerScore', score.toString());
    localStorage.setItem('clickerUpgrades', JSON.stringify(upgrades));
  }, [score, upgrades]);

  useEffect(() => {
    if (!hasAutoClicker) return;

    const interval = setInterval(() => {
      setCursorPosition(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [hasAutoClicker]);

  const handleClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let clickPoints = totalMultiplier;
    
    const goldenClickUpgrade = upgrades.find(u => u.id === 'goldClick');
    if (goldenClickUpgrade && goldenClickUpgrade.count > 0) {
      if (Math.random() < 0.01 * goldenClickUpgrade.count) {
        clickPoints *= 10;
        toast.success("Golden Click! 10x points!");
      }
    }

    setScore(prev => prev + clickPoints);
    setParticles(prev => [
      ...prev,
      { id: Date.now(), x, y }
    ]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== Date.now()));
    }, 1000);
  };

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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="glass-panel rounded-2xl p-6 text-center space-y-2">
          <h1 className="text-4xl font-bold">{score.toLocaleString()} Points</h1>
          <p className="text-muted-foreground">
            {pointsPerSecond > 0 && `${pointsPerSecond} points per second`}
          </p>
        </div>

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
            {hasAutoClicker && (
              <motion.div
                className="absolute w-full h-full"
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(${cursorPosition}deg)`
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <MousePointerClick className="w-6 h-6 text-primary animate-pulse" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={handleClick}
            className="w-48 h-48 rounded-full glass-panel hover:bg-accent/20 
              active:scale-95 transition-all duration-200 shadow-lg hover:shadow-primary/20
              flex items-center justify-center text-2xl font-bold relative overflow-hidden
              before:absolute before:inset-0 before:bg-primary/10 before:animate-pulse"
          >
            CLICK!
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {(['click', 'passive', 'multiplier', 'special'] as const).map(category => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-bold capitalize glass-panel px-4 py-2 rounded-lg inline-block">
                {category} Upgrades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {upgrades
                  .filter(upgrade => upgrade.category === category)
                  .map(upgrade => (
                    <button
                      key={upgrade.id}
                      onClick={() => buyUpgrade(upgrade.id)}
                      className="glass-panel p-4 rounded-xl text-left space-y-2 hover:bg-accent/20 
                        transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent
                        hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-primary/10"
                      disabled={score < upgrade.cost}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="text-primary">{upgrade.icon}</div>
                          <h3 className="font-semibold">{upgrade.name}</h3>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Cost: {upgrade.cost}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{upgrade.description}</p>
                      <div className="text-sm text-muted-foreground">
                        Owned: {upgrade.count}
                        {upgrade.multiplier > 0 && ` (${upgrade.multiplier}x per click)`}
                        {upgrade.perSecond > 0 && ` (+${upgrade.perSecond}/s)`}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
