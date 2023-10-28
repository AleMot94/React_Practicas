import { Movies } from "./componentes/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";
import "./App.css";
// useRef hace referencia a un elemento del dom y puede guardar su valor
// guarda el estado como useState, pero cuando lo hace no provoca un nuevo render
// import { useRef } from "react";

function App() {
  const { query, setQuery, error } = useSearch();
  const { movies, getMovies } = useMovies({ query });

  // para enviar formularios, es mejor usar el submit del formularo
  // con el button type submit, en vez de un onClick={handleClick} en el boton

  // FORMULARIOS NO CONTROLADOS
  //-----------------------------------------------------------------------------

  // lo instanciamos, y esa instancia la referenciamos a un elemento del dom
  // en este caso al input
  // const inputRef = useRef();

  // usar el useRef no es la mejor manera de obtener los valores de un formulario
  // se puede usar por que al guardar el valor no provoca un render, como
  // el useState es muy poco optimo

  /* const handleSubmit = (e) => {
    e.preventDefault();
    // se accede al valor del elemento desde la propiedad current
    const inputEl = inputRef.current;
    // recupueramos el valor del elemto
    // a travez del useRef
    const value = inputEl.value;
    console.log(value);
  }; */

  //                     ---------------------------------------------

  // forma mas optima de obtener todos los valores de un formulario
  /*  const handleSubmit = (e) => {
    e.preventDefault();
    // obtiene todo los objetos clave -> valor del formulario
    // devuelve un objeto con todos los datos
    const fields = Object.fromEntries(new window.FormData(event.target));
    console.log(fields);
  }; */
  //               -----------------------------------------------------

  // esta forma es mas eficiente para obtener el valor de un input
  /* const handleSubmit = (e) => {
    e.preventDefault();
    // obtiene los inputs del formulario
    const field = new window.FormData(event.target);
    // obtiene el valor del input nombrado
    const valor = field.get("buscador");
    console.log(valor)
  }; */

  //               ----------------------------------------------------

  // FORMULARIO USADO CON useRef
  // <form className="form" onSubmit={handleSubmit}>
  //         <label htmlFor="buscador">Busca tu pelicula</label>
  //         <input
  //           ref={inputRef}
  //           id="buscador"
  //           name="buscador"
  //           type="text"
  //           placeholder="batman, django..."
  //         />
  //         <button type="submit">Search</button>
  // </form>

  //------------------------------------------------------------------------------------

  // FORMULARIO CONTROLADO
  //------------------------------------------------------------------------------------
  // a traves de la propiedad onChange del input le pasamos el handleChange
  // cada vez que cambia su valor, se setea en un estadoc
  // es muy poco optimo, por que cada vez que se actualiza el estado
  // hace un nuevo render
  /*const handleChange = (event) => {
    // asi se obtiene el valor del input
    // lo guardamos en una nueva constante para solucionar la asincronia del estado
    const newQuery = event.target.value;
    setQuery(newQuery);
    // sirve para hacer validaciones mientras el usuario escribe en el momento

    // ESTO LO TERMINE HACIEN EN EL useEffect
    //  if (newQuery == "") {
    //   setError("el campo esta vacio");
    //   return;
    // }

    // if (newQuery.length < 4) {
    //   setError("la busqueda debe tener al menos 4 caracteres");
    //   return;
    // }

    // setError(null); 
  };*/
  //----------------------------------------------------------------------------------

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="buscador">Busca tu pelicula</label>
          <input
            onChange={handleChange}
            value={query}
            id="buscador"
            name="buscador"
            type="text"
            placeholder="batman, django..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
