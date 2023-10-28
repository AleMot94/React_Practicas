import PropTypes from "prop-types";
import "../componentes/listMovies.css";

export const ListMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <img src={movie.img} alt={movie.title} />
          <p>{movie.type}</p>
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  );
};

ListMovies.propTypes = {
  movies: PropTypes.array.isRequired,
};
