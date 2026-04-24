import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Bookmark, Star, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { movies } from "../data";
import { updatePageContent } from "../api/notion";

interface MovieDetailProps {
  movieId: string | null;
  onMovieSelect: (id: string) => void;
  starredIds: string[];
  toggleStar: (id: string, e?: React.MouseEvent) => void;
  contentOverrides: Record<string, string>;
  onContentSave: (movieId: string, newContent: string) => void;
}

type EditState = "idle" | "editing" | "saving";

export function MovieDetail({
  movieId,
  onMovieSelect,
  starredIds,
  toggleStar,
  contentOverrides,
  onContentSave,
}: MovieDetailProps) {
  const movie = movies.find((m) => m.id === movieId) || movies[0];
  const displayContent = contentOverrides[movie.id] ?? movie?.content ?? "";

  const [editState, setEditState] = useState<EditState>("idle");
  const [draftContent, setDraftContent] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditState("idle");
    setSaveError(null);
  }, [movie.id]);

  useEffect(() => {
    if (editState === "editing" && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editState]);

  const enterEdit = () => {
    setDraftContent(displayContent);
    setSaveError(null);
    setEditState("editing");
  };

  const cancelEdit = () => {
    setEditState("idle");
    setSaveError(null);
  };

  const saveEdit = async () => {
    setEditState("saving");
    setSaveError(null);
    try {
      await updatePageContent(movie.id, draftContent);
      onContentSave(movie.id, draftContent);
      setEditState("idle");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
      setEditState("editing");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveEdit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full pt-4 pb-32">
      {/* Banner Image */}
      <div className="w-full max-w-6xl aspect-[21/9] md:aspect-[2.35/1] overflow-hidden mb-12 md:mb-20 px-margin-page relative group">
        <button
          aria-label="Back to library"
          onClick={() => onMovieSelect("")}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md text-xs tracking-widest uppercase"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <motion.img
          key={movie?.id}
          initial={{ scale: 1.02, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={
            movie?.thumbnail ||
            "https://images.unsplash.com/photo-1509333918005-95079a405903?q=80&w=2070&auto=format&fit=crop"
          }
          alt={movie?.title}
          className="w-full h-full object-cover grayscale-[0.3]"
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-3xl px-margin-page flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl md:text-7xl tracking-tighter lowercase font-light">
                {movie.title}
              </h1>
              <button
                aria-label={
                  starredIds.includes(movie.id)
                    ? "Remove from starred"
                    : "Add to starred"
                }
                onClick={(e) => toggleStar(movie.id, e)}
                className="hover:scale-110 transition-transform mt-2"
              >
                <Star
                  size={32}
                  strokeWidth={1.5}
                  className={`transition-colors ${starredIds.includes(movie.id) ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
                />
              </button>
            </div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500">
              {movie.director} &nbsp;&nbsp;|&nbsp;&nbsp; {movie.year}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-light tracking-tight flex items-baseline gap-1">
            9.2
            <span className="text-sm md:text-base text-zinc-500 font-normal">
              /10
            </span>
          </div>
        </div>

        {/* Body */}
        <article
          onDoubleClick={editState === "idle" ? enterEdit : undefined}
          className={`prose prose-zinc dark:prose-invert prose-lg md:prose-xl max-w-none [&_p]:text-black [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_li]:text-black [&_a]:text-black dark:[&_p]:text-zinc-100 dark:[&_h1]:text-zinc-100 dark:[&_h2]:text-zinc-100 dark:[&_h3]:text-zinc-100 dark:[&_li]:text-zinc-100 dark:[&_a]:text-zinc-100 leading-[1.8] font-sans font-normal ${editState === "idle" ? "cursor-text" : ""}`}
        >
          {editState === "idle" ? (
            <>
              {displayContent ? (
                <ReactMarkdown>{displayContent}</ReactMarkdown>
              ) : (
                <p className="text-zinc-500 italic not-prose">
                  No review content available.{" "}
                  <button
                    onClick={enterEdit}
                    className="underline hover:text-black dark:hover:text-white transition-colors"
                  >
                    Add one
                  </button>
                </p>
              )}
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-6 font-mono tracking-wider not-prose select-none">
                Double-click to edit
              </p>
            </>
          ) : (
            <div className="not-prose flex flex-col gap-3">
              <textarea
                ref={textareaRef}
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={Math.max(10, draftContent.split("\n").length + 3)}
                className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-4 font-mono text-sm resize-y focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 text-black dark:text-zinc-100 leading-relaxed"
                spellCheck={false}
                disabled={editState === "saving"}
              />
              {saveError && (
                <p className="text-red-500 text-xs font-mono">{saveError}</p>
              )}
              <div className="flex items-center gap-4">
                <button
                  onClick={saveEdit}
                  disabled={editState === "saving"}
                  className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity disabled:opacity-40"
                >
                  {editState === "saving" ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={editState === "saving"}
                  className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white transition-colors disabled:opacity-40"
                >
                  Cancel (Esc)
                </button>
                <span className="text-[10px] text-zinc-400 font-mono ml-auto">
                  Ctrl+Enter to save
                </span>
              </div>
            </div>
          )}
        </article>

        {/* Footer Metadata */}
        <div className="mt-20 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-[10px] md:text-xs font-mono tracking-widest uppercase text-zinc-500">
          <div className="flex gap-4">
            <span>Cinema</span>
            <span>Sci-Fi</span>
            <span>Epic</span>
          </div>
          <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors group">
            <span>Save to Collection</span>
            <Bookmark size={14} className="group-hover:fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
