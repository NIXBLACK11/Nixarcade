import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

export const Home: React.FC = () => {
    const [_viewNFT, setViewNFT] = useState<boolean>(false);

    const scrollToGames = () => {
        const gamesSection = document.getElementById('Games');
        if (gamesSection) {
            gamesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative pt-16 pb-12 bg-custom-dark h-screen overflow-hidden">
            <style>{`
                @keyframes slideBackground {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animated-bg {
                    animation: slideBackground 60s linear infinite;
                    width: 200%;
                    height: 100%;
                    background-image: url('full.jpg');
                    background-repeat: repeat-x;
                    background-size: 50% 100%;
                }
            `}</style>
            <div className="absolute inset-0">
                <div className="animated-bg" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="lg:text-center flex flex-col items-center">
                    <h2 className="text-red-500 font-semibold tracking-wide uppercase text-4xl">Currently in developemtn</h2>                    
                    <h2 className="text-custom-primary font-semibold tracking-wide uppercase text-4xl">Welcome To</h2>
                    <p className="mt-2 leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl"> 
                        <img
                            src="logo2.png"
                            width={500}
                            alt="Logo"
                        />
                    </p>
                    <p className="mt-2 max-w-2xl text-4xl text-custom-dark lg:mx-auto">
                        A place to play all your favourite board games.
                    </p>
                    <div className="mt-16">
                        <WalletConnect setViewNFT={setViewNFT}/>
                    </div>
                </div>
            </div>
            <div 
                className="absolute bottom-8 left-0 right-0 flex justify-center items-center cursor-pointer animate-bounce z-10"
                onClick={scrollToGames}
            >
                <ChevronDown size={48} color="white" />
            </div>
        </div>
    );
};