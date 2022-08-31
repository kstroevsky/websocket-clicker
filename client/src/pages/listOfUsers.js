import React from 'react';
import styles from './styles.module.scss';

export default function ListOfUsers({
	index,
	roomId,
	joinToRoom,
	roomLimit,
	users,
}) {
	return (
		<div key={index}>
			<ul>
				<li>
					<h3
						onClick={() => joinToRoom({ roomId, roomLimit })}
						className={styles.titleForInput}
					>
						room of players:
					</h3>
					{users}
					<h4>Limit of Players {roomLimit}</h4>
				</li>
			</ul>
		</div>
	);
}
// roomId, rooms, roomLimit;
