import { movies } from '../data';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

interface BookshelfViewProps {
  onMovieSelect: (id: string) => void;
  searchQuery: string;
  onViewChange: () => void;
  starredIds: string[];
  toggleStar: (id: string, e?: React.MouseEvent) => void;
}

export function BookshelfView({ onMovieSelect, searchQuery, onViewChange, starredIds, toggleStar }: BookshelfViewProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only trigger if we're scrolling vertically (deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 0.4, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

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
    // Starred filtering: if any movies are starred, only show them. Otherwise show all.
    if (starredIds.length > 0 && !starredIds.includes(movie.id)) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full pt-8 overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #1f1f1f 0%, #0a0a0a 70%)', backgroundAttachment: 'fixed' }}>
      <header className="mb-8 max-w-2xl px-margin-page shrink-0">
        <h1 className="archive-header text-5xl md:text-6xl text-white mb-4 tracking-tighter">My Cinematic Space</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          {starredIds.length > 0 
            ? "Showing your curated, starred collection. To see all, remove your stars in the grid view."
            : "Welcome to my personal archive. Browse through the collection like a bookshelf—each frame holds a story, a memory, and a piece of cinematic history."}
        </p>
      </header>

      {/* Interactive Bookshelf / Horizontal Scroll */}
      <div className="flex-grow w-full overflow-hidden relative">
        <div ref={scrollRef} className="flex gap-6 md:gap-10 overflow-x-auto pb-16 pt-8 px-margin-page hide-scrollbar h-full items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {currentMovies.map((movie) => (
            <motion.div 
              key={movie.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => onMovieSelect(movie.id)}
              className="shrink-0 flex items-center group cursor-pointer h-[75%] min-h-[400px] relative hover:z-50"
            >
              {/* The Frame / Book Cover */}
              <div className="relative h-full aspect-[2/3] bg-zinc-900 border-[8px] md:border-[12px] border-zinc-800 shadow-2xl rounded-sm overflow-hidden z-20 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <button 
                  onClick={(e) => toggleStar(movie.id, e)} 
                  className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black/50 rounded-full hover:bg-black/80"
                >
                  <Star size={16} className={`${starredIds.includes(movie.id) ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`} />
                </button>
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
            </motion.div>
          ))}
          
          {/* See More / View All Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={onViewChange}
            className="shrink-0 flex items-center justify-center group cursor-pointer h-[75%] min-h-[400px] aspect-[2/3]"
          >
            <div className="relative h-full w-full border-[2px] border-dashed border-zinc-800 hover:border-zinc-500 rounded-sm flex flex-col items-center justify-center text-zinc-500 hover:text-white transition-all duration-300">
              <span className="text-2xl mb-2">⊞</span>
              <h3 className="font-bold text-lg tracking-widest uppercase">View All</h3>
              <span className="text-sm mt-2">Switch to Grid View</span>
            </div>
          </motion.div>
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
