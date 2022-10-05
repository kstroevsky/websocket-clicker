import {observer} from "mobx-react-lite";
import {ChangeEvent, useEffect, useState} from 'react';
import appStore from "stores/appStore";
import {v4 as uuid} from 'uuid';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';
import {FIRE_STYLE_CLASSNAME, START_GAME_LABEL} from 'utils/constants';
import {useGameDetails} from 'hooks/useGameDetails';
import {AddForm} from 'components/GameDetails/AddForm';
import {CreateGameForm} from 'components/GameDetails/CreateGameForm';

export const NewGamePage = observer(() => {

    const {
        setName,
        changeSettingsGame,
        setUrlGame,
        getInfoGame,
        user,
        gameUrl,
        exit
    } = appStore
    const roomId = uuid();
    const [joinUrl, setJoinUrl] = useState(gameUrl);
    const [nameUser, setNameUser] = useState(user.userName);
    const [roomLimit, setRoomLimit] = useState(user.roomLimit);
    const [gameDuration, setGameDuration] = useState(user.gameDuration);
    const {createGame, joinGame} = useGameDetails();
    const navigate = useNavigate();

    useEffect(() => {
        getInfoGame()
    }, [getInfoGame]);
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
    const saveName = () => setName(nameUser)
    const startGame = () => {
        changeSettingsGame(roomId, roomLimit, gameDuration)
        createGame(roomId, nameUser, roomLimit, gameDuration);
    };
    const joinToGame = () => {
        setUrlGame(joinUrl)
        joinGame(joinUrl, nameUser);
    };
    const openList = () => {
        navigate('/rooms', {state: {name: nameUser}});
    };
    return (
        <div className={styles.newGamePageWrapper}>
            {!!user.userName && < button onClick={exit} className={styles.exitBtn}>
                <span
                    className={`${FIRE_STYLE_CLASSNAME} ${styles.exitBtn_text}`}>Exit</span>
            </button>}
            <h1 className={FIRE_STYLE_CLASSNAME}>C L I C K E R</h1>
            {!!user.userName ? (
                <div className={styles.inputsWrapper}>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>CREATE THE GAME</h3>
                        <div className={styles.gameCreateInput}>
                            <CreateGameForm
                                valueRoomLimit={roomLimit}
                                onChangeRoomLimit={onChangeRoomLimitHandler}
                                valueGameDuration={gameDuration}
                                onChangeGameDuration={onChangeGameDurationHandler}
                                disabledBtn={!(nameUser && roomLimit && gameDuration)}
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
                                disabledBtn={nameUser === ''}
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
                            onChangeText={setNameUser}
                            placeholder={'Enter The name'}
                            value={nameUser}
                            type={'text'}
                            disabledBtn={!nameUser}
                            clickHandler={saveName}
                            titleBtn={START_GAME_LABEL}
                        />
                    </div>
                </>
            )}
        </div>
    );
})

