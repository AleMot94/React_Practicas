import { useState, useEffect, Children } from "react";
import { match } from "path-to-regexp";
import { EVENT } from "./const";

// creando el componente Router para renderizar un componente segun la url
// sin usar el renderizado condicional

// esto es para no usar el componete Route
// creamos el componente Router y le pasamos las rutas con sus componentes que ya definimos
// y un componente por defecto en caso de que la ruta no exista

// con el componente Route solo le pasamos el children
// y el componente por defecto en caso que no matche ninguna ruta
export function Router({
  children,
  routs = [],
  defaultComponente: DefaultComponent = () => <h1>ERROR</h1>,
}) {
  // window.location.pathname te proporciona el camino de la url del navegador actual
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // funcion que setea la url
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // hay que subscribirse al evento que creamos
    // cada ves que se ejecuta el evento que creamos, setea la url en el estado
    window.addEventListener(EVENT.PUSHSTATE, onLocationChange);

    // popstate es el evento que escucha el navegador cuando volvemos para atras en un pag
    window.addEventListener(EVENT.POPSTATE, onLocationChange);

    // asi escuchamos los eventos cuando avanza a la nueva url y cuando vuele para atras

    // no olvidarse de desuscribirse del evento
    return () => {
      // es importante que cuando te desuscribis de un evento
      // le pases la funcion que usaba ese evento, si no nunca se va a desuscribir
      window.removeEventListener(EVENT.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENT.POPSTATE, onLocationChange);
    };
  }, []);

  let routerParams = {};

  // agregar las rutas que estan en el children <Route/> components
  // Children viene de react y te permite iterar los childrens de un componente
  // si hay uno solo por defecto es un objeto
  // el props y el type salen del children
  // y el props tiene el path y el componente definidos en el componente Route
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    // sacamos el nombre del tipo
    const { name } = type;
    // si el nombre es igual a Route es una ruta
    const isRoute = name == "Route";
    // si no hay ruta devuelve null
    if (!isRoute) return null;
    // en las props tenemos el objeto con el path y el Component
    return props;
  });

  // concatenamos las rutas que nos pasan por props con las rutas del chilfren
  // y aca vamos a encontrar la ruta
  const routeToUse = routs.concat(routesFromChildren).filter(Boolean);

  // hacemos un fins en las rutas para ver si coincide la url de la web con las definidas
  // y si coincido con alguna guardamos el componente en Page
  //const Page = routs.find(({ path }) => path == currentPath)?.Component;

  const Page = routeToUse.find(({ path }) => {
    if (path == currentPath) return true;
    // aca usamos path-to-regexp +, para detectar rutas dinamicas
    // match devuelve otra funcion que permite comparar el path con el currentPath
    // decode decodifica la url
    const matcherUrl = match(path, { decode: decodeURIComponent });
    // al marcherUrl le pasamos el current path que tiene que comparar
    const matched = matcherUrl(currentPath);
    // si no existe el matched retornamos false
    if (!matched) return false;
    // si existe el matched guardamos la query de la url
    routerParams = matched.params; // ej { query: "javascript" } // /search/javascript
    // el find necesita el return true para saber que ese componente que encontramos es el que tiene que devolver
    return true;
  })?.Component;

  // si Page existe renderizamos el componente encontrado y no el definido por defecto
  return Page ? <Page routerParams={routerParams} /> : <DefaultComponent />;
}
