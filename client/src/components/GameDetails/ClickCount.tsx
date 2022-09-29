import React, {FC, useState} from 'react';
import {ClickCountPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';

export const ClickCount: FC<ClickCountPropsT> = ({
                                                     countHandler,
                                                     gameStarted,
                                                     userName
                                                 }) => {
    const [count, setCount] = useState<number>(0);
    const countIncrement = () => {
        countHandler(count)
        setCount(prev => prev + 1)
    }
    return (
        <div className={styles.playerInfo}>
            <button
                className={styles.addButton}
                disabled={!gameStarted}
                onClick={countIncrement}
            >
                {gameStarted ? 'Add Count' : 'Waiting Players'}
            </button>
            <div className={styles.userName}>
                {userName}: {count}
            </div>
        </div>
    );
};
