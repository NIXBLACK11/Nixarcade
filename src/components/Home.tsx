import { FaGithub, FaTwitter } from "react-icons/fa";

export const Home = () => {
    return (
        <div className="h-screen w-screen pt-16 pb-12 bg-custom-dark flex flex-wrap" style={{ backgroundImage: "url('bg3.jpg')", backgroundSize: "auto", backgroundRepeat: "repeat-y" }}>

            <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center flex-col text-center">
                <h2 className="font-custom text-custom-primary text-4xl m-4">Welcome To</h2>
                <h2 className="font-custom text-custom-primary text-8xl m-4">NIXARCADE</h2>
                <p className="font-custom m-4 max-w-2xl text-4xl text-custom-dark lg:mx-auto">
                    Your Hub for Classic Board Games, Anytime, Anywhere.
                </p>
                <div className="flex flex-row">
                    <FaGithub className="m-8 text-[#6B7280] text-4xl hover:text-black" onClick={() => {window.open("https://github.com/NIXBLACK11/Nixarcade", "_blank")}}/>
                    <FaTwitter className="m-8 text-[#6B7280] text-4xl hover:text-black" onClick={() => {window.open("https://x.com/NIXARCADE", "_blank")}}/>
                </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center flex-col">
                <img
                    src="mainlogo.png"
                    className="img-hover"
                    width={600}
                    alt="Logo"
                />
            </div>
            {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center flex flex-col items-center">
                    <h2 className="font-custom text-custom-primary font-semibold tracking-wide uppercase text-4xl mt-20">Welcome To</h2>
                    <p className="mt-2 leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl"> 
                        <img
                            src="mainlogo.png"
                            width={500}
                            alt="Logo"
                            />
                    </p>
                    <p className="font-custom mt-2 max-w-2xl text-4xl text-custom-dark lg:mx-auto">
                        A place to play all your favourite board games.
                    </p>
                </div>
            </div> */}
        </div>
    );
};