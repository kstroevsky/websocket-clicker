import OpponentCounter from 'components/OponentCounter';
import { FC } from 'react';
import { DisplayTimerPropsT } from "types/components";
import { Timer } from "../Timer";
import styles from './../../pages/styles.module.scss';

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
                <Timer time={`${timeLeft}`} isFinishing={timeLeft <= 3}/>
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

