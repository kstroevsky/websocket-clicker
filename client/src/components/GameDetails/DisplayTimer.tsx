import React, {FC} from 'react';
import {DisplayTimerPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';
import OpponentCounter from 'components/OponentCounter';

export const DisplayTimer: FC<DisplayTimerPropsT> = (props) => {
    const {roomUsers, data, timeLeft, gameStarted, winner, gameTime} = props
    return (
        <>
            {' '}
            <div className={styles.oponentsWrapper}>
                {roomUsers?.map((i, index) => (
                    <OpponentCounter key={index} i={i} data={data}/>
                ))}
            </div>
            <div className={styles.timeLeft}>
                {timeLeft > 0 ? timeLeft : gameTime > 0 ? gameTime : 'Game Over'}
            </div>
            {gameStarted ? (
                <div>{`Current Leader ${winner}`}</div>
            ) : (
                <div className={styles.winnerTitle}>
                    {gameTime === 0 && !gameStarted && `Player ${winner} WIN`}
                </div>
            )}
        </>
    );
};
