import { useState } from "react";
import OktoNavbar from "../components/OktoNavbar";
// import { useOkto, WalletData, TransferTokens, TransferTokensData } from "okto-sdk-react";
import { WalletData } from "okto-sdk-react";
import TiltWrapper from "../components/TiltWrapper";
import { generateToken } from "../utils/generateToken";
import { saveJWT } from "../utils/jwt-storage";

export const Games = () => {
    const [wallets, setWallets] = useState<WalletData>();
    // const okto = useOkto();
    const saveToken = async () => {
        const token = await generateToken(wallets?.wallets[0].address||"", true, "apisecret") || "";
        saveJWT(token);
    }

    const makeTransaction = async () => {
        // if (!okto) {
        //     console.error("Okto context is not available");
        //     return;
        // }

        // const recipientPublicKey = "FhNZ5dafuzZLQXixkvRd2FP4XsDvmPyzaHnQwEtA1mPT";
        // const network = "SOLANA_DEVNET"
        // console.log(network);
        // const transferData: TransferTokens = {
        //     network_name: network,
        //     token_address: "",
        //     quantity: "0.1",
        //     recipient_address: recipientPublicKey
        // };

        // try {
        //     const result: TransferTokensData = await okto.transferTokens(transferData);
        //     console.log(`Transfer of 0.1 SOL on Solana devnet initiated. Order ID: ${result.orderId}`);
        //     return true;
        // } catch (error) {
        //     console.error("Error transferring SOL on devnet:", error);
        //     return false;
        // }
        return true;
    }

    return (
        <div className="h-screen w-screen">
        <div className="pb-12 bg-custom-dark m-0 p-0 h-screen w-screen">
            <div>
                <OktoNavbar wallets={wallets} setWallets={setWallets}/>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-custom-primary font-semibold tracking-wide uppercase">Games</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl">
                    Some games to play
                </p>
            </div>

            <div className="mt-10">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <div
                            onClick={async ()=>{
                                const success = await makeTransaction();
                                if(success) {
                                    saveToken();
                                }
                            }}
                        >
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="Ludo.png" alt="product image" />
                                <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-custom-dark">Ludo Fam, play and win with your friends!!</h5>
                                </div>
                            </div>
                        </div>
                    </TiltWrapper>
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <a target="blank" href="/ComingSoon">
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="tictactoe.png" alt="product image" />
                                <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-custom-dark">Tic Tac Toe, play and win with your friends!!</h5>
                                </div>
                            </div>
                        </a>
                    </TiltWrapper>
                    <TiltWrapper options={{ max: 15, speed: 200 }}>
                        <a target="blank" href="/ComingSoon">
                            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark">
                                    <img className="p-8 rounded-t-lg" src="chess.png" alt="product image" />
                                <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-custom-dark">Chess, play and win with your friends!!</h5>
                                </div>
                            </div>
                        </a>
                    </TiltWrapper>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
};