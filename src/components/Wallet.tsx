import { useRecoilState } from "recoil";
import { WalletConnect } from "./WalletConnect"
import { WalletConnect2 } from "./WalletConnect2";
import { useState } from 'react';
import { transState } from "../atom";
import { IoIosCloseCircleOutline } from "react-icons/io";

type WalletProps = {
    address: string;
  };

const walletOptions = [
    { name: 'Solflare', icon: <img src="solflare.png" alt="Solflare" className="w-6 h-6" /> },
    { name: 'Phantom', icon: <img src="phantom.png" alt="Phantom" className="w-6 h-6" /> },
    { name: 'UPI(Coming Soon)', icon: <img src="upi.png" alt="Phantom" className="w-6 h-6" /> }
];
export const Wallet: React.FC<WalletProps> = ({address}) => {
    const [_trans, setTrans] = useRecoilState(transState);
    const [wallet, setWallet] = useState<string | null>(null);
    return (
        <div className="absolute m-0 p-0 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center z-10">
            {wallet === null ? (
                <div className="bg-transparent p-6 rounded-lg shadow-lg max-w-md mx-auto border">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-xl font-bold mb-4 text-white">Connect wallet or use UPI</h2>
                        <button 
                            className="text-3xl font-bold mb-4 text-white mr-0"
                            onClick={() => {
                                setTrans(false);
                            }}
                        ><IoIosCloseCircleOutline />
                        </button>
                    </div>
                    <p className=" text-white mb-4">Choose how you want to transfer the funds. There are several ways to do so.</p>
            
                    <div className="mb-4">
                    {walletOptions.slice(0, 3).map((wallet) => (
                        <div 
                            key={wallet.name} 
                            className="flex items-center justify-between py-2 px-3 bg-transparent hover:bg-slate-800 text-white hover:text-gray-500 rounded"
                            onClick={()=>{
                                setWallet(wallet.name);
                            }}    
                        >
                            <span>{wallet.name}</span>
                            {wallet.icon}
                        </div>
                    ))}
                    </div>
            
                    <p className=" text-xs text-gray-500 mt-4">
                    We do not own your private keys and cannot access your funds without your confirmation.
                    </p>
                </div>
            ) : wallet === "Solflare" ? (
                <WalletConnect2 address={address}/>
            ) : wallet === "Phantom" ? (
                <WalletConnect address={address}/>
            ) : null}
        </div>
    )
}