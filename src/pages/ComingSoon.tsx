import { BackgroundBeams } from "../components/ui/background-beams"

export const ComingSoon = () => {
    return <div className="bg-[#000000] text-white w-screen h-screen flex justify-center items-center">
        <BackgroundBeams className="text-blue-500" />
        <h1 className="text-4xl">Stay tuned🚀</h1>
    </div>
}