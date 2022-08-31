import React from 'react';
import styles from '../pages/styles.module.scss';

export default function ListOfUsers({
	index,
	roomId,
	joinToRoom,
	roomLimit,
	users,
}) {
	return (<div className={styles.roomWrapper} key={index} onClick={() => joinToRoom({roomId, roomLimit})}>
		<h3 className={styles.titleForInput}>
			<span className={''}>room of players:</span>
		</h3>
		<dl>
			<dt>{users}</dt>
			<h3>Limit of Players: {roomLimit}</h3>
		</dl>


	</div>);
}

