import { useEffect } from "react";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import "./App.css";

function App() {
  // custom-hook
  const { fact, getFactRamdon } = useCatFact();
  const { img, threeWords } = useCatImage({ fact });
  // es buena practica no devolver el set del useState

  useEffect(() => {
    getFactRamdon(); // Llama a la función para cargar el hecho
  }, []);

  // estos estados ahora estan en el custom-hook
  //   useCatImage
  // const [img, setImg] = useState(undefined);
  // const [threeWords, setThreeWord] = useState(undefined);
  //   useCatFact
  // const [fact, setFact] = useState(undefined);

  const handleClick = getFactRamdon;
  return (
    <>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>cargar otra imagen</button>
      {fact && <p>{fact}</p>}
      {img && (
        <img
          src={`${img}`}
          alt={`imagen extraida usando estas letras ${fact}`}
        />
      )}
      {threeWords && <p>palabras buscadas en la api : {threeWords}</p>}
    </>
  );
}

export default App;
