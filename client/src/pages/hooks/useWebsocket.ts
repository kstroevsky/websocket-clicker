import { useEffect, useRef, useState } from "react";
import { SOCKET_URL } from "../../utils/constants";
import { IUser } from "../../types/params";
import { io, Socket } from 'socket.io-client';
import AppStore from "../../stores/appStore";

let socket: Socket;

export const useWebsocket = (appStore: typeof AppStore) => {
    const {
        users,
        setGameState,
        gameIsStarted,
        user,
        getInfoGame,
    } = appStore;
    const { roomId, roomLimit, gameDuration, userName, game } = user;

    const [data, setData] = useState<{ userName: string, text: number }[]>([]);
    const [roomUsers, setRoomUsers] = useState<IUser[]>(users || []);
    const [typeGame, setTypeGame] = useState('');
    const [superPlayer, setSuperPlayer] = useState('');
    const [superMoment, setSuperMoment] = useState(0);
    const [gameTime, setGameTime] = useState<number>(gameDuration || 10);
    const gameTimeout = useRef<NodeJS.Timeout | null>(null);

    const games: string[] = ['regularGame', 'superGame'];

    let diffStart = 3;
    let diffEnd = 3;

    useEffect(() => {
        getInfoGame()
        setTypeGame(games[Math.floor(Math.random() * games.length)])
    }, []);

    useEffect(() => {
        if(gameIsStarted) {
            if(typeGame === 'superGame') {
                setSuperPlayer(users[Math.floor(Math.random() * users.length)]?.userName)
                let moments: number[] = Array.apply(0, Array(gameDuration - diffStart - diffEnd)).map((_, index) => index + diffStart + 1);
                setSuperMoment(moments[Math.floor(Math.random() * moments.length)])
            }
            const intervalId = setInterval(() => setGameTime((prev: number) => prev - 1), 1000);
            gameTimeout.current = setTimeout(() => {
                setGameState(false);
                clearInterval(intervalId);
            }, 1000 * Number(gameDuration));
        }
    }, [gameIsStarted]);

    useEffect(() => {
        socket = io(SOCKET_URL, { transports: ['websocket'] });
        const handler = (msg: { userName: string, text: number }) => {
            setData((prev) => [...prev, msg])
        };
        socket.on('message', handler);
        socket.emit('joinRoom', { roomId, userName, roomLimit, gameDuration, game });
        socket.on('roomUsers', ({ users }: { roomId: string, users: IUser[] }) => {
            setRoomUsers(users);
        });
        return () => {
            socket.disconnect();
        };
    }, [roomId, roomLimit, userName, gameDuration]);

    return {
        data,
        roomUsers,
        superPlayer,
        superMoment,
        gameTime,
        socket,
    }
}