import { motion } from 'motion/react';
import { Database, Plus } from 'lucide-react';

export function SyncSettings() {
  return (
    <div className="max-w-4xl mx-auto pb-stack-xl">
      <header className="mb-stack-lg">
        <h1 className="archive-header text-h1 mb-stack-xs capitalize">Synchronization</h1>
        <p className="text-secondary text-body-lg">Manage the bidirectional flow of archival data between The Archive and your Notion workspace.</p>
      </header>

      <div className="space-y-stack-md">
        {/* Connection Status */}
        <section className="bg-surface-container-low p-stack-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-sm">
            <div className="flex items-center gap-stack-sm">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Database size={20} className="text-primary" />
              </div>
              <div>
                <p className="archive-label mb-1">Active Connection</p>
                <h3 className="text-h3">Notion Personal Workspace</h3>
              </div>
            </div>
            <div className="flex items-center gap-stack-sm">
              <span className="archive-label">Status:</span>
              <span className="text-[11px] bg-white px-3 py-1 font-mono">Synced 2m ago</span>
              <button className="bg-primary text-on-primary px-6 py-2 text-[12px] uppercase tracking-widest hover:opacity-80 transition-opacity">
                Re-Authorize
              </button>
            </div>
          </div>
        </section>

        {/* Sync Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <section className="bg-surface-container-low p-stack-md flex flex-col justify-between">
            <div>
              <p className="archive-label mb-stack-sm">Data Streams</p>
              <div className="space-y-stack-sm">
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/50">
                  <span className="text-body-md">Film Collection</span>
                  <span className="archive-label text-zinc-400">Bidirectional</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/50">
                  <span className="text-body-md">Director Registry</span>
                  <span className="archive-label text-zinc-400">Mirror only</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-body-md">Private Journals</span>
                  <span className="archive-label text-error">Disabled</span>
                </div>
              </div>
            </div>
            <button className="mt-stack-md text-primary text-[12px] uppercase tracking-widest border-b border-black w-max hover:opacity-70 transition-opacity">
              Configure Streams
            </button>
          </section>

          <section className="bg-surface-container-low p-stack-md">
            <p className="archive-label mb-stack-sm">Sync Performance</p>
            <div className="space-y-stack-sm">
              <div className="h-1 bg-surface-container-highest w-full relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-primary"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-secondary">4,281 Objects Synced</span>
                <span className="text-[11px] text-secondary">0.4s Latency</span>
              </div>
              <div className="pt-stack-sm">
                <div className="w-full h-32 flex items-end gap-1 opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-grow bg-black" 
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Global Preferences */}
        <section className="bg-surface-container-low p-stack-md">
          <p className="archive-label mb-stack-lg">Global Preferences</p>
          <div className="space-y-stack-md max-w-xl">
            <Toggle label="Auto-Resolve Conflicts" description="Automatically prefer the most recent edit if changes occur simultaneously." active />
            <Toggle label="Real-time Webhooks" description="Push updates immediately to Notion without waiting for scheduled intervals." />
            <Toggle label="Preserve Formatting" description="Keep markdown and rich-text properties consistent across platforms." active />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="p-stack-md border-2 border-black bg-black text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-sm">
            <div>
              <p className="text-body-md font-bold uppercase tracking-wider">Sever Connection</p>
              <p className="text-[11px] opacity-70">Stop all data transfers and delete local cache. This cannot be undone.</p>
            </div>
            <button className="bg-white text-black px-6 py-2 text-[12px] uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors">
              Disconnect Notion
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({ label, description, active = false }: { label: string; description: string; active?: boolean }) {
  return (
    <div className="flex items-start justify-between">
      <div className="pr-10">
        <p className="text-body-md">{label}</p>
        <p className="text-[11px] text-secondary">{description}</p>
      </div>
      <div className={`w-10 h-5 relative cursor-pointer ${active ? 'bg-black' : 'bg-zinc-200'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}
