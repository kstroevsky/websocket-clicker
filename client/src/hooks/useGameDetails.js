import { useNavigate } from 'react-router-dom';

export const useGameDetails = () => {
	const navigate = useNavigate();
	const createGame = (roomId, user, roomLimit, gameDuration) => {
		navigate(`/game/${roomId}/${user}/${roomLimit}/${gameDuration}`);
	};
	const joinGame = (joinUrl, user) => {
		navigate(`/game/${joinUrl.split('/')[4]}/${user}/${joinUrl.split('/')[6]}`);
	};
	return {
		createGame,
		joinGame,
	};
};
