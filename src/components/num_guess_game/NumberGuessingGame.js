import React, { useEffect, useState } from 'react';
import './NumberGuessingGame.css';
import { useNavigate } from 'react-router-dom';
import teri from './img/teri-smack.gif'

function NumberGuessingGame({
  stats,
  clickNoop,
  isGuessOver
}) {
  const chances = stats.find((_) => _.key === "chances")?.value;
  const point = stats.find((_) => _.key === "points")?.value;
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 50) + 1);
  const [message, setMessage] = useState('');
  const [guessed, setGuessed] = useState(false);
  const [disable, setDisable] = useState(false);
  const [mistakeCount,setMistakeCount] = useState(0);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  useEffect(() => {

  })

  const navigate = useNavigate();


  const handleGuessSubmit = async (event) => {
    event.preventDefault();

    const parsedGuess = parseInt(guess, 10);
    if (isNaN(parsedGuess)) {
      setMessage('Please enter a number between 1 and 50.');
    } else if (parsedGuess < 1 || parsedGuess > 50) {
      setMessage('Please enter a number between 1 and 50.');
    } else if (parsedGuess === randomNumber) {
      await addPoints();
      setGuessed(true);
      setDisable(true);
    } else if (parsedGuess < randomNumber) {
      await guessNumber();
      setMessage('Try a higher number.');
      setMistakeCount(mistakeCount+1)
    } else if (parsedGuess > randomNumber) {
      await guessNumber();
      setMessage('Try a lower number.');
      setMistakeCount(mistakeCount+1)
    }

    setGuess('');
  };



  const addPoints = async () => {
    await clickNoop("add_points")
  }
  const guessNumber = async () => {
    await clickNoop("guess");
  }
  const resetHandle = async () => {
    await clickNoop("play_again")
    navigate("/number_guessing_game")
    setRandomNumber(Math.floor(Math.random() * 50) + 1);
    setMessage("");
    setGuess("");
    setDisable(false);
  }

  const quitClick = async () => {
    navigate("/");
    setRandomNumber(Math.floor(Math.random() * 50) + 1);
    setGuess("");
    setDisable(false);
  }



  if (isGuessOver) {
    return (
      <div className='gamepage'>
        <div className='gamepage-content'>

          <div className='fail'>
            <div className='sad'>
              <h1>Game Over</h1>
            </div>
            <p>You failed to guess the secret number</p>
            <img alt="teri-teri" src={teri} height={250}/>
            <p>Click the button below to play again</p>
            <button onClick={resetHandle} className='btn-reset-fail'>PLAY AGAIN</button>
          </div>
          
        </div>
      </div>
    )
  }

  return (
    <div className='gamepage'>
      {
      guessed === true ?
      navigate("/number_guessing_game/success")        
        :
        <div className='gamepage-content'>
          <h2>
            Random number selected between 1 and 50. See if you can guess it in
            5 tries or fewer. If you cannot guess the correct number after 5 tries (+1 for bonus guess) , the game is over
          </h2>
          <form onSubmit={handleGuessSubmit}>
            <input disabled={disable} type="text" value={guess} onChange={handleGuessChange} /><br />
            <button disabled={disable} type='submit'>
              {mistakeCount===5?"BONUS GUESS":"GUESS"}
              </button>
            <p>{message}</p>
          </form>
          <div className='gamepage-status'>
            <p>Chances : <span className='status'> {chances}</span> </p>
            <p>Point/s :<span className='status'> {point} </span> </p>
          </div>
          <button className='btn-quit' onClick={quitClick}>QUIT</button>
        </div>}
    </div>
  );
}

export default NumberGuessingGame;
