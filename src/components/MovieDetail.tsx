import { motion } from 'motion/react';
import { Bookmark, Star } from 'lucide-react';

export function MovieDetail() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full mb-stack-xl">
        <div className="flex flex-col gap-stack-xs mb-stack-lg">
          <span className="archive-label tracking-[0.2em]">Featured Entry</span>
          <h1 className="archive-header text-[min(120px,15vw)] leading-[0.9] font-light tracking-tighter max-w-4xl lowercase">
            Dune: Part Two
          </h1>
          <div className="flex gap-stack-md mt-stack-md">
            <div className="flex flex-col">
              <span className="archive-label">Director</span>
              <span className="text-body-md">Denis Villeneuve</span>
            </div>
            <div className="flex flex-col">
              <span className="archive-label">Year</span>
              <span className="text-body-md">2024</span>
            </div>
          </div>
        </div>

        <div className="w-full aspect-[21/9] overflow-hidden bg-zinc-100">
            <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1509333918005-95079a405903?q=80&w=2070&auto=format&fit=crop" 
            alt="Dune cinematic still" 
            className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-grid w-full">
        <div className="md:col-start-4 md:col-span-6 flex flex-col gap-stack-lg">
          <div className="flex justify-between items-baseline mb-stack-sm">
            <h2 className="archive-header text-h3 capitalize tracking-normal">The scale of the frame</h2>
            <div className="text-h3 font-light tracking-tighter">9.2/10</div>
          </div>

          <article className="flex flex-col gap-stack-md text-body-lg text-primary leading-relaxed">
            <p>
              A rare instance where the scale of the frame is matched by the depth of its narrative ambition. Villeneuve continues his pursuit of brutalist science fiction, where the architecture of the world defines the architecture of the soul.
            </p>
            <p>
              In Part Two, the silence of the desert becomes a character itself. The sound design is not merely additive; it is subtractive, stripping away the excess of modern blockbusters to leave only the resonance of sand and spice. The performance of Chalamet has matured into something colder, more terrifying, bridging the gap between messianic hope and inevitable tragedy.
            </p>
            <p>
              The visual language relies on high-contrast lighting and immense negative space, mirroring the isolation of its protagonists. It is an archival piece of filmmaking—a record of what happens when a director is given the resources to build a universe without compromise.
            </p>
          </article>

          <footer className="mt-stack-lg flex flex-wrap gap-6 items-center border-t border-zinc-100 pt-10">
            <div className="flex gap-4">
              <span className="archive-label">Cinema</span>
              <span className="archive-label">Sci-Fi</span>
              <span className="archive-label">Epic</span>
            </div>
            <div className="flex-grow" />
            <button className="flex items-center gap-2 group hover:text-black transition-colors text-secondary">
              <span className="archive-label group-hover:text-black">Save to Collection</span>
              <Bookmark size={14} className="group-hover:fill-current" />
            </button>
          </footer>
        </div>
      </div>

      {/* Latest Additions (Grid) */}
      <section className="w-full mt-stack-xl mb-stack-xl">
        <div className="flex justify-between items-end mb-stack-md">
          <h2 className="text-h2 tracking-tighter">Latest Additions</h2>
          <button className="archive-label hover:text-black transition-colors">View All (428)</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter-grid">
          <MovieCard 
            title="Burning" 
            director="Lee Chang-dong" 
            year={2018} 
            image="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
          />
          <MovieCard 
            title="La La Land" 
            director="Damien Chazelle" 
            year={2016} 
            image="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
          />
          <MovieCard 
            title="Dune: Part Two" 
            director="Denis Villeneuve" 
            year={2024} 
            image="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </section>
    </div>
  );
}

function MovieCard({ title, director, year, image }: { title: string; director: string; year: number; image: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[2/3] bg-zinc-100 overflow-hidden mb-stack-sm">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale transition-all duration-700" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="archive-label tracking-widest">{director}</span>
        <h3 className="text-h3 tracking-tight group-hover:underline underline-offset-4">{title}</h3>
        <span className="text-[12px] text-secondary">{year}</span>
      </div>
    </motion.div>
  );
}
