import React from 'react';
import styles from './styles.module.scss'

function CountOfRoom() {
    return (
        <div className={styles.inputs}>
            <h3 className={styles.titleForInput}>List of active games</h3>
            <button className={styles.buttonEnterName}> &#9876;</button>
        </div>
    );
}

export default CountOfRoom;
