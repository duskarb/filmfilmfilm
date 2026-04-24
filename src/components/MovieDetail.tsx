import { motion } from 'motion/react';
import { Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { movies } from '../data';

interface MovieDetailProps {
  movieId: string | null;
  onMovieSelect: (id: string) => void;
}

export function MovieDetail({ movieId, onMovieSelect }: MovieDetailProps) {
  const movie = movies.find(m => m.id === movieId) || movies[0];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-12 pt-8">
      {/* Left Column: Fixed Meta Info */}
      <aside className="w-full md:w-1/3 flex-shrink-0">
        <div className="md:sticky md:top-40 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Record {String(Math.floor(Math.random() * 1000)).padStart(4, '0')}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] uppercase">
              {movie?.title}
            </h1>
          </div>
          
          <div className="flex flex-col gap-6 border-t border-zinc-200 pt-6">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-1">Director</span>
              <span className="text-body-lg font-medium">{movie?.director}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-1">Year</span>
              <span className="text-body-lg font-medium">{movie?.year}</span>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-6 mt-2">
            <button onClick={() => alert('Saved to collection!')} className="flex items-center gap-2 group hover:text-black transition-colors text-zinc-500 font-bold uppercase tracking-widest text-[12px]">
              <span className="group-hover:text-black">Save to Collection</span>
              <Bookmark size={14} className="group-hover:fill-current" />
            </button>
            <button onClick={() => onMovieSelect('')} className="mt-4 flex items-center gap-2 group hover:text-black transition-colors text-zinc-500 font-bold uppercase tracking-widest text-[12px]">
              <span className="group-hover:text-black">← Back to Index</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Right Column: Content & Media */}
      <main className="w-full md:w-2/3 flex flex-col gap-12 pb-20">
        <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-200">
          <motion.img 
            key={movie?.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            src={movie?.thumbnail || "https://images.unsplash.com/photo-1509333918005-95079a405903?q=80&w=2070&auto=format&fit=crop"} 
            alt={movie?.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <article className="max-w-none text-lg leading-relaxed markdown-content">
          {movie?.content ? (
            <ReactMarkdown>{movie.content}</ReactMarkdown>
          ) : (
            <p className="text-zinc-500 italic">No review content available.</p>
          )}
        </article>
      </main>
    </div>

      <section className="w-full mt-24 mb-32 border-t border-zinc-200 pt-16 hidden">
        <div className="flex justify-between items-end mb-stack-md">
          <h2 className="text-h2 tracking-tighter">Latest Additions</h2>
          <button onClick={() => onMovieSelect('')} className="archive-label hover:text-black transition-colors">View All ({movies.length})</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter-grid">
          {movies.slice(0, 3).map((m) => (
            <MovieCard 
              key={m.id}
              title={m.title} 
              director={m.director} 
              year={m.year} 
              image={m.thumbnail || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"}
              onClick={() => onMovieSelect(m.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function MovieCard({ title, director, year, image, onClick }: { title: string; director: string; year: number; image: string; onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[2/3] bg-zinc-100 overflow-hidden mb-stack-sm">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale transition-all duration-700" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="archive-label tracking-widest">{director}</span>
        <h3 className="text-h3 tracking-tight group-hover:underline underline-offset-4">{title}</h3>
        <span className="text-[12px] text-secondary">{year}</span>
      </div>
    </motion.div>
  );
}
