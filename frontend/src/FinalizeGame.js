const FinalizeGame = () => {

    return (
      <div>
        <h2>Game Over!</h2>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
}
export default FinalizeGame;