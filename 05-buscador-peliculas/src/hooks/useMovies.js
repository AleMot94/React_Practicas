import responseMovies from "../mooks/with-results.json";

export function useMovies() {
  const movies = responseMovies.Search;

  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    type: movie.Type,
    year: movie.Year,
    img: movie.Poster,
  }));

  return { movies: mappedMovies };
}
