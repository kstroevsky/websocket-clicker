import React, { FC } from 'react';
import { DisplayTimerPropsT } from "types/components";
import styles from './../../pages/styles.module.scss';
import OpponentCounter from 'components/OponentCounter';
import { Timer } from "../Timer";

export const DisplayTimer: FC<DisplayTimerPropsT> = ({
    roomUsers, data, timeLeft, gameStarted, winner, gameTime,
}) => (
    <>
        <div className={styles.oponentsWrapper}>
            {roomUsers?.map((i, index) => (
                <OpponentCounter key={index} i={i} data={data}/>
            ))}
        </div>
        <div className={styles.timeLeft}>
            {timeLeft > 0 ? (
                <Timer time={timeLeft * 1000}/>
            ) : gameTime > 0 ? gameTime : 'Game Over'}
        </div>
        <div className={styles.winnerTitle}>
            {winner.length !== 0 && (gameStarted ?
                winner.length === 1 ?
                    `Current Leader is ${winner[0]}`
                    : `Current Leaders are ${winner.join(', ')}`
                : gameTime === 0 &&
                (winner.length === 1 ? `Player ${winner[0]} WIN` : `Players ${winner.join(', ')} WIN`))}
        </div>
    </>
);

