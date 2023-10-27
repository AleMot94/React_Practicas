import { useState, useEffect } from "react";

const FollowMouse = () => {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // esta funcion obtiene las cordenadas del mouse
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enable) {
      // evento que escucha al mouse
      window.addEventListener("pointermove", handleMove);
    }
    // el return en el useEffect se ejecuta al dejar de renderizar
    // se usa para limpiar los efectos del render anterior, en general suscripciones a eventos
    // si no se limpia, al volver a renderizar crea nuevas suscripciones, consumiendo todos los recursos
    return () => {
      // cleanup method
      // Función de limpieza para eliminar el event listener
      window.removeEventListener("pointermove", handleMove);
    };
    // [] --> solo se ejecuta la primera vez montado
    // [enable] --> cada ves que cambia la dependencia
    // undefined --> cada vez que se renderiza
  }, [enable]); // despendencias que escucha el useEffect para volver a renderizar
  // con getEventListener(window) podes ver todos los eventos suscriptos que hay, en la consola del navegador (solo en chrome)

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          width: 40,
          height: 40,
          left: -16,
          top: -16,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <h1>Efecto del mouse</h1>
      <button onClick={() => setEnable(!enable)}>
        {enable ? "Desactivar " : "Activar "}seguir mouse
      </button>
    </>
  );
};
// react en <React.StrictMode> renderiza un componente por primera ves
// lo renderiza, hace el cleanup y lo vuelve a renderizar
// por eso se renderiza 2 veces al principio, solo en desarollo

function App() {
  const [mounted, setMounted] = useState(false);

  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Mounted FollowMouse Component
      </button>
    </main>
  );
}

export default App;
