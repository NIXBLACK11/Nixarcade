import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { moneyState, transState } from '../atom';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRecoilState } from 'recoil';
import Solflare from '@solflare-wallet/sdk';

const wallet = new Solflare();
const NETWORK = 'https://api.devnet.solana.com';
type WalletProps = {
    address: string;
  };
wallet.on('connect', () => {
    console.log('connected', wallet.publicKey?.toString());
});
wallet.on('disconnect', () => {
    console.log('disconnected');
});

export const SolflareComponent: React.FC<WalletProps> = ({address}) => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [_trans, setTrans] = useRecoilState(transState);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [moneyDeposited, setMoneyDeposited] = useRecoilState(moneyState);
    const [connection, setConnection] = useState<Connection>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number>();


    useEffect(() => {
        connectWallet();
        const conn = new Connection(NETWORK);
        setConnection(conn);
    }, []);

    useEffect(() => {
        if (walletAddress) {
            fetchBalance();
        }
    }, [walletAddress]);

    const fetchBalance = async () => {
        if (!connection || !walletAddress) return;

        try {
            const publicKey = new PublicKey(walletAddress);
            const balanceInLamports = await connection.getBalance(publicKey);
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
            setBalance(balanceInSOL);
        } catch (error) {
            console.error("Error fetching balance:", error);
            setError("Failed to fetch balance. Please try again.");
        }
    };

    const connectWallet = async () => {
        setLoading(true);
        setError(null);
        try {
            await wallet.disconnect(); // Disconnect first to ensure a fresh connection
            await wallet.connect();
            // console.log(wallet.publicKey);
            setWalletAddress(wallet.publicKey?.toString() || "");
        } catch (error) {
            console.error("Error connecting to Solflare Wallet:", error);
            setError("Failed to connect to Solflare wallet. Please try again.");
        }
        setLoading(false);
    };

    const checkBalanceAndDeposit = async () => {
        setLoading(true);
        setError(null);
        if (!connection || !walletAddress) {
            setError("Wallet not connected");
            setLoading(false);
            return;
        }

        try {
            await fetchBalance(); // Refresh balance before checking

            if (balance === null) {
                throw new Error("Failed to fetch balance");
            }

            const requiredBalance = depositAmount;

            if (balance && balance < requiredBalance) {
                setError(`Insufficient balance. You have ${balance} SOL, but need at least ${depositAmount} SOL to make this transaction.`);
                setLoading(false);
                return;
            }

            await deposit();
        } catch (error: any) {
            console.error("Error checking balance:", error);
            setError(`Failed to check balance: ${error.message}`);
        }
        setLoading(false);
    };

    const deposit = async () => {
        if (!connection || !walletAddress) {
            setError("Wallet not connected");
            return;
        }
    
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(walletAddress),
                    toPubkey: new PublicKey(address),
                    lamports: depositAmount * LAMPORTS_PER_SOL,
                })
            );
    
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = new PublicKey(walletAddress);  // Set the fee payer

            // Ensure that solflare is connected and can sign the transaction
            const signedTransaction = await wallet.signTransaction(transaction);
    
            if (!signedTransaction) {
                throw new Error("Failed to sign the transaction");
            }
    
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            });
    
            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
            }

            setMoneyDeposited(true);
            await fetchBalance();
        } catch (error: any) {
            console.error("Error depositing:", error);
            setError(`Deposit failed: ${error.message}`);
        }
    }
    
    function renderButtonOrInfo() {
        if(loading) {
            return (
                <div className="flex items-center gap-2 bg-[#14161F] hover:bg-[#313858] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#3c3a47] disabled:cursor-not-allowed">
                    Loading... almost there!
                    <div className="spinner"></div>
                </div>
            )
        } else if(moneyDeposited) {
            return (
                <div 
                    className="flex items-center gap-2 bg-[#14161F] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#3c3a47]"
                >
                    Money deposited successfully
                    <button onClick={() => {
                        setTrans(false);
                        setMoneyDeposited(false);
                    }}>
                        <IoMdCloseCircleOutline />
                    </button>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col items-center">
                  <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                        placeholder="Enter amount in SOL"
                        className="mb-4 p-2 border rounded"
                        min="0"
                        step="0.01"
                    />
            
                  <button
                    className="flex items-center gap-2 bg-[#14161F] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#3c3a47] disabled:cursor-not-allowed"
                    onClick={checkBalanceAndDeposit}
                    disabled={loading || !depositAmount}
                  >
                    Deposit {depositAmount || '0'} SOL
                    <img src="solflare.png" alt="Icon" className="w-5 h-5" />
                  </button>
                </div>
            );
        }
      }

    return (
        <div className='w-full h-full'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderButtonOrInfo()}
        </div>
    )
}