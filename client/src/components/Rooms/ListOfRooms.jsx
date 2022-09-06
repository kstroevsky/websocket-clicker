import React from 'react';
import styles from '../../pages/styles.module.scss';

export default function ListOfRooms({
	index,
	roomId,
	joinToRoom,
	roomLimit,
	users,
	players,
}) {
	const isFullStyle =
		roomLimit > players ? styles.roomWrapper : styles.fullRoom;
	const title = roomLimit > players ? `Let's go to play with:` : 'Game started';

	return (
		<div
			className={isFullStyle}
			key={index}
			onClick={() => joinToRoom({ roomId, roomLimit, players })}
		>
			<h3 className={styles.roomTitle}>
				<span>{title} </span>
			</h3>
			<dl>
				<dt>{users}</dt>
				<h3>Limit of Players: {roomLimit}</h3>
			</dl>
		</div>
	);
}
