
import { FeaturedGame } from "@/components/FeaturedGame";
import { GameCard } from "@/components/GameCard";

const FEATURED_GAME = {
  id: "1",
  title: "Cyberpunk 2077",
  description: "Experience the dark future in this open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
};

const GAMES = [
  {
    id: "2",
    title: "The Last Guardian",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: "3",
    title: "Death Stranding",
    category: "Action",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: "4",
    title: "Horizon Zero Dawn",
    category: "RPG",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "5",
    title: "Red Dead Redemption 2",
    category: "Action",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  }
];

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FeaturedGame {...FEATURED_GAME} />
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Popular Games</h2>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
