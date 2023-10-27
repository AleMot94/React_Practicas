// funcion original, no se puede pasar el setFact como parametro
// los estados de useState se tienen que quedar en el componente donde se crearon
// para eso se pueden usar los custom-hook

/*   const getRamdonFact = () => {
    fetch(CAT_ENDPOINT_RAMDON_FACT)
      .then((res) => {
        if (!res.ok) throw new Error("Error al hacer fetch a fact");
        return res.json();
      })
      .then((data) => {
        const fact = data.fact;
        setFact(fact);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

const CAT_ENDPOINT_RAMDON_FACT = "https://catfact.ninja/fact";
// se esporta la respuesta de la api
// y se setea en el componente donde esta el estado
export const getRamdonFact = async () => {
  try {
    const res = await fetch(CAT_ENDPOINT_RAMDON_FACT);
    const data = await res.json();
    const { fact } = data;
    return fact;
  } catch (error) {
    throw new Error("Algo salio mal con fetch a fact");
  }
};
