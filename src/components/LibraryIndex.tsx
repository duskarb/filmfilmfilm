import { movies } from '../data';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LibraryIndexProps {
  onMovieSelect: (id: string) => void;
  searchQuery: string;
}

export function LibraryIndex({ onMovieSelect, searchQuery }: LibraryIndexProps) {
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
    <div className="flex flex-col">
      <header className="mb-stack-xl max-w-2xl">
        <h1 className="archive-header text-h1 mb-stack-sm">Library Index</h1>
        <p className="text-body-lg text-secondary">A comprehensive chronological record of cinematic history. Curated metadata for the preservation of movement and sound.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-gutter-grid">
        {/* Sidebar */}
        <aside className="w-full md:w-48 flex-shrink-0 mb-stack-lg md:mb-0">
          <div className="sticky top-40 space-y-stack-md">
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Format</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedFormat('All')} className={`text-[12px] transition-colors ${selectedFormat === 'All' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>All Objects</button></li>
                <li><button onClick={() => setSelectedFormat('35mm')} className={`text-[12px] transition-colors ${selectedFormat === '35mm' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>35mm Negative</button></li>
                <li><button onClick={() => setSelectedFormat('Digital')} className={`text-[12px] transition-colors ${selectedFormat === 'Digital' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Digital Interm.</button></li>
                <li><button onClick={() => setSelectedFormat('70mm')} className={`text-[12px] transition-colors ${selectedFormat === '70mm' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>70mm Print</button></li>
              </ul>
            </section>
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Decade</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedDecade('All')} className={`text-[12px] transition-colors ${selectedDecade === 'All' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>All Objects</button></li>
                <li><button onClick={() => setSelectedDecade('1990s')} className={`text-[12px] transition-colors ${selectedDecade === '1990s' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>1990s</button></li>
                <li><button onClick={() => setSelectedDecade('2000s')} className={`text-[12px] transition-colors ${selectedDecade === '2000s' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>2000s</button></li>
                <li><button onClick={() => setSelectedDecade('2010s')} className={`text-[12px] transition-colors ${selectedDecade === '2010s' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>2010s</button></li>
                <li><button onClick={() => setSelectedDecade('2020s')} className={`text-[12px] transition-colors ${selectedDecade === '2020s' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>2020s</button></li>
              </ul>
            </section>
            <section>
              <h4 className="archive-label mb-stack-xs uppercase">Region</h4>
              <ul className="space-y-1">
                <li><button onClick={() => setSelectedRegion('All')} className={`text-[12px] transition-colors ${selectedRegion === 'All' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>All Regions</button></li>
                <li><button onClick={() => setSelectedRegion('Asia')} className={`text-[12px] transition-colors ${selectedRegion === 'Asia' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Asia-Pacific</button></li>
                <li><button onClick={() => setSelectedRegion('Europe')} className={`text-[12px] transition-colors ${selectedRegion === 'Europe' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Europe</button></li>
                <li><button onClick={() => setSelectedRegion('America')} className={`text-[12px] transition-colors ${selectedRegion === 'America' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Americas</button></li>
              </ul>
            </section>
          </div>
        </aside>

        {/* Index Table */}
        <section className="flex-grow pb-stack-xl">
          <div className="grid grid-cols-12 gap-gutter-grid border-b border-zinc-100 pb-4 mb-4">
            <div className="col-span-1 archive-label">Year</div>
            <div className="col-span-4 archive-label">Title</div>
            <div className="col-span-3 archive-label">Director</div>
            <div className="col-span-2 archive-label">Region</div>
            <div className="col-span-2 archive-label text-right">ID-Ref</div>
          </div>
          
          <div className="space-y-0">
            {currentMovies.map((movie) => (
              <motion.div 
                key={movie.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onMovieSelect(movie.id)}
                className="grid grid-cols-12 gap-gutter-grid py-3 hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <div className="col-span-1 text-[12px] text-primary">{movie.year}</div>
                <div className="col-span-4 text-body-md text-primary group-hover:underline underline-offset-4">{movie.title}</div>
                <div className="col-span-3 text-body-md text-secondary">{movie.director}</div>
                <div className="col-span-2 text-[12px] text-secondary uppercase tracking-widest">{movie.region}</div>
                <div className="col-span-2 text-[11px] text-zinc-400 text-right">{movie.idRef}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-stack-lg flex justify-between items-center border-t border-zinc-100 pt-stack-sm">
            <span className="text-[11px] text-secondary">
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredMovies.length)} of {filteredMovies.length} results
            </span>
            <div className="flex gap-10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`text-[12px] uppercase tracking-widest transition-colors ${currentPage === 1 ? 'text-zinc-300 cursor-not-allowed' : 'text-secondary hover:text-primary'}`}
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`text-[12px] uppercase tracking-widest transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-zinc-300 cursor-not-allowed' : 'text-primary hover:text-black'}`}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Visual Highlights */}
      <section className="mt-stack-xl mb-stack-xl">
        <h3 className="archive-label uppercase tracking-[0.4em] mb-stack-md">Visual Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 aspect-[16/9] bg-zinc-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop" 
              alt="Archival cinematic still" 
              className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-all duration-700"
            />
          </div>
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex-grow bg-zinc-100 p-8 flex flex-col justify-end">
              <span className="archive-label uppercase tracking-widest mb-2 font-medium">Curated Set</span>
              <h4 className="text-h3 leading-tight tracking-tighter">The Architecture of Stillness</h4>
            </div>
            <div className="aspect-square bg-black p-8 flex flex-col justify-between text-white">
              <div className="w-6 h-6 border-2 border-white flex items-center justify-center text-[10px] font-bold">A</div>
              <p className="text-[12px] uppercase leading-relaxed tracking-wider">Request high-resolution archival scans for academic research and publication.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
