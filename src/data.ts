export interface Movie {
  id: string;
  year: number;
  title: string;
  director: string;
  region: string;
  idRef: string;
  thumbnail?: string;
  content?: string;
}

import importedMovies from './data.json';

export const movies: Movie[] = importedMovies as Movie[];
