export const Navbar = () => {
    return (
        <nav className="bg-transparent fixed top-0 left-0 w-full z-10 m-0 p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-custom-primary">
                                <img
                                    src="logo2.png"
                                    width="100px"
                                />
                            </span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a
                                href="#Home"
                                className="border-transparent text-custom-dark hover:border-custom-gray hover:text-custom-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:text-green-300"
                            >
                                Home
                            </a>
                            <a
                                href="#Games"
                                className="border-transparent text-custom-dark hover:border-custom-gray hover:text-custom-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:text-green-300"
                            >
                                Games
                            </a>
                            <a
                                href="#Contribute"
                                className="border-transparent text-custom-dark hover:border-custom-gray hover:text-custom-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:text-green-300"
                            >
                                Contribute
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-custom-primary">
                            Powered by
                            <img
                                src="Size=96, Color=color-white.svg"
                                style={{width: "150px"}}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}