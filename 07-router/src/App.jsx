import "./App.css";
import { Router } from "./Router";
import { Route } from "./Route";

//import HomePage from "./pages/Home";
//import About from "./pages/About";

// con lazy evitamos que cargue los componente inesesarios
import { lazy, Suspense } from "react";
// los imports dinamicos devuelven una promesa
// y los manejamos con lazy
// este componente va a quedar vacio hasta que no se renderize
const AboutPage = lazy(() => import("./pages/About"));
const LazyHomePage = lazy(() => import("./pages/Home"));

// MPA
// Tecnica de renderizado condicional (MPA)
// Cada vez que navega entre las paginas recarga toda la pagina completa
// y todo sus recursos, no es nada optimo

// SPA
// ahora con la funcion navigate y el evento personalisado
// ya no carga toda la pagina de nuevo cada ves que navega entre paginas
// solo cargaria el recurso que le falte, y ya seria una (SPA)

//definimos las rutas con sus componentes
const routers = [
  {
    path: "/search/:query",
    Component: ({ routerParams }) => (
      <h1>Has buscado esta palabra {routerParams.query}</h1>
    ),
  },
  {
    path: "/:lang/about",
    Component: AboutPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routs={routers}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
