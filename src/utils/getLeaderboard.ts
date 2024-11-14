import axios from 'axios';

export interface LeaderboardEntry {
    user_id: string;
    email: string;
    address: string;
    gamesWon: number;
    pending_mint: string[];
}

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    try {
        const response = await axios.get('https://nixarcade-backend.vercel.app/user/leaderboard');
        if (response.status === 200) {
            console.log("Leaderboard fetched successfully");
            return response.data as LeaderboardEntry[];
        } else {
            console.log("Failed to fetch leaderboard");
            return [];
        }
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
};
