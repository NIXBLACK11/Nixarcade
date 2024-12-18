import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { moneyState, transState } from '../atom';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRecoilState } from 'recoil';
type WalletProps = {
    address: string;
};
const NETWORK = 'https://api.devnet.solana.com';
const DEPOSIT_AMOUNT = 0.5;

export const WalletConnect: React.FC<WalletProps> = ({address}) => {
    const [_trans, setTrans] = useRecoilState(transState);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [moneyDeposited, setMoneyDeposited] = useRecoilState(moneyState);
    const [connection, setConnection] = useState<Connection>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number>();

    useEffect(() => {
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
        if (window.solana && window.solana.isPhantom) {
            try {
                await window.solana.disconnect(); // Disconnect first to ensure a fresh connection
                const response = await window.solana.connect();
                setWalletAddress(response.publicKey.toString());
            } catch (error) {
                console.error("Error connecting to Phantom Wallet:", error);
                setError("Failed to connect to Phantom wallet. Please try again.");
            }
        } else {
            setError("Phantom wallet is not installed!");
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

            const requiredBalance = DEPOSIT_AMOUNT;

            // console.log(`Current balance: ${balance} SOL`);
            // console.log(`Required balance: ${DEPOSIT_AMOUNT} SOL`);

            if (balance && balance < requiredBalance) {
                setError(`Insufficient balance. You have ${balance} SOL, but need at least ${DEPOSIT_AMOUNT} SOL to make this transaction.`);
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
                    lamports: DEPOSIT_AMOUNT * LAMPORTS_PER_SOL,
                })
            );
    
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = new PublicKey(walletAddress);  // Set the fee payer
    
            // Ensure that Phantom is connected and can sign the transaction
            const signedTransaction = await window.solana?.signTransaction(transaction);
    
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
                <div className="flex items-center gap-2 bg-[#9382DE] hover:bg-[#473e6e] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3] disabled:cursor-not-allowed">
                    Loading... almost there!
                    <div className="spinner"></div>
                </div>
            )
        } else if(moneyDeposited) {
            return (
                <div 
                    className="flex items-center gap-2 bg-[#9382DE] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3]"
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
        } else if (!walletAddress) {
          return (
            <button
              className="flex items-center gap-2 bg-[#9382DE] hover:bg-[#473e6e] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3] disabled:cursor-not-allowed"
              onClick={connectWallet}
              disabled={loading}
            >
              Connect Wallet
              <img src="phantom.png" alt="Icon" className="w-5 h-5" />
            </button>
          );
        } else {
          return (
            <div>
              <button
                className="flex items-center gap-2 bg-[#9382DE] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3] disabled:cursor-not-allowed"
                onClick={checkBalanceAndDeposit}
                disabled={loading}
              >
                Deposit {DEPOSIT_AMOUNT} SOL
                <img src="phantom.png" alt="Icon" className="w-5 h-5" />
              </button>
            </div>
          );
        }
      }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderButtonOrInfo()}
        </div>
    )
}