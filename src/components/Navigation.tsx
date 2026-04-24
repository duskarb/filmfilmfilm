import { Search, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navbar({ currentPage, onPageChange, onSearch, theme, toggleTheme }: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <nav className={`fixed top-0 w-full z-50 px-margin-page py-10 flex justify-between items-center backdrop-blur-md border-b transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]/80 text-zinc-300 border-zinc-900/50' : 'bg-white/80 border-zinc-100 text-black'}`}>
      <div
        className={`text-lg font-bold tracking-tighter uppercase cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}
        onClick={() => onPageChange('library')}
      >
        The Archive
      </div>

      <div className="hidden md:flex items-center gap-10 font-sans text-sm tracking-tight">
        <button
          onClick={() => onPageChange('library')}
          className={`${(currentPage === 'library' || currentPage === 'library-grid') ? (isDark ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-black underline underline-offset-8') : (isDark ? 'text-zinc-500' : 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}
        >
          Library
        </button>
        <button
          onClick={() => onPageChange('collections')}
          className={`${currentPage === 'collections' ? (isDark ? 'text-white underline underline-offset-8 decoration-zinc-500' : 'text-black underline underline-offset-8') : (isDark ? 'text-zinc-500' : 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}
        >
          Collections
        </button>
      </div>

      <div className="flex items-center gap-8">
        <button
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
          className="hover:opacity-70 transition-opacity"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="hidden lg:block relative">
          <input
            type="text"
            placeholder="Search the record..."
            onChange={(e) => onSearch(e.target.value)}
            className={`border-b bg-transparent py-1 text-[12px] focus:outline-none transition-all w-48 ${isDark ? 'border-zinc-800 focus:border-white text-white placeholder-zinc-600' : 'border-zinc-200 focus:border-black text-black'}`}
          />
          <Search size={14} className={`absolute right-0 top-2 pointer-events-none ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />
        </div>
        <button
          onClick={() => onPageChange('sync')}
          className={`${currentPage === 'sync' ? (isDark ? 'text-white underline underline-offset-8' : 'text-black underline underline-offset-8') : (isDark ? 'text-zinc-500' : 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}
        >
          Profile
        </button>
      </div>
    </nav>
  );
}

export function Footer({ theme }: { theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <footer className={`grid grid-cols-2 md:grid-cols-4 gap-12 w-full px-margin-page py-20 border-t transition-colors duration-500 font-sans text-[10px] uppercase tracking-[0.2em] mt-auto ${isDark ? 'border-zinc-900 bg-[#0a0a0a] text-zinc-600' : 'border-zinc-100 bg-white text-zinc-400'}`}>
      <div className="flex flex-col gap-4">
        <span className={`font-semibold ${isDark ? 'text-zinc-400' : 'text-black'}`}>Subeen's Archive</span>
        <p className="normal-case tracking-normal">© 2024 Subeen's Cinematic Space. Written with love.</p>
      </div>
      <div className="flex flex-col gap-2">
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">Terms</a>
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">Privacy</a>
      </div>
      <div className="flex flex-col gap-2">
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">API</a>
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">Journal</a>
      </div>
      <div className="flex flex-col gap-2">
        <span className={isDark ? 'text-zinc-400' : 'text-black'}>Social</span>
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">Instagram</a>
        <a className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} href="#">Letterboxd</a>
      </div>
    </footer>
  );
}
