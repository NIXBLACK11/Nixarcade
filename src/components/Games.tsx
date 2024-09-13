import React from "react";

export const Games = () => {
    return (
        <div className="py-12 bg-custom-dark m-0 p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-custom-primary font-semibold tracking-wide uppercase">Games</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-custom-dark sm:text-4xl">
                    Some games to play
                </p>
            </div>

            <div className="mt-10">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-custom-dark hover-tilt">
                        <a href="#">
                            <img className="p-8 rounded-t-lg" src="public/Ludo.png" alt="product image" />
                        </a>
                        <div className="px-5 pb-5">
                            <a href="https://www.ludo.com/">
                                <h5 className="text-xl font-semibold tracking-tight text-custom-dark">Ludo Fam, play and win with your friends!!</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};