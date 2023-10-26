import Square from "./square"

export default function WinnerModal ({winner, resetGame}) {
    if(winner === null) return null

    const winnerText = winner == false ? "Empatee" : "Ganaste Capoo"

    return(
        <section className="winner">
            <div className="text">
                <h2>
                    {winnerText}
                </h2>

                <header className="win">
                {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={resetGame}>Reiniciar</button>
                </footer>
            </div>
        </section>
    )
}