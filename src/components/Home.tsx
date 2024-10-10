export const Home = () => {
    return (
        <div className="h-screen relative pt-16 pb-12 bg-custom-dark" style={{ backgroundImage: "url('bg3.jpg')", backgroundSize: "100% 100%" }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center flex flex-col items-center">
                    <h2 className="font-custom text-custom-primary font-semibold tracking-wide uppercase text-4xl mt-4">Welcome To</h2>
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
            </div>
        </div>
    );
};