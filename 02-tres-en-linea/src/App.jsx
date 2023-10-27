import Square from "./componentes/square.jsx";
import WinnerModal from "./componentes/WinnerModal.jsx";
import { useState } from "react";
import { TURNS } from "./constant.js";
import { checkWinner, checkEndGame } from "./logic/board";
import confetti from "canvas-confetti";

function App() {
  // LOS ESTADOS SE INICIALIZAN LA PRIMERA VEZ QUE SE ENTRA A LA PAGINA
  // EN LOS RENDER POSTERIORES NO
  const [board, setBoard] = useState(() => {
    // useState acepta como parametro una funcion de callback
    // que se puede utilizar para iniciar la variable de forma condicional
    const boardFronStorage = window.localStorage.getItem("board");
    return boardFronStorage
      ? // si hay una partida en el local storage la recupera
        // si no crea un tablero nuevo
        JSON.parse(boardFronStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });
  // NULL NO HAY GANADOR, FALSE EMPATE
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // NO ACTUALIZA EL CUADRADO
    // SI YA TIENE UN VALOR O HAY GANADOR
    if (board[index] || winner) return;
    // ACTUALIZA EL TRABLERO
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // CAMBIA EL TURNO
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // GUARDAR PARTIDA EN LOCAL STORAGE
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    // REVISAR SI HAY GANADOR
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      // guardar en una variable el estado antes de setarla
      // resuelve la asincronia de los estados si no, guarda el valor previo
      // por eso se guarda el ganador en newWninner, el checkEndGame retorna la letra ganadora
      setWinner(newWinner); // GANADOR
      // otra forma de poder setar el nuevo valor resolviendo la asincronia
      // es con un callback para la funcion de setWinner
      // de esa forma tambien se podria manipular el valor previo si fuera necesario
      /* if (newWinner) {
        setWinner((valorPrev) => {
          console.log(
            `Ganador: ${newWinner}, el valor anterior era ${valorPrev}`
          );
          return newWinner;
        });
      } */
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // EMPATE
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <>
      <main className="board">
        <h1>tres en linea</h1>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
        </section>

        <button onClick={resetGame}>Reiniciar</button>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  );
}

export default App;
