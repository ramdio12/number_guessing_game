import {  useEffect,  useState } from "react";

import algosdk, { waitForConfirmation } from "algosdk";
import { CONSTANTS } from './Constant';

const appIndex = CONSTANTS.APP_ID;


let client = new algosdk.Algodv2(CONSTANTS.algodToken, CONSTANTS.baseServer, CONSTANTS.port)

export const WriteStatus = {
    None: 0,
    Connect: 1,
    Request: 2,
    Pending: 3,
};

export default function Wallet(peraWallet) {
    const [writeLoading, setWriteLoading] = useState(WriteStatus.None);
    const [loading, setLoading] = useState(true);
    const [walletInstalled, setInstalled] = useState(true);
    const [walletConnected, setConnected] = useState(false);
    const [walletAccount, setAccount] = useState("");
    const [optedIn, setOptedIn] = useState(false)
    const [getNum, setGetNum] = useState([]);
    const [globalStates, setGlobalStates] = useState([]);   
    const [accountAddress, setAccountAddress] = useState(null);

    const [chance,setChance] = useState(0);
    const [playersCount,setPlayersCount] = useState(0);
    const [points,setPoints] = useState(0);
    const [isGuessOver, setIsGuessOver] = useState(false);
    const [playCount,setPlayCount] = useState(0)


    useEffect(() => {
        const runUpdates = async () => {
            setConnected(await getWalletConnected());
            setLoading(false);
        };
        runUpdates();
        checkGlobalState()
    }, [setInstalled, setConnected, setLoading]);

    async function checkGlobalState() {
        try {
            let counter = await client.getApplicationByID(appIndex).do();
            if (!!counter.params['global-state'][0].value.uint) {
                setPlayersCount(counter.params['global-state'][0].value.uint);
            } else {
                setPlayersCount(counter.params['global-state'][0].value.uint);
            }
        } catch (e) {
            console.error('There was an error connecting to the Algorand node: ', e);
        }
    }

    const nanParser = (val) => {
        return isNaN(val) ? 0 : val
    }

    const checkOptedIn = async (sender, index) => {
        try {
            const counter = await client.getApplicationByID(index).do();
            if (!!counter.params['global-state']) {
                setGlobalStates(counter.params['global-state'].map(_ => ({ key: atob(_.key), value: _.value.uint })))
            }
            const appInfo = await client.accountApplicationInformation(sender, index).do();
            if (appInfo['app-local-state']) {
                if (appInfo['app-local-state']['key-value']) {
                    const Nums = appInfo['app-local-state']['key-value']
                    if (Nums.length > 0) {
                        const Num = Nums.map(_ => ({ key: atob(_.key), value: _.value.uint }))
                        setChance(nanParser(Num.find(_ => _.key === 'chances')?.value) > 0 ?? false);
                        setPoints(nanParser(Num.find(_ => _.key === 'points')?.value) > 0 ?? false);
                        setIsGuessOver(nanParser(Num.find(_ => _.key === 'isGuessOver')?.value) > 0 ?? false);
                        setPlayCount(nanParser(Num.find(_ => _.key === 'play_count')?.value) > 0 ?? false);
                        setGetNum(Num)
                    } else {
                        setGetNum([])
                    }
                } else {
                    setGetNum([])
                }

                setOptedIn(true)
            }
        } catch (e) {
            console.log(e)
            setOptedIn(false)
            // console.error(`There was an error calling the app: ${e}`);
        }
    }

    const connectWallet = () => {
        return peraWallet.connect().then((newAccounts) => {

            peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);
            checkOptedIn(newAccounts[0], CONSTANTS.APP_ID)
            setAccount(newAccounts)
            setConnected(true)
            return newAccounts
        }).catch((error) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
              console.log(error);
            }
          });
    }

    const onTodoAction = async (action, message) => {
        return await noop(appIndex, action, message, walletAccount[0])
    }


    async function getWalletConnected() {
        return peraWallet.reconnectSession().then((accounts) => {
            // Setup disconnect event listener
            peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

            if (accounts.length) {
                setAccount(accounts);
                setAccountAddress(accounts[0]);
                checkGlobalState();
                checkOptedIn(accounts[0], appIndex);
                return true
            }
        })
    }

    const optIn = async () => {
        try {
            const index = CONSTANTS.APP_ID
            const sender = walletAccount[0]
            const suggestedParams = await client.getTransactionParams().do();
            const optInTxn = algosdk.makeApplicationOptInTxn(
                sender,
                suggestedParams,
                index
            );
            const actionTxGroup = [{ txn: optInTxn, signers: [sender] }];
            const signedTx = await peraWallet.signTransaction([actionTxGroup]);
            console.log(signedTx);
            const { txId } = await client.sendRawTransaction(signedTx).do();
            const result = await waitForConfirmation(client, txId, 4);
            console.log(result);
            if (result) {
                setLoading(false)
            }
            console.log(`Success`);
            setOptedIn(true)
            checkOptedIn(sender, appIndex)
        } catch (e) {
            setOptedIn(false)
            console.error(`There was an error calling the app: ${e}`);
        }
    }

    

    async function noop(action) {
        try {
            const accounts = await peraWallet.reconnectSession()
            const accountAddress = accounts[0]
            setWriteLoading(WriteStatus.Request)

            const suggestedParams = await client.getTransactionParams().do();
            const appArgs = [new Uint8Array(Buffer.from(action))];

            const actionTx = algosdk.makeApplicationNoOpTxn(
                accountAddress,
                suggestedParams,
                appIndex,
                appArgs
            );
            const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

            const signedTx = await peraWallet.signTransaction([actionTxGroup]);
            const { txId } = await client.sendRawTransaction(signedTx).do();
            setLoading(true)
            const result = await waitForConfirmation(client, txId, 2);
            console.log(result);
            if (result) {
                setLoading(false)
            }
            checkGlobalState()
            checkOptedIn(accountAddress, CONSTANTS.APP_ID)
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }


    function handleDisconnectWalletClick() {
        localStorage.removeItem('walletconnect')
        localStorage.removeItem('PeraWallet.Wallet')
        setConnected(false);
        setAccount(null);
        setOptedIn(false);
        setChance(0);
        setIsGuessOver(false);
        setGlobalStates([]);
        setGetNum([]);

    }

    return {
        loading,
        writeLoading,
        walletInstalled,
        walletConnected,
        walletAccount,
        accountAddress,
        connectWallet,
        optedIn,
        peraWallet,
        optIn,
        onTodoAction,
        handleDisconnectWalletClick,
        globalStates,
        getNum,
        chance,
        points,
        playersCount,
        playCount,
        isGuessOver,
        noop
    };
}