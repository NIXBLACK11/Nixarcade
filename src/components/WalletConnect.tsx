import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

const NETWORK = "https://api.devnet.solana.com";
const GAME_WALLET_PUBLIC_KEY = "6264vVvtWg8CqBRegBt83ttcPPK61LurXNs7cqF56Gf5";
const DEPOSIT_AMOUNT = 0.1;

interface WalletConnectProps {
    setViewNFT: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({setViewNFT}) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const conn = new Connection(NETWORK);
        setConnection(conn);
    }, []);

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

    function renderButtonOrInfo() {
        if(loading) {
            return (
                <div className="flex items-center gap-2 bg-[#9382DE] hover:bg-[#473e6e] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3] disabled:cursor-not-allowed">
                    Connectng wallet
                    <div className="spinner"></div>
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
                <button
                    className="flex items-center gap-2 bg-[#14F195] hover:bg-[#2c4b3e] text-white rounded-full py-2 px-4 font-medium disabled:bg-[#B0A9E3] disabled:cursor-not-allowed"
                    onClick={() => {setViewNFT(true)}}
                    disabled={loading}
                >
                    View NFT's
                    <img src="solana-sol-logo.png" alt="Icon" className="w-5 h-5" />
                </button>
            )
        }
      }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderButtonOrInfo()}
        </div>
    )
}