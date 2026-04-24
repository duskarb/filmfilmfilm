/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Navigation';
import { LibraryIndex } from './components/LibraryIndex';
import { BookshelfView } from './components/BookshelfView';
import { MovieDetail } from './components/MovieDetail';
import { SyncSettings } from './components/SyncSettings';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('library');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMovieSelect = (id: string) => {
    setSelectedMovieId(id);
    setCurrentPage('movie');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'library':
        return <BookshelfView key="bookshelf" onMovieSelect={handleMovieSelect} searchQuery={searchQuery} onViewChange={() => setCurrentPage('library-grid')} />;
      case 'library-grid':
        return <LibraryIndex key="library" onMovieSelect={handleMovieSelect} searchQuery={searchQuery} onViewChange={() => setCurrentPage('library')} />;
      case 'movie':
        return <MovieDetail key="movie" movieId={selectedMovieId} onMovieSelect={handleMovieSelect} />;
      case 'sync':
        return <SyncSettings key="sync" />;
      case 'collections':
      case 'directors':
      case 'log':
        return (
          <div key="placeholder" className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h1 className="text-h1 mb-stack-sm capitalize archive-header">{currentPage}</h1>
            <p className="text-secondary text-body-lg">This section is currently under construction. Please check back later.</p>
          </div>
        );
      default:
        return <BookshelfView key="bookshelf" onMovieSelect={handleMovieSelect} searchQuery={searchQuery} onViewChange={() => setCurrentPage('library-grid')} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col pt-32 transition-colors duration-500 dark:bg-[#0a0a0a] dark:text-zinc-300`}>
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} onSearch={setSearchQuery} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* Removed the dummy featured entry button */}
            
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

