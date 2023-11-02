import { useState, useRef, useMemo, useCallback } from "react";
import { getMovies } from "../services/getMovies";

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState({ Search: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // para evitar volver a buscar en la api la misma palabra
  // guardamos el valor previo del estado con useRef (no se vuelve a renderizar el componente)
  const prevQuery = useRef(query);

  // useCallback usa useMemo por abajo es lo mismo
  // la deferencia es que para funciones usamos useCallback y evitamos poner el retunr
  // y si solo devolvemos una variable useMemo, como el ej sortedMovies
  const getSearchMovies = useCallback(() => {
    async ({ query }) => {
      // si la query sigue siendo la misma que la busqueda anterior no hace nada
      if (query === prevQuery.current) return;
      // query es ""
      try {
        setIsLoading(true);
        setError(null);
        //guarda el valor previo en el useRef para no volver a hacer la misma busqueda
        prevQuery.current = query;
        const newMovies = await getMovies({ query });
        setMovies(newMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        // tanto en el try como en el catch
        setIsLoading(false);
      }
    };
  }, [query]);

  // esta funcion se ejecuta cada vez que se vuelve a renderizar el componente
  // pero yo solo quiero que se vuelva a ejecutar solo cuando cambia sort
  // para esto esta useMemo que ignora cuando se vuelve a renderizar el componente
  // esepto cuando cambia la dependecia señaladas
  // en app esta el estado de query, ese era el que generaba el conflicto
  const sortedMovies = useMemo(() => {
    return sort
      ? // [...movies] eso copia el array original
        // localCompare compara tambien si hay asentos
        [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
    // solo usar el useMemo para optimizar si es realmente necesario, hay que saber medir bien el rendimiento
    // con el useMemo ahora solo busca las peliculas cuando cambia la query
    // y cuando cambia sort no
  }, [sort, movies]);

  // sin useMemo
  /*   const sortedMovies = sort
    ? // [...movies] eso copia el array original
      // localCompare compara tambien si hay asentos
      [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies; */
  return { movies: sortedMovies, getSearchMovies, isLoading, error };
}
