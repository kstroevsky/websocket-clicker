import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import styles from './../../pages/styles.module.scss';
import OpponentCounter from './../OponentCounter/index';

export const DisplayTimer = ({
	roomUsers,
	data,
	timeLeft,
	gameStarted,
	winner,
  gameTime,
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
				{timeLeft > 0 ? timeLeft : gameTime > 0 ? gameTime : 'Game Over' }
			</div>
			{gameStarted ? (
				<div>Current Leader {winner}</div>
			) : (
				<div className={styles.winnerTitle}>
					{gameTime === 0 && !gameStarted && `Player ${winner} WIN`}
				</div>
			)}
		</>
	);
};
