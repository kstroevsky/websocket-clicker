import React from 'react';
import styles from './../../pages/styles.module.scss';
import OpponentCounter from './../OponentCounter/index';

export const DisplayTimer = ({
	roomUsers,
	data,
	timeLeft,
	gameStarted,
	winner,
}) => {
	return (
		<>
			{' '}
			<div className={styles.oponentsWrapper}>
				{roomUsers?.map((i, index) => (
					<OpponentCounter key={index} i={i} data={data} />
				))}
			</div>
			<div className={styles.timeLeft}>
				{timeLeft > 0 ? timeLeft : 'Game Over'}
			</div>
			{gameStarted ? (
				<div>Current Leader {winner}</div>
			) : (
				<div className={styles.winnerTitle}>
					{timeLeft === 0 && !gameStarted && `Player ${winner} WIN`}
				</div>
			)}
		</>
	);
};
