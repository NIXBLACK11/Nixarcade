import { Login } from "./Login"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-10 m-0 p-0">
            <div className="w-full flex justify-end h-16">
                <div className="mt-4 mr-4">
                    <Login />
                </div>
            </div>
        </nav>
    )
}
