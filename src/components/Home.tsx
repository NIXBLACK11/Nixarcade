import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen relative pt-16 pb-12 bg-custom-dark" style={{ backgroundImage: "url('bg3.jpg')", backgroundSize: "100% 100%" }}>
            <div className="absolute inset-0">
                <div className="animated-bg" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="lg:text-center flex flex-col items-center">
                    <h2 className="text-custom-primary font-semibold tracking-wide uppercase text-4xl">Welcome To</h2>
                    <p className="mt-2 leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl"> 
                        <img
                            src="mainlogo.png"
                            width={500}
                            alt="Logo"
                            />
                    </p>
                    <p className="mt-2 max-w-2xl text-4xl text-custom-dark lg:mx-auto">
                        A place to play all your favourite board games.
                    </p>
                    <div 
                        className="mt-16 text-custom text-white text-2xl border px-8 py-4 flex flex-row hover:bg-[#ca4385] rounded-lg"
                        onClick={() => {
                            navigate("/login");
                        }}    
                        >
                        Login
                        <img
                            src='Google.png'
                            className='w-8 ml-2'
                            />
                    </div>
                </div>
            </div>
        </div>
    );
};