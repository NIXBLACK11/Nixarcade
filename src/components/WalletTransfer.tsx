import { useRecoilState } from "recoil";
import { useState } from 'react';
import { transState } from "../atom";
import { FaArrowLeft } from "react-icons/fa";
import { PhantomComponent } from "./PhantomComponent";
import { SolflareComponent } from "./SolflareComponent";

type WalletProps = {
    address: string;
  };

const walletOptions = [
    { name: 'Solflare', icon: <img src="solflare.png" alt="Solflare" className="w-6 h-6" /> },
    { name: 'Phantom', icon: <img src="phantom.png" alt="Phantom" className="w-6 h-6" /> },
    { name: 'UPI(Coming Soon)', icon: <img src="upi.png" alt="Phantom" className="w-6 h-6" /> }
];
export const WalletTransfer: React.FC<WalletProps> = ({address}) => {
    const [_trans, setTrans] = useRecoilState(transState);
    const [wallet, setWallet] = useState<string | null>(null);
    return (
        <div className="bg-[#1a2234] p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <button 
                className="text-3xl font-bold mb-4 text-white mr-0"
                onClick={() => {
                    setTrans(false);
                }}
                ><FaArrowLeft className="w-6 h-6"/>
            </button>
            {wallet === null ? (
                <div className="">
                    <h2 className="text-xl font-bold mb-4 text-white">Connect wallet or use UPI</h2>
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
                // <WalletConnect2 address={address}/>
                <SolflareComponent address={address}/>
            ) : wallet === "Phantom" ? (
                // <WalletConnect address={address}/>
                <PhantomComponent address={address}/>
            ) : null}
        </div>
    )
}