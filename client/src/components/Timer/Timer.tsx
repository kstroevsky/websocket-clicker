import React, { FC } from 'react';
import classes from './styles/index.module.scss';
import classNames from "classnames";

type TimerType = {
    time: string;
    label?: string;
    isFinishing?: boolean;
}

export const Timer: FC<TimerType> = ({ time, label, isFinishing = false }) => {
    const timerClasses = classNames(classes.timer, {
        [classes.timer_is_finishing]: isFinishing,
    });

    return (
        <div className={timerClasses}>{label ?? ''} {time}</div>
    );
}