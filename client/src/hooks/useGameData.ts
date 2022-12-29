import AppStore from "../stores/appStore";
import { useWebsocket } from "./useWebsocket";
import { useTimer } from "./useTimer";
import { useEffect } from "react";

export const useGameData = (appStore: typeof AppStore) => {
    const {
        data,
        roomUsers,
        gameTime,
        socket,
    } = useWebsocket(appStore);
    const { roomLimit } = appStore.user;
    const { startTimer, leftTime, isTimerFinished, isTimerStarted, pauseTimer } = useTimer({ ms: gameTime * 1000 });
    const {
        startTimer: startPreTimer,
        leftTime: leftPreTime,
        isTimerFinished: isPreTimerFinished,
        isTimerStarted: isPreTimerStarted,
    } = useTimer({ ms: 5000 });

    useEffect(() => {
        roomLimit && +roomLimit === roomUsers.length && startPreTimer();
    }, [roomUsers.length, roomLimit]);

    useEffect(() => {
        leftPreTime === 0 && startTimer();
    }, [leftPreTime]);
    return {
        data,
        roomUsers,
        leftTimeOfGame: leftTime,
        isGameStarted: isTimerStarted,
        isGameFinished: isTimerFinished,
        pauseGame: pauseTimer,
        startGame: startTimer,
        isPreTimerStarted,
        isPreTimerFinished,
        leftPreTime,
        socket,
    }
}