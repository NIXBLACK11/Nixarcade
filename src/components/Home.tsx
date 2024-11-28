import { FaGithub, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";

export const Home = () => {
    const [logoIndex, setLogoIndex] = useState(0);

    const content = [
        {
            logo: "mainlogo.png",
            title: "NIXARCADE",
            description: "Your Hub for Classic Board Games, Anytime, Anywhere.",
        },
        {
            logo: "Ludo.png",
            title: "LUDO",
            description: "Roll the dice and relive the nostalgia of Ludo.",
        },
        {
            logo: "tictactoe.png",
            title: "TIC TAC TOE",
            description: "Think, strategize, and win the ultimate X-O battle.",
        },
        {
            logo: "s&l.png",
            title: "SNAKE & LADDER",
            description: "Climb the ladders, avoid the snakes, and win the race!",
        },
    ];

    useEffect(() => {
        const handleScroll = (event: { deltaY: number }) => {
            if (event.deltaY > 0) {
                setLogoIndex((prevIndex) => (prevIndex + 1) % content.length);
            } else {
                setLogoIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
            }
        };

        window.addEventListener("wheel", handleScroll);

        return () => window.removeEventListener("wheel", handleScroll);
    }, [content.length]);

    return (
        <div
            className="h-screen w-screen pt-16 pb-12 bg-custom-dark flex flex-wrap"
            style={{
                backgroundImage: "url('bg3.jpg')",
                backgroundSize: "auto",
                backgroundRepeat: "repeat-y",
            }}
        >
            <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center flex-col text-center">
                <h2 className="font-custom text-custom-primary text-4xl m-4">Welcome To</h2>
                <h2 className="font-custom text-custom-primary text-8xl m-4">
                    {content[logoIndex].title}
                </h2>
                <p className="font-custom m-4 max-w-2xl text-4xl text-custom-dark lg:mx-auto">
                    {content[logoIndex].description}
                </p>
                <div className="flex flex-row">
                    <FaGithub
                        className="m-8 text-[#6B7280] text-4xl hover:text-black"
                        onClick={() => {
                            window.open("https://github.com/NIXBLACK11/Nixarcade", "_blank");
                        }}
                    />
                    <FaTwitter
                        className="m-8 text-[#6B7280] text-4xl hover:text-black"
                        onClick={() => {
                            window.open("https://x.com/NIXARCADE", "_blank");
                        }}
                    />
                </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center flex-col">
                <img
                    src={content[logoIndex].logo}
                    className="img-hover"
                    width={500}
                    alt="Logo"
                />
            </div>
        </div>
    );
};
