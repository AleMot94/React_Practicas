import { useState, useEffect } from "react";

const CAT_ENDPOINT_IMG = "https://cataas.com/cat/";

// custom-hook (la funcion lleva (use) para que react entienda que es un hook)
// se usan para poder usar los estados fuera del componente
// con otro tipo de funciones eso no es posible
// ahora se puede usar este hook en cualquier lado
export function useCatImage({ fact }) {
  // se pasa como parametro la dependencia que usaba el useEffect original
  // y se pasan los estados que seteaba el useEffect original
  // dentro del custom-hook, tiene que cumplir las mismas reglas de los hook
  // la logina es la misma que tenia el useEffect, no cambia nada
  const [img, setImg] = useState(undefined);
  const [threeWords, setThreeWord] = useState(undefined);

  useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(" ");
    setThreeWord(threeFirstWords);

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const imgId = response._id;
        setImg(imgId);
      });
  }, [fact]);

  // retorna los estados
  return { img: `${CAT_ENDPOINT_IMG}${img}`, threeWords };
}

// este es el useEffect original
/*   useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(" ");
    setThreeWord(threeFirstWords);

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const imgId = response._id;
        setImg(imgId);
      });
  }, [fact]); */
