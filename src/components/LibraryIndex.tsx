import { movies } from '../data';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LibraryIndexProps {
  onMovieSelect: (id: string) => void;
}

export function LibraryIndex({ onMovieSelect }: LibraryIndexProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');

  const filteredMovies = movies.filter(movie => {
    if (selectedDecade === 'All') return true;
    const decadeStart = parseInt(selectedDecade.substring(0, 4), 10);
    return movie.year >= decadeStart && movie.year < decadeStart + 10;
  });

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
                <li><button className="text-[12px] text-primary">All Objects</button></li>
                <li><button className="text-[12px] text-secondary hover:text-primary transition-colors">35mm Negative</button></li>
                <li><button className="text-[12px] text-secondary hover:text-primary transition-colors">Digital Interm.</button></li>
                <li><button className="text-[12px] text-secondary hover:text-primary transition-colors">70mm Print</button></li>
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
                <li><button className="text-[12px] text-secondary hover:text-primary transition-colors">Asia-Pacific</button></li>
                <li><button className="text-[12px] text-primary">Europe</button></li>
                <li><button className="text-[12px] text-secondary hover:text-primary transition-colors">Americas</button></li>
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
            {filteredMovies.map((movie) => (
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
            <span className="text-[11px] text-secondary">Showing {filteredMovies.length} results</span>
            <div className="flex gap-10">
              <button className="text-[12px] text-secondary hover:text-primary uppercase tracking-widest transition-colors">Prev</button>
              <button className="text-[12px] text-primary uppercase tracking-widest transition-colors">Next</button>
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
