import { WalletData } from "okto-sdk-react";
import { IoCloseOutline, IoWalletOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { transState } from "../atom";
import { WalletTransfer } from "./WalletTransfer";
import { MdContentCopy } from "react-icons/md";

interface WalletProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    wallets: WalletData | undefined;
    balance: number | null;
  }
// {trans && <WalletTransfer address={wallets?.wallets[0].address || ""}/>}
export const Wallet: React.FC<WalletProps> = ({ setOpen, wallets, balance }) => {
    const [trans, setTrans] = useRecoilState(transState);
    return (
        <div className="absolute m-0 p-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center z-10">
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#1a2234] rounded-xl shadow-xl">
                    {/* Header */}
                    {(trans) ? <WalletTransfer address={wallets?.wallets[0].address || ""}/> :
                        <div>
                            <div className="flex justify-between items-center p-4 border-b border-slate-700">
                                <div className="flex items-center gap-2 text-white">
                                    <IoWalletOutline className="w-5 h-5" />
                                    <p className="font-medium">Wallet</p>
                                    {wallets && wallets.wallets.map((wallet, index) => (
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
                                <div className="cursor-pointer text-slate-400 hover:text-white">
                                    <IoCloseOutline className="w-6 h-6" onClick={()=>{setOpen(false)}}/>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="p-6">
                                {/* Wallet illustration container */}
                                <div className="flex justify-center mb-8">
                                    <img
                                        src="wallet.jpeg"
                                    />
                                </div>
                                {/* Text content */}
                                <div className="text-center mb-8">
                                    <h1 className="text-xl text-white font-semibold mb-2">
                                        Your Wallet has {balance} SOL.
                                    </h1>
                                    <p className="text-slate-400 text-sm">
                                        Make a deposit via crypto or local currency.
                                    </p>
                                </div>
                                {/* Action buttons */}
                                <div className="flex justify-center items-center">
                                    <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                                        <button 
                                            className="text-center py-2.5 px-4"
                                            onClick={()=>{setTrans(true)}}
                                        >Deposit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}