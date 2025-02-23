
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  
  // This would normally fetch from an API
  const game = {
    title: "Cyberpunk 2077",
    description: "Experience the dark future in this open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    developer: "CD Projekt Red",
    releaseDate: "December 10, 2020",
    genre: ["RPG", "Action", "Open World"],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    screenshots: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    ],
    purchaseLinks: [
      { platform: "Steam", url: "#" },
      { platform: "Epic Games", url: "#" },
      { platform: "GOG", url: "#" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="relative h-[50vh] rounded-2xl overflow-hidden">
          <img
            src={game.screenshots[0]}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 p-8">
            <h1 className="text-4xl font-bold">{game.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">{game.description}</p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${game.title} Screenshot ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Game Info</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-muted-foreground">Developer</dt>
                  <dd>{game.developer}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Release Date</dt>
                  <dd>{game.releaseDate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Genres</dt>
                  <dd className="flex flex-wrap gap-2">
                    {game.genre.map((g) => (
                      <span key={g} className="glass-panel px-2 py-1 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Platforms</dt>
                  <dd className="flex flex-wrap gap-2">
                    {game.platforms.map((p) => (
                      <span key={p} className="glass-panel px-2 py-1 rounded-full text-sm">
                        {p}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Purchase</h2>
              <div className="space-y-3">
                {game.purchaseLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="block w-full glass-panel hover:bg-accent px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    Buy on {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
