import PropTypes from "prop-types";

export const ListMovies = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
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
