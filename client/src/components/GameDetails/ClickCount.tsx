import React, {FC, useState, useEffect} from 'react';
import {ClickCountPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';

export const ClickCount: FC<ClickCountPropsT> = ({
                                                     countHandler,
                                                     gameStarted,
                                                     userName,
                                                     isOnSuperClick,
                                                     handlerSuperClick
                                                 }) => {
    
    const [count, setCount] = useState<number>(0);
    const [showButtonSuperClick, setShowButtonSuperClick] = useState<boolean>(false);

    useEffect(() => {
        if (isOnSuperClick) {
            let timer1 = setTimeout(() => setShowButtonSuperClick(true), 4000);
            return () => {
               clearTimeout(timer1);
            };
        }        
    }, [isOnSuperClick]);
        
    const countIncrement = () => {
        countHandler(count)
        if (showButtonSuperClick) {
            setCount(prev => prev + 10)    
            handlerSuperClick()
            setShowButtonSuperClick(false)
        } else {
            setCount(prev => prev + 1)
        }
        
    }

    return (
        <div className={styles.playerInfo}>
            <button
                className={ showButtonSuperClick ? styles.addSuperClickButton : styles.addButton}                
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
