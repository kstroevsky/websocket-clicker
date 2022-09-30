import {ChangeEvent, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';
import {START_GAME_LABEL} from 'utils/variables';
import {useGameDetails} from '../hooks/useGameDetails';
import {AddForm} from 'components/GameDetails/AddForm';
import {CreateGameForm} from 'components/GameDetails/CreateGameForm';

function NewGamePage() {
    const roomId = uuid();
    const [user, setUser] = useState('');
    const [joinUrl, setJoinUrl] = useState('');
    const [roomLimit, setRoomLimit] = useState(0);
    const [gameDuration, setGameDuration] = useState<number>(0);
    const [nameEntered, setNameEntered] = useState(false);

    const {createGame, joinGame} = useGameDetails();
    const navigate = useNavigate();

    const onChangeRoomLimitHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.currentTarget.value)
        switch (true) {
            case inputValue < 2:
                setRoomLimit(2);
                break;
            case inputValue > 5:
                setRoomLimit(5);
                break;
            default:
                setRoomLimit(inputValue);
        }
    };

    const onChangeGameDurationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.currentTarget.value)
        switch (true) {
            case inputValue < 10:
                setGameDuration(10);
                break;
            case inputValue > 60:
                setGameDuration(60);
                break;
            default:
                setGameDuration(inputValue);
        }
    };

    const isName = () => setNameEntered(prev => !prev);
    const startGame = () => {
        createGame(roomId, user, roomLimit, gameDuration);
        setUser('');
    };
    const joinToGame = () => {
        joinGame(joinUrl, user);
        setUser('');
    };
    const openList = () => {
        navigate('/rooms', {state: {name: user}});
    };
    return (
        <div className={styles.newGamePageWrapper}>
            <h1 className="font-effect-fire-animation">C L I C K E R</h1>

            {nameEntered ? (
                <div className={styles.inputsWrapper}>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>CREATE THE GAME</h3>
                        <div className={styles.gameCreateInput}>
                            <CreateGameForm
                                valueRoomLimit={roomLimit}
                                onChangeRoomLimit={onChangeRoomLimitHandler}
                                valueGameDuration={gameDuration}
                                onChangeGameDuration={onChangeGameDurationHandler}
                                disabledBtn={!(user && roomLimit && gameDuration)}
                                clickHandler={startGame}
                                titleBtn={START_GAME_LABEL}
                            />
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>List of active games</h3>
                        <button onClick={openList} className={styles.buttonEnterName}>
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
            ) : (
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
            )}
        </div>
    );
}

export default NewGamePage;