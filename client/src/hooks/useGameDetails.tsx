import { useNavigate } from 'react-router-dom';
import { Game } from "../types/gameTypes";

export const useGameDetails = () => {
    const navigate = useNavigate();
    const createGame = (roomId: string, user: string, roomLimit: number, gameDuration: number, game?: string) =>
        navigate(`/${game ?? Game.Clicker}/${roomId}/${user}/${roomLimit}/${gameDuration}`);
    const joinGame = (joinUrl: string, user: string) => {
        const params = joinUrl.split('/')
        navigate(`/${params[3]}/${params[4]}/${user}/${params[6]}/${params[7]}`);
    };
    return {
        createGame,
        joinGame,
    };
};
