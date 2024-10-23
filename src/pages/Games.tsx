import { useState } from "react";
import OktoNavbar from "../components/OktoNavbar";
import { useOkto, WalletData, TransferTokens, TransferTokensData } from "okto-sdk-react";
import TiltWrapper from "../components/TiltWrapper";
import { generateToken } from "../utils/generateToken";
import { saveJWT } from "../utils/jwt-storage";
import { useRecoilState } from "recoil";
import { balanceState, errorState, loadingState } from "../atom";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { makeTransaction } from "../utils/makeTransaction";

export const Games = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useRecoilState(loadingState);
    const [wallets, setWallets] = useState<WalletData>();
    const [_, setError] = useRecoilState(errorState);
    const [balance] = useRecoilState(balanceState);
    const okto = useOkto();
    const saveToken = async () => {
        const token = await generateToken(wallets?.wallets[0].address||"", true, "apisecret") || "";
        saveJWT(token);
    }

    return (
        <div className="h-screen w-screen">
        {loading ? <Loading/> :
        <div className="pb-12 bg-custom-dark m-0 p-0 h-screen w-screen">
            <div>
                <OktoNavbar wallets={wallets} setWallets={setWallets}/>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="font-custom text-base text-custom-primary font-semibold tracking-wide uppercase">Games</h2>
                <p className="font-custom mt-2 text-3xl leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl">
                    Some games to play
                </p>
            </div>

            <div className="mt-10">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <div
                            onClick={async ()=>{
                                setLoading(true);
                                if(balance<0.01) {
                                    setError({ show: true, message: 'Not Enough balance' });
                                    setLoading(false);
                                    return;
                                }
                                const success = await makeTransaction(okto, '0.001');
                                if(success) {
                                    saveToken();
                                    setTimeout(()=> {
                                        window.location.href="https://ludofam.nixarcade.fun";
                                    }, 3000);
                                } else {
                                    setLoading(false);
                                }
                            }}
                        >
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="Ludo.png" alt="product image" />
                                <div className="px-5 pb-5 text-center">
                                    <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Ludo Fam, play and win with your friends!!</h5>
                                    <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.01</h5>
                                </div>
                            </div>
                        </div>
                    </TiltWrapper>
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <div 
                            onClick={async ()=>{
                                setLoading(true);
                                if(balance<0.01) {
                                    setError({ show: true, message: 'Not Enough balance' });
                                    setLoading(false);
                                    return;
                                }
                                const success = await makeTransaction(okto, '0.001');
                                if(success) {
                                    saveToken();
                                    setTimeout(()=> {
                                        window.location.href="https://ttt.nixarcade.fun";
                                    }, 3000);
                                } else {
                                    setLoading(false);
                                }
                            }}
                        >
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="tictactoe.png" alt="product image" />
                                <div className="px-5 pb-5 text-center">
                                    <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Tic-Tac-Toe, play and win with your friends!!</h5>
                                    <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.01</h5>
                                </div>
                            </div>
                        </div>
                    </TiltWrapper>
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <div onClick={()=>{
                            navigate("/ComingSoon");
                        }}>
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="chess.png" alt="product image" />
                                <div className="px-5 pb-5 text-center">
                                    <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Chess, play and win with your friends!!</h5>
                                    <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.01</h5>
                                </div>
                            </div>
                        </div>
                    </TiltWrapper>
                </div>
            </div>
            </div>
        </div>}
    </div>
    )
};