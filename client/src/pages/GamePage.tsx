import {observer} from "mobx-react-lite";
import {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import appStore from "stores/appStore";

import {User} from "types/params";
import styles from './styles.module.scss'
import {COPY_LABEL, GO_HOME_LABEL, SOCKET_URL} from 'utils/variables';
import {copy} from 'utils/utils';
import {io, Socket} from 'socket.io-client';
import {ClickCount} from 'components/GameDetails/ClickCount';
import {DisplayTimer} from 'components/GameDetails/DisplayTimer';

let socket: Socket;
const GamePage = observer(() => {
    const navigate = useNavigate();

    const {setUsers, users, setGameState, gameIsStarted, user} = appStore
    const {room: roomId, roomLimit, gameDuration, userName} = user
    const [roomUsers, setRoomUsers] = useState<User[]>(users || []);
    const [data, setData] = useState<{ userName: string, text: number }[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(5);
    const [gameTime, setGameTime] = useState<number>(Number(gameDuration) || 10);
    const isTimeUp = timeLeft === 0;
    const gameTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (roomLimit && +roomLimit === roomUsers.length) {
            const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(intervalId);
        }
    }, [roomUsers.length, roomLimit]);

    useEffect(() => {
        if (!gameIsStarted && isTimeUp) setGameState(true);
    }, [isTimeUp, gameIsStarted, setGameState]);

    useEffect(() => {
        if (gameIsStarted) {
            const intervalId = setInterval(() => setGameTime((prev: number) => prev - 1), 1000);
            gameTimeout.current = setTimeout(() => {
                setGameState(false);
                clearInterval(intervalId);
            }, 1000 * Number(gameDuration));
        }
    }, [gameIsStarted, gameDuration, setGameState])

    useEffect(() => {
        socket = io(SOCKET_URL, {transports: ['websocket']});
        const handler = (msg: { userName: string, text: number }) => {
            setData((prev) => [...prev, msg])
        };
        socket.on('message', handler);
        socket.emit('joinRoom', {roomId, userName, roomLimit, gameDuration});
        socket.on('roomUsers', ({room, users}: { room: string, users: User[] }) => {
            setUsers(users)
            setRoomUsers(users);
        });
        return () => {
            socket.disconnect();
        };
    }, [roomId, roomLimit, userName, gameDuration, setUsers]);

    const countHandler = (count: number) => {
        socket.emit('userMsg', count);
    };
    const winner = data.sort((a, b) => b.text - a.text)[0]?.userName;
    const isStartedStyle = gameIsStarted
        ? styles.startGame
        : styles.startGameHidden;

    return (
        <div className={styles.gameWrapper}>
            <div style={{display: 'flex'}}>
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
                    gameStarted={gameIsStarted}
                    countHandler={countHandler}
                />
                <DisplayTimer
                    roomUsers={roomUsers}
                    winner={winner}
                    gameStarted={gameIsStarted}
                    timeLeft={timeLeft}
                    data={data}
                    gameTime={gameTime}
                />
            </div>
        </div>
    );
})

export default GamePage;
