import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ListOfRooms from './ListOfRooms';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../pages/styles.module.scss';

let socket;
export const Rooms = () => {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState({});
	const location = useLocation();
	useEffect(() => {
		socket = io('http://localhost:4000', { transports: ['websocket'] });
		socket.on('allRooms', data => {
			setRooms(data);
			console.log(data);
		});
		return () => {
			socket.disconnect();
			socket.off();
		};
	}, []);

	const joinToRoom = ({ roomId, roomLimit }) => {
		navigate(`/game/${roomId}/${location.state.name}/${roomLimit}`);
	};

	return (
		<div className={styles.newGamePageWrapper}>
			<h3 className={styles.titleForInput}>
				{`${location.state.name}, Chose a game or press button to create new game`}
			</h3>
			<button className={styles.buttonEnterName} onClick={() => navigate('/')}>
				&#9876;
			</button>
			{!!rooms &&
				Object.keys(rooms).map((key, index) => {
					const roomLimit = rooms[key][0].roomLimit;
					const users = rooms[key].map(n => (
						<ul key={n.id}>
							<li>{n.userName}</li>
						</ul>
					));
					return (
						<div key={index}>
							<ListOfRooms
								key={index}
								joinToRoom={joinToRoom}
								roomId={key}
								roomLimit={roomLimit}
								users={users}
							/>
						</div>
					);
				})}
		</div>
	);
};
