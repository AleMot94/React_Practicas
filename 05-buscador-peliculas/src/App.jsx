//import responseMovies from "./mooks/with-results.json";
//import noResultsMovies from "./mooks/no-results.json";
import { Movies } from "./componentes/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import "./App.css";

function App() {
  const { movies } = useMovies();
  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form">
          <label htmlFor="buscador">Busca tu pelicula</label>
          <input
            id="buscador"
            name="buscador"
            type="text"
            placeholder="batman, django..."
          />
          <button>Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
