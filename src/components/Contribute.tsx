export const Contribute = () => {
    return (
        <div className="bg-custom-dark py-20">
            <div className="lg:text-center">
                <h2 className="font-custom text-base text-custom-primary font-semibold tracking-wide uppercase">Contribute</h2>
                <p className="font-custom mt-1 max-w-2xl text-xl text-custom-dark lg:mx-auto flex items-center">
                    Raise an issue
                    <a href="https://github.com/NIXBLACK11/Solabule" target="_blank" rel="noopener noreferrer">
                        <img
                            src="github.png"
                            alt="GitHub"
                            className="my-2"
                            style={{ width: "50px" }}
                        />
                    </a>
                    and explain about the game you want to contribute.
                </p>
            </div>
        </div>
    )
}