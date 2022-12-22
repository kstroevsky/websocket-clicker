import { useEffect, useState } from "react";

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
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [leftTime, setLeftTime] = useState(ms);

    useEffect(() => {
        if(isTimerStarted) {
            const timerId = setTimeout(() => {
                setIsTimerStarted(false);
                setIsTimerFinished(true);
            }, ms);
            setTimer(timerId);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [isTimerStarted]);

    useEffect(() => {
        if(isTimerStarted) {
            setTimeout(() => {
                setLeftTime(prev => prev - step >= 0 ? prev - step : 0)
            }, step);
        }
    }, [leftTime, isTimerStarted]);

    const startTimer = () => {
        setLeftTime(ms);
        setIsTimerStarted(true);
        setIsTimerFinished(false);
    }

    const finishTimer = () => {
        setIsTimerStarted(false);
        setIsTimerFinished(true);
        clearTimeout(timer);
    }

    return {
        isTimerStarted,
        isTimerFinished,
        leftTime,
        startTimer,
        finishTimer,
    };
}