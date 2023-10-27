import { useEffect, useState } from "react";
import { getRamdonFact } from "../services/facts";

export const useCatFact = () => {
  const [fact, setFact] = useState(undefined);

  const getFactRamdon = () => {
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

  useEffect(() => {
    getRamdonFact;
  }, []);

  return { fact, getFactRamdon };
};

// AHORA ESTA EN UN CUSTOM-HOOK useCatFact
/*   
  // en el useEffect no se pueden usar async awaite [useEffect( async() => {}, []) esto esta mal]
  // se podria crear una funcion async dentro del useEffect
  useEffect(() => {
    // con la respuesta de la api, se setea el estado
    // se podria haber echo un custom-hook
    async function callGetRamdonFact() {
      try {
        const res = await getRamdonFact();
        setFact(res);
      } catch (error) {
        console.log(error);
      }
    }
    callGetRamdonFact();
  }, []); */
