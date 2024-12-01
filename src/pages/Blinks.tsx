import { useRef } from "react";
import TiltWrapper from "../components/TiltWrapper";
import { BackgroundBeams } from "../components/ui/background-beams";

export const Blinks = () => {
    const clickRef = useRef(new Audio("click.wav"));

    return (
        <div className="h-screen w-screen">
            <BackgroundBeams className="text-blue-500" />
            <div className="pb-12 bg-custom-dark m-0 p-0 min-h-screen w-screen ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="font-custom text-base text-custom-primary font-semibold tracking-wide uppercase">Blinks</h2>
                            <p className="font-custom mt-2 text-3xl leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl">
                                Some blinks to play
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 mb-8 grid-cols-2 lg:grid-cols-3">
                                <TiltWrapper options={{ max: 15, speed: 200 }} className="lg:m-0 md:m-0 m-8">
                                    <div 
                                        className="w-full border border-gray-200 rounded-lg shadow"
                                        style={{
                                            backgroundImage: "url('card4.jpeg')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            clickRef.current.play();
                                            window.open(
                                                "https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fqwerty.nixblack.site%2Fapi%2Factions%2Fcreate-game&cluster=devnet", 
                                                "_blank"
                                            );
                                        }}
                                    >
                                        <img className="p-8 rounded-t-lg" src="qwerty.png" alt="Ludo Game" />
                                        <div className="px-5 pb-5 text-center">
                                            <h5 className="font-custom text-4xl font-semibold tracking-tight text-white">QWERTY</h5>
                                        </div>
                                    </div>
                                </TiltWrapper>
                                
                                <TiltWrapper options={{ max: 15, speed: 200 }} className="lg:m-0 md:m-0 m-8">
                                    <div 
                                        className="w-full border border-gray-200 rounded-lg shadow"
                                        style={{
                                            backgroundImage: "url('card2.jpeg')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            clickRef.current.play();
                                            window.open(
                                                "https://dial.to/?action=solana-action:https://roulette.nixblack.site/api/actions/create-roulette&cluster=devnet", 
                                                "_blank"
                                            );
                                        }}
                                    >
                                        <img className="p-8 rounded-t-lg" src="roulette.png" alt="Ludo Game" />
                                        <div className="px-5 pb-5 text-center">
                                        <h5 className="font-custom text-4xl font-semibold tracking-tight text-white">Roulette</h5>                                        </div>
                                    </div>
                                </TiltWrapper>

                                <TiltWrapper options={{ max: 15, speed: 200 }} className="lg:m-0 md:m-0 m-8">
                                    <div 
                                        className="w-full border border-gray-200 rounded-lg shadow"
                                        style={{
                                            backgroundImage: "url('card4.jpeg')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            clickRef.current.play();
                                            window.open(
                                                "https://dial.to/?action=solana-action:https://scramble.nixblack.site/api/actions/create-roulette&cluster=devnet", 
                                                "_blank"
                                            );
                                        }}
                                    >
                                        <img className="p-8 rounded-t-lg" src="scramble.gif" alt="Ludo Game" />
                                        <div className="px-5 pb-5 text-center">
                                        <h5 className="font-custom text-4xl font-semibold tracking-tight text-white">Scramble</h5>                                        </div>
                                    </div>
                                </TiltWrapper>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};