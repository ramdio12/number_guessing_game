import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Wallet from './hooks/Wallet';
import NumberGuessingGame from './components/num_guess_game/NumberGuessingGame';
import NumGameSuccess from './components/num_guess_game/NumGameSuccess';

export function App({ peraWallet }) {
   const {
      noop,
      optIn,
      connectWallet,
      handleDisconnectWalletClick,
      playersCount,
      isGuessOver,
      getNum,
      loading,
      walletInstalled,
      walletConnected,
      optedIn,
   } = Wallet(peraWallet);



   return (
      <div className='App'>
         <meta name="name" content="AlgoNum Guessing Game" />

         <Routes>
            <Route path='/' element={<Home
               handleDisconnectWalletClick={handleDisconnectWalletClick}
               optedIn={optedIn}
               optIn={optIn}
               walletConnected={walletConnected}
               connectWallet={connectWallet}
               loading={loading}
               walletInstalled={walletInstalled}
               playersCount={playersCount}
               stats={getNum}
               clickNoop={noop}
            />} />
            
            <Route path='/number_guessing_game' element={
            <NumberGuessingGame 
               clickNoop={noop}
               stats={getNum}
               isGuessOver={isGuessOver}
            />} />

            <Route path='/number_guessing_game/success' element={<NumGameSuccess
               clickNoop={noop}
               stats={getNum} 
            />
         }/>
         
         </Routes>
        


      </div>


   )

}

export default App;




//   numGamePlayersCount={numGamePlayersCount}
//   wordGamePlayersCount={wordGamePlayersCount}
//   stats={getNum}
//   clickNoop={noop}
//   onTodoAction={onTodoAction}
//   numGuessOver={numGuessOver}
//   wordGuessOver={wordGuessOver}


//   clickNoop={noop}
// stats={getNum}
// onTodoAction={onTodoAction}
// numGuessOver={numGuessOver}
// wordGuessOver={wordGuessOver}