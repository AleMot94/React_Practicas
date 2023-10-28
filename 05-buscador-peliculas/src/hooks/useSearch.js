import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query == "";
      return;
    }

    if (query == "") {
      setError("el campo esta vacio");
      return;
    }

    if (query.length < 4) {
      setError("la busqueda debe tener al menos 4 caracteres");
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
}
// DIFERENCIAS useRef Y useState
/* 
useState:

Se utiliza para gestionar estados reactivos en componentes funcionales.
Cuando utilizas useState, el estado se actualiza en cada render y, cuando cambia, provoca una nueva renderización del componente.
El estado mantenido por useState es parte integral de la lógica del componente y puede afectar la representación en función de cómo se actualice.
useRef:

Se utiliza para crear referencias a valores que no deben causar una renderización adicional cuando cambian.
El valor almacenado en un objeto useRef no provoca una nueva renderización cuando cambia.
Se utiliza comúnmente para mantener referencias a elementos del DOM o para almacenar valores que deben persistir entre renders sin afectar la renderización del componente.
 */
