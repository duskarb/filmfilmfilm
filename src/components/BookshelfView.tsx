import { movies } from '../data';
import { motion } from 'motion/react';
import { useState } from 'react';

interface BookshelfViewProps {
  onMovieSelect: (id: string) => void;
  searchQuery: string;
}

export function BookshelfView({ onMovieSelect, searchQuery }: BookshelfViewProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredMovies = movies.filter(movie => {
    // Search query
    if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && !movie.director.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Decade
    if (selectedDecade !== 'All') {
      const decadeStart = parseInt(selectedDecade.substring(0, 4), 10);
      if (movie.year < decadeStart || movie.year >= decadeStart + 10) return false;
    }
    // Region
    if (selectedRegion !== 'All' && movie.region.toUpperCase() !== selectedRegion.toUpperCase()) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-300 w-full absolute inset-0 z-40 pt-32" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #1f1f1f 0%, #0a0a0a 70%)', backgroundAttachment: 'fixed' }}>
      {/* We add an absolute wrapper so it covers the white background of the app */}
      <header className="mb-16 max-w-2xl px-margin-page">
        <h1 className="archive-header text-5xl md:text-6xl text-white mb-4 tracking-tighter">My Cinematic Space</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">Welcome to my personal archive. Browse through the collection like a bookshelf—each frame holds a story, a memory, and a piece of cinematic history.</p>
      </header>

      {/* Interactive Bookshelf / Horizontal Scroll */}
      <div className="flex-grow w-full overflow-hidden relative">
        <div className="flex gap-12 overflow-x-auto pb-16 pt-8 px-margin-page snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {currentMovies.map((movie) => (
            <motion.div 
              key={movie.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => onMovieSelect(movie.id)}
              className="snap-center shrink-0 flex items-center group cursor-pointer"
              style={{ width: 'clamp(300px, 40vw, 500px)' }}
            >
              {/* The Frame / Book Cover */}
              <div className="relative aspect-[2/3] w-full bg-zinc-900 border-[12px] border-zinc-800 shadow-2xl rounded-sm overflow-hidden z-10 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={movie.thumbnail || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"} 
                  alt={movie.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-2xl tracking-tight leading-none mb-1">{movie.title}</h3>
                  <span className="text-zinc-400 text-sm">{movie.year}</span>
                </div>
              </div>

              {/* The Book Page / Slide-out Details */}
              <div className="hidden md:flex flex-col justify-center bg-zinc-900/90 border border-zinc-800 backdrop-blur-md p-8 shadow-xl -ml-12 pl-16 rounded-r-lg opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 h-[80%] max-w-[300px] z-0">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">Director</span>
                <span className="text-white font-medium text-lg mb-6">{movie.director}</span>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                  {movie.content?.replace(/[#_*\[\]]/g, '') || "A profound piece of cinema captured in time."}
                </p>
                <div className="mt-8">
                  <span className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-b border-zinc-700 pb-1">Read Log →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
