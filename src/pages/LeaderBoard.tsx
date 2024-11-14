import { useEffect, useState } from "react";
import { MdLeaderboard } from "react-icons/md";
import { getLeaderboard, LeaderboardEntry } from "../utils/getLeaderboard";

export const LeaderBoard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const leaderboardval = await getLeaderboard();
            setLeaderboard(leaderboardval);
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="h-screen w-screen bg-black">
            <div className="py-10 w-full flex flex-row justify-center items-center text-white text-3xl">
                Leaderboard
                <MdLeaderboard />
            </div>
            <div className="mx-16 border p-10 rounded-3xl flex flex-col">
                {leaderboard.map((val, index) => (
                    <div key={index} className="flex flex-row justify-between items-center text-white m-10">
                        <span>{val.email}</span>
                        <span>{val.gamesWon}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
