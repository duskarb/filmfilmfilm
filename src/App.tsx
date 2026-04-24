/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, Footer } from './components/Navigation';
import { LibraryIndex } from './components/LibraryIndex';
import { MovieDetail } from './components/MovieDetail';
import { SyncSettings } from './components/SyncSettings';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('library');

  const renderPage = () => {
    switch (currentPage) {
      case 'library':
        return <LibraryIndex key="library" />;
      case 'movie':
        return <MovieDetail key="movie" />;
      case 'sync':
        return <SyncSettings key="sync" />;
      default:
        return <LibraryIndex key="library" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-32">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-grow px-margin-page pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* Simple way to get to detail page for demo */}
            {currentPage === 'library' && (
              <button 
                onClick={() => setCurrentPage('movie')}
                className="mb-8 archive-label hover:text-black hover:underline underline-offset-4 transition-all"
              >
                Featured Entry: Dune: Part Two
              </button>
            )}
            
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

