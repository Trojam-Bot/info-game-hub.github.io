
import { useState } from "react";
import { FeaturedGame } from "@/components/FeaturedGame";
import { GameCard } from "@/components/GameCard";
import { Search } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["Adventure", "Puzzle", "Story-Rich"]
  },
  {
    id: "3",
    title: "Death Stranding",
    category: "Action",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tags: ["Action", "Open World", "Story-Rich"]
  },
  {
    id: "4",
    title: "Horizon Zero Dawn",
    category: "RPG",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["RPG", "Action", "Open World"]
  },
  {
    id: "5",
    title: "Red Dead Redemption 2",
    category: "Action",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["Action", "Adventure", "Open World"]
  },
  {
    id: "6",
    title: "Elden Ring",
    category: "RPG",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    tags: ["RPG", "Action", "Souls-like"]
  },
  {
    id: "7",
    title: "God of War",
    category: "Action",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    tags: ["Action", "Adventure", "Story-Rich"]
  },
  {
    id: "8",
    title: "The Witcher 3",
    category: "RPG",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    tags: ["RPG", "Open World", "Story-Rich"]
  },
  {
    id: "9",
    title: "Portal 2",
    category: "Puzzle",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    tags: ["Puzzle", "Co-op", "Sci-fi"]
  }
];

const ALL_TAGS = Array.from(
  new Set(GAMES.flatMap(game => game.tags))
).sort();

const Index = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => game.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FeaturedGame {...FEATURED_GAME} />
      
      <div className="flex gap-6 mt-12">
        {/* Sidebar */}
        <aside className={`w-64 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="glass-panel rounded-xl p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  className="sidebar-tag"
                  data-selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search games..."
                className="search-bar pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="glass-panel p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                Filters
              </button>
            )}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
