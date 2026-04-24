import { Search } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
}

export function Navbar({ currentPage, onPageChange, onSearch }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 px-margin-page py-10 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md text-zinc-300 border-b border-zinc-900/50">
      <div 
        className="text-lg font-bold tracking-tighter uppercase cursor-pointer text-white"
        onClick={() => onPageChange('library')}
      >
        Subeen's Archive
      </div>
      
      <div className="hidden md:flex items-center gap-10 font-sans text-sm tracking-tight">
        <button 
          onClick={() => onPageChange('library')}
          className={`${currentPage === 'library' ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-zinc-500'} hover:text-white transition-colors`}
        >
          Library
        </button>
        <button 
          onClick={() => onPageChange('collections')}
          className={`${currentPage === 'collections' ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-zinc-500'} hover:text-white transition-colors`}
        >
          Collections
        </button>
        <button 
          onClick={() => onPageChange('directors')}
          className={`${currentPage === 'directors' ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-zinc-500'} hover:text-white transition-colors`}
        >
          Directors
        </button>
        <button 
          onClick={() => onPageChange('log')}
          className={`${currentPage === 'log' ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-zinc-500'} hover:text-white transition-colors`}
        >
          Log
        </button>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:block relative">
          <input 
            type="text" 
            placeholder="Search the record..." 
            onChange={(e) => onSearch(e.target.value)}
            className="border-b border-zinc-800 bg-transparent py-1 text-[12px] focus:outline-none focus:border-white transition-all w-48 text-white placeholder-zinc-600"
          />
          <Search size={14} className="absolute right-0 top-2 text-zinc-600 pointer-events-none" />
        </div>
        <button 
          onClick={() => onPageChange('sync')}
          className={`${currentPage === 'sync' ? 'text-white underline underline-offset-8' : 'text-zinc-500'} hover:text-white transition-colors`}
        >
          Profile
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full px-margin-page py-20 border-t border-zinc-900 bg-[#0a0a0a] font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-600 mt-auto">
      <div className="flex flex-col gap-4">
        <span className="text-zinc-400 font-semibold">Subeen's Archive</span>
        <p className="normal-case tracking-normal">© 2024 Subeen's Cinematic Space. Written with love.</p>
      </div>
      <div className="flex flex-col gap-2">
        <a className="hover:text-white transition-colors" href="#">Terms</a>
        <a className="hover:text-white transition-colors" href="#">Privacy</a>
      </div>
      <div className="flex flex-col gap-2">
        <a className="hover:text-white transition-colors" href="#">API</a>
        <a className="hover:text-white transition-colors" href="#">Journal</a>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-zinc-400">Social</span>
        <a className="hover:text-white transition-colors" href="#">Instagram</a>
        <a className="hover:text-white transition-colors" href="#">Letterboxd</a>
      </div>
    </footer>
  );
}
