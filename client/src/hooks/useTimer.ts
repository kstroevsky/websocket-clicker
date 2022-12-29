import { useEffect, useRef, useState } from "react";

type useTimerType = {
    ms: number,
    step?: number,
}

export const useTimer = ({
    ms,
    step = 1000,
}: useTimerType) => {
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [leftTime, setLeftTime] = useState(ms);
    const intervalId = useRef<NodeJS.Timeout>();
    const timer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if(isTimerStarted) {
            timer.current = setTimeout(() => {
                setIsTimerStarted(false);
                setIsTimerFinished(true);
                clearTimeout(timer.current);
            }, leftTime);
        }
        return () => {
            clearTimeout(timer.current);
            clearInterval(intervalId.current);
        }
    }, [isTimerStarted]);

    useEffect(() => {
        if(isTimerStarted) {
            intervalId.current = setInterval(() => {
                setLeftTime(prev => prev - step >= 0 ? prev - step : 0);
                if(leftTime === 0) {
                    clearInterval(intervalId.current);
                }
            }, step);
        }
    }, [isTimerStarted]);
    const startTimer = () => {
        if(leftTime === 0) {
            setLeftTime(ms);
        }
        setIsTimerStarted(true);
        setIsTimerFinished(false);
    }

    const finishTimer = () => {
        setIsTimerStarted(false);
        setIsTimerFinished(true);
        clearTimeout(timer.current);
        clearInterval(intervalId.current);
    }

    const pauseTimer = () => {
        setIsTimerStarted(false);
        setIsTimerFinished(false);
        clearTimeout(timer.current);
        clearInterval(intervalId.current);
        intervalId.current = undefined;
        timer.current = undefined;
    }

    return {
        isTimerStarted,
        isTimerFinished,
        leftTime,
        startTimer,
        finishTimer,
        pauseTimer,
    };
}