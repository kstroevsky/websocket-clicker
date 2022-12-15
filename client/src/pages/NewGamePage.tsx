import {observer} from "mobx-react-lite";
import {ChangeEvent, useEffect, useState} from 'react';
import appStore from "stores/appStore";
import {v4 as uuid} from 'uuid';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';
import {START_GAME_LABEL} from 'utils/constants';
import {useGameDetails} from 'hooks/useGameDetails';
import {AddForm} from 'components/GameDetails/AddForm';
import {CreateGameForm} from 'components/GameDetails/CreateGameForm';
import {PageWrapper} from "../components/PageWrapper";
import {Button} from "../components/Button";
import {GroupBox} from "../components/GroupBox";

export const NewGamePage = observer(() => {
    const {
        setName,
        changeSettingsGame,
        setUrlGame,
        getInfoGame,
        user,
        gameUrl,
    } = appStore;
    const roomId = uuid();
    const [joinUrl, setJoinUrl] = useState(gameUrl);
    const [nameUser, setNameUser] = useState(user.userName);
    const [roomLimit, setRoomLimit] = useState(user.roomLimit);
    const [gameDuration, setGameDuration] = useState(user.gameDuration);
    const {createGame, joinGame} = useGameDetails();
    const navigate = useNavigate();

    useEffect(() => {
        getInfoGame();
    }, [getInfoGame]);
    const onChangeRoomLimitHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        switch (true) {
            case +inputValue < 2 && inputValue !== '':
                setRoomLimit(2);
                break;
            case +inputValue > 5:
                setRoomLimit(5);
                break;
            default:
                setRoomLimit(inputValue as unknown as number);
        }
    };
    const onChangeGameDurationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        switch (true) {
            case +inputValue > 60:
                setGameDuration(60);
                break;
            default:
                setGameDuration(inputValue as unknown as number);
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
        <PageWrapper>
            {!!user.userName ? (
                <GroupBox>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>CREATE THE GAME</h3>
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
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>JOIN THE GAME</h3>
                        <AddForm
                            onChangeText={setJoinUrl}
                            placeholder={'ADD HTTP'}
                            value={joinUrl}
                            type={'text'}
                            disabledBtn={!(nameUser && joinUrl)}
                            clickHandler={joinToGame}
                            titleBtn={START_GAME_LABEL}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>List of active games</h3>
                        <Button onClick={openList}>
                            {START_GAME_LABEL}
                        </Button>
                    </div>
                </GroupBox>
            ) : (
                <AddForm
                    onChangeText={setNameUser}
                    placeholder={'Enter your name'}
                    value={nameUser}
                    type={'text'}
                    disabledBtn={!nameUser}
                    clickHandler={saveName}
                    titleBtn={START_GAME_LABEL}
                />
            )}
        </PageWrapper>
    );
})

