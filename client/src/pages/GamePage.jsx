import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import OpponentCounter from '../components/OponentCounter';
import { COPY_LABEL, GO_HOME_LABEL, SOCKET_URL } from '../utils/variables';
import { copy } from '../utils/utils';
import { io } from 'socket.io-client';
import { ClickCount } from '../components/ClickCount';

let socket;
function GamePage() {
	const navigate = useNavigate();
	const { roomId, userName, roomLimit } = useParams();
	const [roomUsers, setRoomUsers] = useState([]);
	const [data, setData] = useState([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [timeLeft, setTimeLeft] = useState(5);

	useEffect(() => {
		const isTimeUp = timeLeft === 0;
		switch (true) {
			case gameStarted && isTimeUp:
				setGameStarted(false);
				break;
			case +roomLimit === roomUsers.length:
				const intervalId = setInterval(() => {
					setTimeLeft(prev => prev - 1);
				}, 1000);
				if (!gameStarted && isTimeUp) {
					setGameStarted(true);
					setTimeLeft(10);
				}
				return () => clearInterval(intervalId);
			default:
				setGameStarted(false);
		}
	}, [gameStarted, roomLimit, roomUsers, timeLeft]);

	useEffect(() => {
		socket = io(SOCKET_URL, { transports: ['websocket'] });
		const handler = msg => setData(prev => [...prev, msg]);
		socket.on('message', handler);
		socket.emit('joinRoom', { roomId, userName, roomLimit });
		socket.on('roomUsers', ({ room, users }) => {
			setRoomUsers(users);
		});
		return () => {
			socket.disconnect();
		};
	}, [roomId, roomLimit, userName]);

	const countHandler = (count, setCount) => {
		socket.emit('userMsg', count);
		setCount(prev => prev + 1);
	};
	const winner = data.sort((a, b) => b.text - a.text)[0]?.userName;

	return (
		<div className={styles.gameWrapper}>
			<div style={{ dislplay: 'flex' }}>
				<button
					title="COPY"
					className={styles.buttonEnterName}
					onClick={() => copy()}
				>
					{COPY_LABEL}
				</button>
				<button
					title="GO HOME"
					className={styles.buttonEnterName}
					onClick={() => navigate('/')}
				>
					{GO_HOME_LABEL}
				</button>
			</div>
			<div className={gameStarted ? styles.startGame : styles.startGameHidden}>
				GO
			</div>
			<div>
				<ClickCount
					userName={userName}
					gameStarted={gameStarted}
					countHandler={countHandler}
				/>
				<div className={styles.oponentsWrapper}>
					{roomUsers.map((i, index) => (
						<OpponentCounter key={index} i={i} data={data} />
					))}
				</div>
				<div className={styles.timeLeft}>
					{timeLeft > 0 ? timeLeft : 'Game Over'}
				</div>
				{gameStarted ? (
					<div>Current Leader {winner}</div>
				) : (
					<div className={styles.winnerTitle}>
						{timeLeft === 0 && !gameStarted && `Player ${winner} WIN`}
					</div>
				)}
			</div>
		</div>
	);
}

export default GamePage;
