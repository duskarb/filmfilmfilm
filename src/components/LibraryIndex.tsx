import { movies } from '../data';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, LayoutGrid } from 'lucide-react';

interface LibraryIndexProps {
  onMovieSelect: (id: string) => void;
  searchQuery: string;
  onViewChange: () => void;
  starredIds: string[];
  toggleStar: (id: string, e?: React.MouseEvent) => void;
}

function stableCardNumber(idRef: string): string {
  const hash = idRef.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0);
  return String(hash % 1000).padStart(3, '0');
}

export function LibraryIndex({ onMovieSelect, searchQuery, onViewChange, starredIds, toggleStar }: LibraryIndexProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gridDensity, setGridDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal');

  const itemsPerPage = gridDensity === 'compact' ? 20 : gridDensity === 'relaxed' ? 8 : 12;

  const cycleGridDensity = () => {
    setGridDensity(prev => {
      if (prev === 'compact') return 'normal';
      if (prev === 'normal') return 'relaxed';
      return 'compact';
    });
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter(movie => {
    if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && !movie.director.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedDecade !== 'All') {
      const decadeStart = parseInt(selectedDecade.substring(0, 4), 10);
      if (movie.year < decadeStart || movie.year >= decadeStart + 10) return false;
    }
    if (selectedRegion !== 'All' && movie.region.toUpperCase() !== selectedRegion.toUpperCase()) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const currentMovies = filteredMovies.slice((validCurrentPage - 1) * itemsPerPage, validCurrentPage * itemsPerPage);

  const sidebarBtn = (active: boolean) =>
    `text-[12px] transition-colors ${active ? 'text-primary dark:text-white' : 'text-secondary hover:text-primary dark:hover:text-white'}`;

  return (
    <div className="flex flex-col px-margin-page">
      <header className="mb-stack-xl max-w-2xl flex flex-col items-start gap-4">
        <div>
          <h1 className="archive-header text-h1 mb-stack-sm">Library Index</h1>
          <p className="text-body-lg text-secondary">A comprehensive chronological record of cinematic history. Curated metadata for the preservation of movement and sound.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onViewChange}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-sm uppercase tracking-widest font-bold"
          >
            <LayoutGrid size={14} /> Switch to Slide View
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-gutter-grid">
        {/* Sidebar */}
        <aside className="w-full md:w-48 flex-shrink-0 mb-stack-lg md:mb-0">
          <div className="sticky top-40 space-y-stack-md">
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Format</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedFormat('All')} className={sidebarBtn(selectedFormat === 'All')}>All Objects</button></li>
                <li><button onClick={() => setSelectedFormat('35mm')} className={sidebarBtn(selectedFormat === '35mm')}>35mm Negative</button></li>
                <li><button onClick={() => setSelectedFormat('Digital')} className={sidebarBtn(selectedFormat === 'Digital')}>Digital Interm.</button></li>
                <li><button onClick={() => setSelectedFormat('70mm')} className={sidebarBtn(selectedFormat === '70mm')}>70mm Print</button></li>
              </ul>
            </section>
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Decade</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedDecade('All')} className={sidebarBtn(selectedDecade === 'All')}>All Objects</button></li>
                <li><button onClick={() => setSelectedDecade('1990s')} className={sidebarBtn(selectedDecade === '1990s')}>1990s</button></li>
                <li><button onClick={() => setSelectedDecade('2000s')} className={sidebarBtn(selectedDecade === '2000s')}>2000s</button></li>
                <li><button onClick={() => setSelectedDecade('2010s')} className={sidebarBtn(selectedDecade === '2010s')}>2010s</button></li>
                <li><button onClick={() => setSelectedDecade('2020s')} className={sidebarBtn(selectedDecade === '2020s')}>2020s</button></li>
              </ul>
            </section>
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Region</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedRegion('All')} className={sidebarBtn(selectedRegion === 'All')}>All Regions</button></li>
                <li><button onClick={() => setSelectedRegion('Asia')} className={sidebarBtn(selectedRegion === 'Asia')}>Asia-Pacific</button></li>
                <li><button onClick={() => setSelectedRegion('Europe')} className={sidebarBtn(selectedRegion === 'Europe')}>Europe</button></li>
                <li><button onClick={() => setSelectedRegion('America')} className={sidebarBtn(selectedRegion === 'America')}>Americas</button></li>
              </ul>
            </section>
          </div>
        </aside>

        {/* Index Grid */}
        <section className="flex-grow pb-stack-xl">
          <div className="flex justify-between items-end border-b border-zinc-300 dark:border-zinc-700 pb-2 mb-8">
            <span className="archive-label text-black dark:text-white">Index</span>
            <div className="flex items-center gap-6">
              <button
                onClick={cycleGridDensity}
                className="p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={`Grid density: ${gridDensity}`}
              >
                <LayoutGrid size={16} />
              </button>
              <span className="archive-label uppercase">{String(filteredMovies.length).padStart(3, '0')} Entries</span>
            </div>
          </div>

          <div className={`grid ${gridDensity === 'compact' ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : gridDensity === 'relaxed' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'}`}>
            {currentMovies.map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onMovieSelect(movie.id)}
                className="flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[3/2] bg-zinc-200 dark:bg-zinc-800 overflow-hidden mb-3">
                  <button
                    aria-label={starredIds.includes(movie.id) ? 'Remove from starred' : 'Add to starred'}
                    onClick={(e) => toggleStar(movie.id, e)}
                    className="absolute top-2 left-2 z-20 p-2 opacity-0 group-hover:opacity-100 transition-all drop-shadow-md hover:scale-110"
                  >
                    <Star size={18} strokeWidth={1.5} className={`transition-colors ${starredIds.includes(movie.id) ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-white/80 hover:text-white'}`} />
                  </button>
                  {starredIds.includes(movie.id) && (
                    <div className="absolute top-2 left-2 z-10 p-2 md:hidden drop-shadow-md">
                      <Star size={18} strokeWidth={1.5} className="fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                  <img
                    src={movie.thumbnail || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-start justify-end p-3 pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-[10px] text-white bg-black/50 px-2 py-1 rounded backdrop-blur-md transition-opacity">
                      {stableCardNumber(movie.idRef)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-body-lg font-bold tracking-tight text-black dark:text-white group-hover:underline underline-offset-4 decoration-2">{movie.title}</h3>
                  <span className="text-[12px] text-zinc-500 font-medium">{movie.year}</span>
                </div>
                <span className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-1">{movie.director}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-between items-center border-t border-zinc-300 dark:border-zinc-700 pt-6">
            <span className="text-[11px] text-zinc-500 font-mono">
              {String((validCurrentPage - 1) * itemsPerPage + 1).padStart(3, '0')} — {String(Math.min(validCurrentPage * itemsPerPage, filteredMovies.length)).padStart(3, '0')}
            </span>
            <div className="flex gap-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={validCurrentPage === 1}
                className={`text-[12px] uppercase font-bold tracking-widest transition-colors ${validCurrentPage === 1 ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed' : 'text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400'}`}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={validCurrentPage === totalPages || totalPages === 0}
                className={`text-[12px] uppercase font-bold tracking-widest transition-colors ${validCurrentPage === totalPages || totalPages === 0 ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed' : 'text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
