# FilmFilmFilm

**A cinematic archive interface for exploring films as a chronological and connected collection.**

FilmFilmFilm is a personal archive system that treats movies not only as individual entries, but as pieces of a larger timeline of cinema.

The project combines structured metadata, editorial notes, and an interactive library interface to create a browsable cinematic database.

## Concept

Film databases usually focus on search and filtering. This project explores a different question:

> How can a film archive feel like a place for discovery rather than a list of records?

The interface experiments with multiple ways of navigating a collection:

- bookshelf-style browsing
- library index views
- individual movie records
- chronological metadata
- personal annotations

## Features

- Curated movie archive with structured metadata
- Bookshelf-style visual browsing
- Grid/library index navigation
- Individual movie detail pages
- Search through the archive
- Personal starred collections
- Editable movie notes
- Light/dark viewing modes
- Notion database synchronization workflow

## Data workflow

```text
Notion Database
      ↓
Sync Script
      ↓
src/data.json
      ↓
Archive Interface
```

The archive content can be managed externally through Notion and synchronized into the application data structure.

## Tech

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Notion API
- Cloudflare Worker

## Run locally

```bash
npm install
npm run dev
```

To sync archive data from Notion:

```bash
npm run sync
```

## Structure

```text
src/
├── components/
│   ├── BookshelfView.tsx
│   ├── LibraryIndex.tsx
│   ├── MovieDetail.tsx
│   └── SyncSettings.tsx
├── data.json
└── App.tsx

sync_notion.py  # Notion → archive data pipeline
```

## Status

Experimental archive interface exploring the relationship between **data, memory, and cinematic collections**.
