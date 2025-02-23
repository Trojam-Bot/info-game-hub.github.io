
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const GameCard = ({ id, title, image, category }: GameCardProps) => {
  return (
    <Link to={`/game/${id}`} className="game-card group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="game-card-image"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 p-3 w-full">
          <div className="space-y-1.5">
            <div className="inline-block px-2 py-0.5 text-xs rounded-full glass-panel">
              {category}
            </div>
            <h3 className="text-sm font-medium tracking-tight line-clamp-2">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
