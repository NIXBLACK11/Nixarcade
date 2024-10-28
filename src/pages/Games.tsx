import { useRef, useState } from "react";
import OktoNavbar from "../components/OktoNavbar";
import { useOkto, WalletData } from "okto-sdk-react";
import TiltWrapper from "../components/TiltWrapper";
import { generateToken } from "../utils/generateToken";
import { saveJWT } from "../utils/jwt-storage";
import { useRecoilState } from "recoil";
import { balanceState, errorState, loadingState } from "../atom";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { makeTransaction } from "../utils/makeTransaction";
import ConfirmationModal from "../components/ConfirmationModal"; // Import modal

export const Games = () => {
    const clickRef = useRef(new Audio("click.wav"));
    const navigate = useNavigate();
    const [loading, setLoading] = useRecoilState(loadingState);
    const [wallets, setWallets] = useState<WalletData>();
    const [_, setError] = useRecoilState(errorState);
    const [balance] = useRecoilState(balanceState);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedGame, setSelectedGame] = useState<{ link: string, amount: string } | null>(null);

    const okto = useOkto();
    
    const saveToken = async () => {
        const token = await generateToken(wallets?.wallets[0].address || "", true, "apisecret") || "";
        saveJWT(token);
    }

    const gameClick = async (gameLink: string, amount: string) => {
        clickRef.current.play();
        setLoading(true);
        if (balance < 0.001) {
            setError({ show: true, message: 'Not Enough balance' });
            setLoading(false);
            return;
        }
        const success = await makeTransaction(okto, amount);
        if (success) {
            saveToken();
            setTimeout(() => {
                setLoading(false);
                window.location.href = gameLink;
            }, 3000);
        } else {
            setLoading(false);
        }
    };

    const handleGameClick = (gameLink: string, amount: string) => {
        setSelectedGame({ link: gameLink, amount }); // Set selected game details
        setIsModalOpen(true); // Open the modal
    };

    const confirmTransaction = () => {
        if (selectedGame) {
            gameClick(selectedGame.link, selectedGame.amount); // Call gameClick with selected game details
        }
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="h-screen w-screen">
            {loading ? <Loading /> :
                <div className="pb-12 bg-custom-dark m-0 p-0 h-screen w-screen">
                    <div>
                        <OktoNavbar wallets={wallets} setWallets={setWallets} />
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
                                        onClick={() => handleGameClick("https://ludofam.nixarcade.fun", "0.001")}
                                        style={{ backgroundImage: "url('card1.jpeg')", backgroundSize: "cover" }}
                                    >
                                        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow">
                                            <img className="p-8 rounded-t-lg" src="Ludo.png" alt="Ludo Game" />
                                            <div className="px-5 pb-5 text-center">
                                                <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Ludo Fam, play and win with your friends!!</h5>
                                                <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.001</h5>
                                            </div>
                                        </div>
                                    </div>
                                </TiltWrapper>

                                <TiltWrapper options={{ max: 15, speed: 200 }}>
                                    <div
                                        onClick={() => handleGameClick("https://ttt.nixarcade.fun", "0.001")}
                                        style={{ backgroundImage: "url('card2.jpeg')", backgroundSize: "cover" }}
                                    >
                                        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow">
                                            <img className="p-8 rounded-t-lg" src="tictactoe.png" alt="Tic Tac Toe" />
                                            <div className="px-5 pb-5 text-center">
                                                <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Tic-Tac-Toe, play and win with your friends!!</h5>
                                                <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.001</h5>
                                            </div>
                                        </div>
                                    </div>
                                </TiltWrapper>

                                <TiltWrapper options={{ max: 15, speed: 200 }}>
                                    <div
                                        onClick={() => {
                                            clickRef.current.play();
                                            navigate("/ComingSoon");
                                        }}
                                        style={{ backgroundImage: "url('card3.jpeg')", backgroundSize: "cover" }}
                                    >
                                        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow">
                                            <img className="p-8 rounded-t-lg" src="chess.png" alt="Chess Game" />
                                            <div className="px-5 pb-5 text-center">
                                                <h5 className="font-custom text-xl font-semibold tracking-tight text-custom-dark">Chess, play and win with your friends!!</h5>
                                                <h5 className="font-custom text-3xl font-semibold tracking-tight text-custom-dark">SOL: 0.001</h5>
                                            </div>
                                        </div>
                                    </div>
                                </TiltWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmTransaction}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    )
};
