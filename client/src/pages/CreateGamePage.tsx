import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { observer } from "mobx-react-lite";
import { PageWrapper } from "../components/PageWrapper";
import { GroupBox } from "../components/GroupBox";
import appStore from "../stores/appStore";
import styles from "./styles.module.scss";
import { START_GAME_LABEL } from "../utils/constants";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { CreateGameFormPlaceholders } from "../components/GameDetails/const";
import { ButtonTitle } from "../components/Button/const";
import { v4 as uuid } from "uuid";
import { useGameDetails } from "../hooks/useGameDetails";
import { Dropdown } from "../components/Dropdown";
import classes from './createGamePage.module.scss';
import { AddForm } from "../components/GameDetails/AddForm";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/gameTypes";

const options = [
    { value: Game.Clicker, label: 'Clicker' },
    { value: Game.Keyboard, label: 'Keyboard' },
];

type Option = {
    value: string;
    label: string
}

export const CreateGamePage: FC = observer(() => {
    const {
        setName,
        changeSettingsGame,
        setUrlGame,
        user,
        gameUrl,
    } = appStore;
    const [roomLimit, setRoomLimit] = useState(user.roomLimit);
    const [gameDuration, setGameDuration] = useState(user.gameDuration);
    const [nameUser, setNameUser] = useState(user.userName);
    const [selectedOption, setSelectedOption] = useState<Option | null>(options[0]);
    const [joinUrl, setJoinUrl] = useState(gameUrl);
    const roomId = uuid();
    const { createGame, joinGame } = useGameDetails();
    const navigate = useNavigate();

    const onChangeRoomLimitHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.currentTarget.value;
            switch(true) {
                case +inputValue < 2 && inputValue !== '':
                    setRoomLimit(2);
                    break;
                case +inputValue > 5:
                    setRoomLimit(5);
                    break;
                default:
                    setRoomLimit(inputValue as unknown as number);
            }
        },
        [setRoomLimit],
    );

    const onChangeGameDurationHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value || 0;
        setGameDuration(+inputValue > 60 ? 60 : inputValue as unknown as number)
    }, [setGameDuration]);

    const onSelectChange = useCallback((option: Option | null) => {
        setSelectedOption(option);
    }, [setSelectedOption]);

    const startGame = useCallback(() => {
        changeSettingsGame(roomId, roomLimit, gameDuration, selectedOption?.value)
        createGame(roomId, nameUser, roomLimit, gameDuration, selectedOption?.value);
    }, [createGame, changeSettingsGame]);

    const joinToGame = useCallback(() => {
        setUrlGame(joinUrl)
        joinGame(joinUrl, nameUser);
    }, [setUrlGame, joinGame]);

    const openList = useCallback(() => {
        navigate('/rooms', { state: { name: nameUser } });
    }, [navigate]);

    const saveName = useCallback(() => setName(nameUser), [setName]);

    return (
        <PageWrapper center>
            {!!user.userName ? (
                <GroupBox>
                    <h3 className={styles.titleForInput}>CREATE THE GAME</h3>
                    <Dropdown
                        onChange={onSelectChange}
                        defaultValue={selectedOption}
                        options={options}
                    />
                    <div className={classes.flexBox}>
                        <TextInput
                            type="number"
                            min={2}
                            max={5}
                            placeholder={CreateGameFormPlaceholders.NumberOfPlayers}
                            value={roomLimit}
                            onChange={onChangeRoomLimitHandler}
                            label="Number of players:"
                        />
                        <TextInput
                            type="number"
                            min={10}
                            max={60}
                            placeholder={CreateGameFormPlaceholders.GameDuration}
                            value={gameDuration}
                            onChange={onChangeGameDurationHandler}
                            label="Game Duration:"
                        />
                    </div>
                    <Button
                        isDisabled={!(roomLimit && gameDuration)}
                        onClick={startGame}
                        title={ButtonTitle.Create}
                    >
                        {START_GAME_LABEL}
                    </Button>
                    <div className={styles.inputs}>
                        <h3 className={styles.titleForInput}>JOIN THE GAME</h3>
                        <AddForm
                            onChangeText={setJoinUrl}
                            placeholder={'ADD HTTP'}
                            value={joinUrl}
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
                    disabledBtn={!nameUser}
                    clickHandler={saveName}
                    titleBtn={START_GAME_LABEL}
                />
            )}
        </PageWrapper>
    );
});

export default CreateGamePage;