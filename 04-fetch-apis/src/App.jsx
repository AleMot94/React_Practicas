import { useState, useEffect } from "react";
import "./App.css";
import { getRamdonFact } from "./services/facts";

//const CAT_ENDPOINT_RAMDON_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMG = "https://cataas.com/cat/";

function useCatImage({ fact }) {}

function App() {
  const [fact, setFact] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [threeWords, setThreeWord] = useState(undefined);

  // en el useEffect no se pueden usar async awaite [useEffect( async() => {}, []) esto esta mal]
  // se podria crear una funcion async dentro del useEffect
  useEffect(() => {
    // con la respuesta de la api, se setea el estado
    async function callGetRamdonFact() {
      try {
        const res = await getRamdonFact();
        setFact(res);
      } catch (error) {
        console.log(error);
      }
    }
    callGetRamdonFact();
  }, []);

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

  const handleClick = () => {
    // con la respuesta de la api, se setea el estado
    async function callGetRamdonFact() {
      try {
        const res = await getRamdonFact();
        setFact(res);
      } catch (error) {
        console.log(error);
      }
    }
    callGetRamdonFact();
  };
  return (
    <>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>cargar otra imagen</button>
      {fact && <p>{fact}</p>}
      {img && (
        <img
          src={`${CAT_ENDPOINT_IMG}${img}`}
          alt={`imagen extraida usando estas letras ${fact}`}
        />
      )}
      {threeWords && <p>palabras buscadas en la api : {threeWords}</p>}
    </>
  );
}

export default App;
