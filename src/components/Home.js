import ChoiceButton from "./ChoiceButton";
import BtnWalletHandler from './BtnWalletHandler'

function Home({ 
    handleDisconnectWalletClick,
    optedIn,
    optIn,
    walletConnected,
    connectWallet,
    loading,
    walletInstalled,
    playersCount,
    stats,
    clickNoop
}) {

    return (
        <div>

            <BtnWalletHandler 
                handleDisconnectWalletClick={handleDisconnectWalletClick}
                optedIn={optedIn}
                optIn={optIn}
                walletConnected={walletConnected}
                connectWallet={connectWallet}
                loading={loading}
                walletInstalled={walletInstalled} />

            {optedIn && walletConnected && (
                
            <ChoiceButton
                playersCount={playersCount}
                clickNoop={clickNoop}
                stats={stats}
            />
            )}
        </div>

    )


}

export default Home;