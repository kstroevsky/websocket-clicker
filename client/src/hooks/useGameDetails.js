import { useNavigate } from 'react-router-dom';

export const useGameDetails = () => {
	const navigate = useNavigate();
	const createGame = (roomId, user, roomLimit, setUser) => {
		navigate(`/game/${roomId}/${user}/${roomLimit}`);
		setUser('');
	};
	const joinGame = (joinUrl, user, setUser) => {
		navigate(`/game/${joinUrl.split('/')[4]}/${user}/${joinUrl.split('/')[6]}`);
		setUser('');
	};
	return {
		createGame,
		joinGame,
	};
};
