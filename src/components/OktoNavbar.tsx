import { useState, useEffect } from 'react';
import { useOkto, WalletData } from "okto-sdk-react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
 

// import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { transState } from '../atom';
import { Wallet } from './Wallet';

interface OktoNavbarProps {
  wallets: WalletData | undefined; // WalletData can be undefined initially
  setWallets: React.Dispatch<React.SetStateAction<WalletData | undefined>>; // setWallets type
}

const OktoNavbar: React.FC<OktoNavbarProps> = ({ wallets, setWallets }) => {
  const okto = useOkto();
  // const navigate = useNavigate();
  const [trans] = useRecoilState(transState);
  const [isOpen, setOpen] = useState(false);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [_error, setError] = useState<string>("");
  const NETWORK = 'https://api.devnet.solana.com';
  const authToken = localStorage.getItem('googleToken');
  
  useEffect(() => {
    const conn = new Connection(NETWORK);
    setConnection(conn);
}, []);

  useEffect(() => {
    checkAuthentication();
    fetchWallets();
  }, [trans]);

  const fetchBalance = async () => {
    const walletAddress = wallets?.wallets[0].address;
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
  }

  const fetchWallets = async () => {
    try {
      const walletsData = await okto?.createWallet();
      // console.log(walletsData)
      setWallets(walletsData);
    } catch (error: any) {
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };

  const checkAuthentication = async () => {
    if (!authToken) {
      setError("No auth token found. Please log in again.");
      window.location.href="https://nixarcade.fun";
      return;
    }

    try {
      const userDetails = await okto?.getUserDetails();
      console.log("User authenticated:", userDetails);
      fetchBalance();
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Authentication failed. Please log in again.");
      window.location.href="https://nixarcade.fun";
    }
  };

  const handleCreateWallet = async () => {
    if (!authToken) {
      setError("No auth token found. Please log in again.");
      window.location.href="https://nixarcade.fun";
      return;
    }

    try {
        // console.log(okto?.isLoggedIn);
        const walletsData = await okto?.createWallet();
        setWallets(walletsData);
      } catch (error: any) {
        setError(`Failed to fetch wallets: ${error.message}`);
      }
  };

  return (
    <>
   {isOpen && <Wallet setOpen={setOpen} wallets={wallets} balance={balance}/>}
    <div className="w-screen bg-transparent p-4 flex items-center justify-center ">
        {wallets && wallets.wallets.length > 0 ? (<div className='flex flex-row'>
            <div className='mr-2 text-white items-center flex px-4 bg-[#1a2234] rounded-lg'>
              <p className="font-semibold mx-6 text-white">{wallets.wallets[0].network_name}</p>
              <p className='text-blue-600 font-semibold mx-6'>SOL: {balance}</p>
            </div>
            <button
              className=''
              onClick={()=>{
                setOpen(!isOpen);
                fetchBalance();
              }}
            >
              <img
                src='okto.png'
                className='h-16 rounded-full'
              />
            </button>
          
          {/* {isOpen && <div className="absolute right-5 mt-8 w-1/5 bg-transparent shadow-lg rounded-lg flex flex-col justify-center items-start border z-10">
            <div className='m-0 p-0 flex flex-row'>
              <p className="font-semibold mx-6 text-white">{wallets.wallets[0].network_name}</p>
              <p className='text-blue-600 font-semibold mx-6'>SOL: {balance}</p>
            </div>
            <div
              className="block px-4 py-2 text-gray-400 hover:bg-gray-500 w-full rounded-lg hover:text-black"
            >
              {wallets.wallets.map((wallet, index) => (
              <div key={index} className="flex items-center justify-between">
              <p className="text-sm">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(wallet.address)}
                className="ml-2 text-blue-500 text-sm flex items-center"
              >
                <MdContentCopy />
              </button>
            </div>
            
            ))}
            </div>
            <div
              className="block px-4 py-2 text-gray-400 hover:bg-gray-500 w-full rounded-lg text-sm hover:text-black"
              onClick={()=> {
                setTrans(!trans);
              }}
            >
              Transfer funds to wallet
            </div>
          </div>
          } */}
          
        </div>) : (
            <button
              onClick={handleCreateWallet}
              className="font-custom bg-custom-primary hover:bg-[#703250] text-white font-bold py-2 px-4 rounded"
            >
              Create Wallet
            </button>
          )}
    </div>
    </>
  );
};

export default OktoNavbar;