import responseMovies from "../mooks/with-results.json";
import noResponseMovies from "../mooks/no-results.json";
import { useState } from "react";

export function useMovies({ query }) {
  const [respMovies, setRespMovies] = useState({ Search: [] });

  const movies = respMovies?.Search;

  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    type: movie.Type,
    year: movie.Year,
    img: movie.Poster,
  }));

  const getMovies = () => {
    if (query) {
      setRespMovies(responseMovies);
    } else {
      setRespMovies({ Search: [] });
    }
  };

  return { movies: mappedMovies, getMovies };
}
