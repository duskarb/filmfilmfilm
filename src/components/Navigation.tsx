import { Search } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  return (
    <nav className="bg-white fixed top-0 w-full z-50 px-margin-page py-10 flex justify-between items-center bg-white/80 backdrop-blur-sm">
      <div 
        className="text-lg font-bold tracking-tighter uppercase cursor-pointer"
        onClick={() => onPageChange('library')}
      >
        The Archive
      </div>
      
      <div className="hidden md:flex items-center gap-10 font-sans text-sm tracking-tight">
        <button 
          onClick={() => onPageChange('library')}
          className={`${currentPage === 'library' ? 'text-black underline underline-offset-8' : 'text-secondary'} hover:text-black transition-colors`}
        >
          Library
        </button>
        <button className="text-secondary hover:text-black transition-colors">Collections</button>
        <button className="text-secondary hover:text-black transition-colors">Directors</button>
        <button className="text-secondary hover:text-black transition-colors">Log</button>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:block relative">
          <input 
            type="text" 
            placeholder="Search the record..." 
            className="border-b border-zinc-200 bg-transparent py-1 text-[12px] focus:outline-none focus:border-black transition-all w-48"
          />
          <Search size={14} className="absolute right-0 top-2 text-zinc-400" />
        </div>
        <button 
          onClick={() => onPageChange('sync')}
          className={`${currentPage === 'sync' ? 'text-black underline underline-offset-8' : 'text-secondary'} hover:text-black transition-colors`}
        >
          Profile
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full px-margin-page py-20 border-t border-zinc-100 bg-white font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-auto">
      <div className="flex flex-col gap-4">
        <span className="text-black font-semibold">The Archive</span>
        <p className="normal-case tracking-normal">© 2024 The Archive. Built for the cinematic record.</p>
      </div>
      <div className="flex flex-col gap-2">
        <a className="hover:text-black transition-colors" href="#">Terms</a>
        <a className="hover:text-black transition-colors" href="#">Privacy</a>
      </div>
      <div className="flex flex-col gap-2">
        <a className="hover:text-black transition-colors" href="#">API</a>
        <a className="hover:text-black transition-colors" href="#">Journal</a>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-black">Social</span>
        <a className="hover:text-black transition-colors" href="#">Instagram</a>
        <a className="hover:text-black transition-colors" href="#">Letterboxd</a>
      </div>
    </footer>
  );
}
