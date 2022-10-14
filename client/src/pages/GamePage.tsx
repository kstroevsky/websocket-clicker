import {observer} from "mobx-react-lite";
import {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import appStore from "stores/appStore";
import {IUser} from "types/params";
import styles from './styles.module.scss'
import {COPY_LABEL, GO_HOME_LABEL, SOCKET_URL} from 'utils/constants';
import {copy} from 'utils/utils';
import {io, Socket} from 'socket.io-client';
import {ClickCount} from 'components/GameDetails/ClickCount';
import {DisplayTimer} from 'components/GameDetails/DisplayTimer';

let socket: Socket;
const GamePage = observer(() => {
    const navigate = useNavigate();
    const {
        setUsers,
        users,
        setGameState,
        gameIsStarted,
        user,
        getInfoGame
    } = appStore

    const {roomId, roomLimit, gameDuration, userName} = user
    const [roomUsers, setRoomUsers] = useState<IUser[]>(users || []);
    const [data, setData] = useState<{ userName: string, text: number }[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(5);
    const [gameTime, setGameTime] = useState<number>(gameDuration || 10);
    const [modeSuperClick, setModeSuperClick] = useState<boolean>(false);
    
    const isTimeUp = timeLeft === 0;
    const gameTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        getInfoGame()
    }, []);
    
    useEffect(() => {
        if (roomLimit && +roomLimit === roomUsers.length) {
            const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(intervalId);
        }
    }, [roomUsers.length, roomLimit]);
    
    useEffect(() => {
        if (!gameIsStarted && isTimeUp) setGameState(true);
    }, [isTimeUp, gameIsStarted]);
    
    useEffect(() => {
        if (gameIsStarted) {
            Math.random() < 0.5 ? setModeSuperClick(false) : setModeSuperClick(true)
            const intervalId = setInterval(() => setGameTime((prev: number) => prev - 1), 1000);
            gameTimeout.current = setTimeout(() => {
                setGameState(false);
                clearInterval(intervalId);
            }, 1000 * Number(gameDuration));
        }
    }, [gameIsStarted])

    useEffect(() => {
        socket = io(SOCKET_URL, {transports: ['websocket']});
        const handler = (msg: { userName: string, text: number }) => {
            setData((prev) => [...prev, msg])
        };
        socket.on('message', handler);
        socket.emit('joinRoom', {roomId, userName, roomLimit, gameDuration});
        socket.on('roomUsers', ({roomId, users}: { roomId: string, users: IUser[] }) => {
            setUsers(users)
            setRoomUsers(users);
            
        });
        return () => {
            socket.disconnect();
        };
    }, [roomId, roomLimit, userName, gameDuration]);

    const countHandler = (count: number) => {
        socket.emit('userMsg', count);
    };

    const handlerSuperClick = () => {
        setModeSuperClick(false)
    }

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
                    isOnSuperClick={modeSuperClick}
                    handlerSuperClick={handlerSuperClick}
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