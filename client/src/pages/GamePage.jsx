import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { COPY_LABEL, GO_HOME_LABEL, SOCKET_URL } from '../utils/variables';
import { copy } from '../utils/utils';
import { io } from 'socket.io-client';
import { ClickCount } from './../components/GameDetails/ClickCount';
import { DisplayTimer } from './../components/GameDetails/DisplayTimer';

let socket;
function GamePage() {
	const navigate = useNavigate();
	const { roomId, userName, roomLimit, gameDuration } = useParams();
	const [roomUsers, setRoomUsers] = useState([]);
	const [data, setData] = useState([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [timeLeft, setTimeLeft] = useState(5);
  const [gameTime, setGameTime] = useState(gameDuration);

  const isTimeUp = timeLeft === 0;
  const gameTimeout = useRef(null);

  useEffect(() => {
    if (+roomLimit === roomUsers.length) {
        const intervalId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [roomUsers.length, roomLimit]);

  useEffect(() => {
    if (!gameStarted && isTimeUp) {
      setGameStarted(true);
    }
  }, [isTimeUp]);

  useEffect(() => {
      if (gameStarted) {
        const intervalId = setInterval(() => {
          setGameTime(prev => prev - 1);
        }, 1000);
  
        gameTimeout.current = setTimeout(() => {
          setGameStarted(false);
           clearInterval(intervalId);
        }, 1000 * gameDuration);
      }
    }, [gameStarted])

	useEffect(() => {
		socket = io(SOCKET_URL, { transports: ['websocket'] });
		const handler = msg => setData(prev => [...prev, msg]);
		socket.on('message', handler);
		socket.emit('joinRoom', { roomId, userName, roomLimit, gameDuration });
		socket.on('roomUsers', ({ room, users }) => {
			setRoomUsers(users);
		});
		return () => {
			socket.disconnect();
		};
	}, [roomId, roomLimit, userName, gameDuration]);

	const countHandler = (count, setCount) => {
		socket.emit('userMsg', count);
		setCount(prev => prev + 1);
	};
	const winner = data.sort((a, b) => b.text - a.text)[0]?.userName;
	const isStartedStyle = gameStarted
		? styles.startGame
		: styles.startGameHidden;

	return (
		<div className={styles.gameWrapper}>
			<div style={{ display: 'flex' }}>
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
			<div className={isStartedStyle}>GO</div>
			<div>
				<ClickCount
					userName={userName}
					gameStarted={gameStarted}
					countHandler={countHandler}
				/>
				<DisplayTimer
					roomUsers={roomUsers}
					winner={winner}
					gameStarted={gameStarted}
					timeLeft={timeLeft}
					data={data}
          gameTime={gameTime}
				/>
			</div>
		</div>
	);
}

export default GamePage;
