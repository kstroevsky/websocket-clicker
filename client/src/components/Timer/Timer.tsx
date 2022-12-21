import React, { FC } from 'react';
import classes from './styles/index.module.scss';
import classNames from "classnames";

type TimerType = {
    time: number;
}

export const Timer: FC<TimerType> = ({
    time,
}) => {
    const timerClasses = classNames(classes.timer, {
        [classes.timer_is_finishing]: time <= 3000,
    });

    return (
        <div className={timerClasses}>{time/1000}s</div>
    );
}