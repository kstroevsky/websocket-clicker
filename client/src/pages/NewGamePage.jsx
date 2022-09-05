import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { START_GAME_LABEL } from '../utils/variables';
import { useGameDetails } from '../hooks/useGameDetails';
import { AddForm } from './../components/GameDetails/AddForm';

function NewGamePage() {
	const roomId = uuid();
	const [user, setUser] = useState('');
	const [joinUrl, setJoinUrl] = useState('');
	const [roomLimit, setRoomLimit] = useState(2);
	const [nameEntered, setNameEntered] = useState(false);

	const { createGame, joinGame } = useGameDetails();
	const navigate = useNavigate();

	const onChangeHandler = e => {
		switch (e.currentTarget.value) {
			case e.currentTarget.value < 2:
				setRoomLimit(2);
				break;
			case e.currentTarget.value > 5:
				setRoomLimit(5);
				break;
			default:
				setRoomLimit(e.currentTarget.value);
		}
	};
	const isName = () => setNameEntered(prev => !prev);
	const startGame = () => createGame(roomId, user, roomLimit, setUser);
	const joinToGame = () => joinGame(joinUrl, user, setUser);
	const openList = () => {
		navigate('/rooms', { state: { name: user } });
	};

	return (
		<div className={styles.newGamePageWrapper}>
			<h1 className="font-effect-fire-animation">C L I C K E R</h1>

			{!nameEntered ? (
				<>
					<div className={styles.nameInput}>
						<AddForm
							onChangeText={setUser}
							placeholder={'Enter The name'}
							value={user}
							type={'text'}
							disabledBtn={user === ''}
							clickHandler={isName}
							titleBtn={START_GAME_LABEL}
						/>
					</div>
				</>
			) : (
				<div className={styles.inputsWrapper}>
					<div className={styles.inputs}>
						<h3 className={styles.titleForInput}>CREATE THE GAME</h3>
						<div className={styles.nameInput}>
							<AddForm
								onChangeText={onChangeHandler}
								placeholder={'Enter The Max players'}
								value={roomLimit}
								type={'number'}
								min={2}
								max={5}
								disabledBtn={user === ''}
								clickHandler={startGame}
								titleBtn={START_GAME_LABEL}
							/>
						</div>
					</div>
					<div className={styles.inputs}>
						<h3 className={styles.titleForInput}>List of active games</h3>
						<button onClick={openList} className={styles.buttonEnterName}>
							{' '}
							{START_GAME_LABEL}
						</button>
					</div>
					<div className={styles.inputs}>
						<h3 className={styles.titleForInput}>JOIN THE GAME</h3>
						<div className={styles.nameInput}>
							<AddForm
								onChangeText={setJoinUrl}
								placeholder={'ADD HTTP'}
								value={joinUrl}
								type={'text'}
								disabledBtn={user === ''}
								clickHandler={joinToGame}
								titleBtn={START_GAME_LABEL}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default NewGamePage;
