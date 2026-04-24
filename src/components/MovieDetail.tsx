import { motion } from 'motion/react';
import { Bookmark, Star, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { movies } from '../data';

interface MovieDetailProps {
  movieId: string | null;
  onMovieSelect: (id: string) => void;
  starredIds: string[];
  toggleStar: (id: string, e?: React.MouseEvent) => void;
}

export function MovieDetail({ movieId, onMovieSelect, starredIds, toggleStar }: MovieDetailProps) {
  const movie = movies.find(m => m.id === movieId) || movies[0];

  return (
    <div className="flex flex-col items-center w-full pt-4 pb-32">
      {/* Banner Image */}
      <div className="w-full max-w-6xl aspect-[21/9] md:aspect-[2.35/1] overflow-hidden mb-12 md:mb-20 px-margin-page relative group">
        <button 
          onClick={() => onMovieSelect('')} 
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md text-xs tracking-widest uppercase"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <motion.img 
          key={movie?.id}
          initial={{ scale: 1.02, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={movie?.thumbnail || "https://images.unsplash.com/photo-1509333918005-95079a405903?q=80&w=2070&auto=format&fit=crop"} 
          alt={movie?.title} 
          className="w-full h-full object-cover grayscale-[0.3]"
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-3xl px-margin-page flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl md:text-7xl tracking-tighter lowercase font-light">{movie.title}</h1>
              <button onClick={(e) => toggleStar(movie.id, e)} className="hover:scale-110 transition-transform mt-2">
                <Star size={32} strokeWidth={1.5} className={`transition-colors ${starredIds.includes(movie.id) ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`} />
              </button>
            </div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500">
              {movie.director} &nbsp;&nbsp;|&nbsp;&nbsp; {movie.year}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-light tracking-tight flex items-baseline gap-1">
            9.2<span className="text-sm md:text-base text-zinc-500 font-normal">/10</span>
          </div>
        </div>

        {/* Body */}
        <article className="prose prose-zinc dark:prose-invert prose-lg md:prose-xl max-w-none text-zinc-800 dark:text-zinc-300 leading-[1.8] font-sans font-light tracking-wide">
          {movie?.content ? (
            <ReactMarkdown>{movie.content}</ReactMarkdown>
          ) : (
            <p className="text-zinc-500 italic">No review content available.</p>
          )}
        </article>

        {/* Footer Metadata */}
        <div className="mt-20 pt-8 border-t border-zinc-200/50 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-[10px] md:text-xs font-mono tracking-widest uppercase text-zinc-500">
          <div className="flex gap-4">
            <span>Cinema</span>
            <span>Sci-Fi</span>
            <span>Epic</span>
          </div>
          <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors group">
            <span>Save to Collection</span>
            <Bookmark size={14} className="group-hover:fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
