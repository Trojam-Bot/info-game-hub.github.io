
import { Link } from 'react-router-dom';

interface FeaturedGameProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const FeaturedGame = ({ id, title, description, image }: FeaturedGameProps) => {
  return (
    <Link to={`/game/${id}`} className="relative h-[70vh] overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute bottom-0 w-full p-8 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
        <button className="glass-panel px-6 py-3 rounded-full hover:bg-accent transition-colors">
          Learn More
        </button>
      </div>
    </Link>
  );
};
