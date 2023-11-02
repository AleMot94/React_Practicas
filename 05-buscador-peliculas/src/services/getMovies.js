const API_KEY = "4287ad07";

export const getMovies = async ({ query }) => {
  if (query == "") return null;

  try {
    // asi se puede hacer un fetch con async await
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      img: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error buscando la pelicula");
  }
};

// FUNCION ORIGINAL SIN REFACTORIZAR

/*
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
    fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${query}`)
      .then((res) => res.json())
      .then((json) => {
        setRespMovies(json);
      });
  } else {
    setRespMovies({ Search: [] });
  }
}; */
