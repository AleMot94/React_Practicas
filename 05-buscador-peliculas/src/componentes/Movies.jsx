import { ListMovies } from "./ListMovies.jsx";
import { NotFindMovie } from "./NotFindMovie.jsx";
// SOLUCIONA LA ADVERTENCIA DE ESLINT CON LOS TIPOS
// EN LOS PARAMETROS DEL COMPONENTE
import PropTypes from "prop-types";

export const Movies = ({ movies }) => {
  const hasMovie = movies?.length > 0;
  return hasMovie ? <ListMovies movies={movies} /> : <NotFindMovie />;
};

// VA ABAJO DE LA DEFINICION DEL COMPONENTE, SI NO ROMPE
// UN PROBLEMA DE ASINCRONIA
Movies.propTypes = {
  movies: PropTypes.array.isRequired,
};
