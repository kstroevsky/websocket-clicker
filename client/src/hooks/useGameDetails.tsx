import {useNavigate} from 'react-router-dom';

export const useGameDetails = () => {
    const navigate = useNavigate();

    const createGame = (roomId: string, user: string, roomLimit: number, gameDuration: number) => {
        navigate(`/game/${roomId}/${user}/${roomLimit}/${gameDuration}`);
    };
    const joinGame = (joinUrl: string, user: string) => {
        const params = joinUrl.split('/')
        navigate(`/game/${params[4]}/${user}/${params[6]}/${params[7]}`);
    };
    return {
        createGame,
        joinGame,
    };
};
