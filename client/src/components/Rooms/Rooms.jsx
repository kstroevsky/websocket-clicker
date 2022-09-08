import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ListOfRooms from './ListOfRooms';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../pages/styles.module.scss';
import { SOCKET_URL, START_GAME_LABEL } from '../../utils/variables';
import { useGameDetails } from './../../hooks/useGameDetails';

let socket;
export const Rooms = () => {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState({});
	const location = useLocation();
	const { createGame } = useGameDetails();
	useEffect(() => {
		socket = io(SOCKET_URL, { transports: ['websocket'] });
		socket.on('allRooms', data => {
			setRooms(data);
		});
		return () => {
			socket.disconnect();
			socket.off();
		};
	}, []);

	const joinToRoom = ({ roomId, roomLimit, players }) => {
		roomLimit > players && createGame(roomId, location.state.name, roomLimit);
	};

	return (
		<div className={styles.newGamePageWrapper}>
			<h3 className={styles.titleForInput}>
				{`${location.state.name}, Chose a game or press button to create new game`}
			</h3>
			<button className={styles.buttonEnterName} onClick={() => navigate('/')}>
				{START_GAME_LABEL}
			</button>
			<div style={{ display: 'flex' }}>
				{!!rooms &&
					Object.keys(rooms).map((key, index) => (
						<div key={index}>
							<ListOfRooms
								players={rooms[key].length}
								key={index}
								joinToRoom={joinToRoom}
								roomId={key}
								roomLimit={rooms[key][0].roomLimit}
								users={rooms[key].map(room => (
									<ul key={room.id}>
										<li>{room.userName}</li>
									</ul>
								))}
							/>
						</div>
					))}
			</div>
		</div>
	);
};
