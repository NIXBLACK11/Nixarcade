import React from "react"

export const Home = () => {
    return (
        <div className="pt-16 pb-12 bg-custom-dark m-0 p-0 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url('/back.jpg')` }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="lg:text-center">
                    <h2 className="text-base text-custom-primary font-semibold tracking-wide uppercase">Welcome</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl">
                        To Solabule
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-custom-dark lg:mx-auto">
                        A place to play all your favourite board games.
                    </p>
                </div>
            </div>
        </div>
    )
}