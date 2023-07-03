import './NumberGuessingGame.css';
import { useNavigate } from 'react-router-dom';

function NumGameSuccess({
    clickNoop,
    stats,
}){
    const point = stats.find((_) => _.key === "points")?.value;
    const navigate = useNavigate();

    const redirectToNumGameMain = async () => {
        await clickNoop("play_again");
        navigate("/number_guessing_game")
    }
    return (
        <div className='gamepage'>
          <div className='gamepage-content'>
            <div className='success-div'>
              
                <h1>CONGRATULATIONS</h1>
            <h2>You guessed the secret number</h2>
            <p>You have now  </p>
            <h3>{point}</h3>
            <p>Point/s</p>
       
            <div className='success-btn'>
            <button className='btn-reset' onClick={redirectToNumGameMain}>
               PLAY AGAIN
                </button>
            </div>
            </div>
          </div>
</div>
      );

}

export default NumGameSuccess;