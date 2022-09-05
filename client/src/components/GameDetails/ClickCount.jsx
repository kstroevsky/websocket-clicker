import React, { useState } from 'react';
import styles from './../../pages/styles.module.scss';

export const ClickCount = ({ countHandler, gameStarted, userName }) => {
	const [count, setCount] = useState(0);
	return (
		<div className={styles.playerInfo}>
			<button
				className={styles.addButton}
				disabled={!gameStarted}
				onClick={() => countHandler(count, setCount)}
			>
				{gameStarted ? 'Add Count' : 'Waiting Players'}
			</button>
			<div className={styles.userName}>
				{userName}: {count}
			</div>
		</div>
	);
};
