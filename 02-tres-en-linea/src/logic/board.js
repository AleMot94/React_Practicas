import { WINNER_COMBOS } from "../constant.js";

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    // RECUPERO 3 POSICIONES DE LOS COMBOS GANADORES
    const [a, b, c] = combo;
    //PARA VER SI X U O ES EL GANADOR
    if (
      // SI HAY UN CAMPO VACIO DEVUEL NULL
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] && // Y LUEGO COMPARA SI HAY 2 VALORES IGUALES SEGUIDOS
      boardToCheck[a] == boardToCheck[c]
      // SI LOS 3 VALORES SON IGUALES ES VERDADERO
    ) {
      return boardToCheck[a]; // retorna X u O -> el ganador
    }
  }
  return null; // si no, no hay ganador
};

export const checkEndGame = (newBoard) => {
  // REVISA SI NO HAY ESPACIOS VACION EN EL TABLERO
  return newBoard.every((square) => square != null);
  //every devuelve true o false al iterar en un array
};
