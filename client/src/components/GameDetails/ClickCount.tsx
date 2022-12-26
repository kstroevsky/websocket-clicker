import React, {FC, useState, useEffect} from 'react';
import {ClickCountPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';

export const ClickCount: FC<ClickCountPropsT> = ({
    countHandler,
    gameStarted,
    userName,
    superPlayer,
    superMoment,
}) => {
    const [count, setCount] = useState<number>(0);
    const [showButtonSuperClick, setShowButtonSuperClick] = useState<boolean>(false);   
    
    useEffect(() => {
        if (superPlayer == userName) {
            let delayShow = setTimeout(() => setShowButtonSuperClick(true), superMoment * 1000);
            return () => {
               clearTimeout(delayShow);
            };
        }        
    }, [superPlayer, superMoment]);
            
    const countIncrement = () => {
        countHandler(count)
        if (showButtonSuperClick) {
            setCount(prev => prev + 10)
            setShowButtonSuperClick(false)
        } else {
            setCount(prev => prev + 1)
        }
        
    }

    return (
        <div className={styles.playerInfo}>
            <button
                className={ styles[superPlayer && showButtonSuperClick ? 'addSuperClickButton' : 'addButton']}                
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