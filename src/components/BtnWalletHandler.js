import React from "react";
import './button_styler/btnstyler.css';
import title from './button_styler/img/title.png'

export default function Wallet({
  walletConnected,
  optedIn,
  optIn,
  connectWallet,
  handleDisconnectWalletClick,
}) {
 


  return (
    <div>
      {!walletConnected && (
        <div className="connect-btn-div">
          <div className="guessgame_title">
          <img alt="title" src={title} height={200} />
            
          </div>
          <button
            className="connect_btn"
            onClick={connectWallet}
          >
            CLICK HERE TO CONNECT YOUR WALLET
          </button>
        </div>

      )}
      <div className="connect-disconnect-section">

      {walletConnected && (
        <button
          className="disconnect-btn"
          onClick={handleDisconnectWalletClick}
        >
          DISCONNECT WALLET
        </button>
      )}

      {walletConnected && !optedIn ?
        <button className="register-btn" onClick={optIn}>
          OPT-IN
        </button> : null
      }

</div>
    </div>
  );
}
