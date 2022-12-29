import React, { FC, useEffect, useRef, useState } from 'react'
import { PageWrapper } from "../../components/PageWrapper";
import { TextInput } from "../../components/TextInput";
import randomWords from "random-words";
import classes from '../keyboard.module.scss';
import { Button } from "../../components/Button";
import { COPY_LABEL, GO_HOME_LABEL } from "../../utils/constants";
import { Timer } from "../../components/Timer";
import { observer } from "mobx-react-lite";
import appStore from "../../stores/appStore";
import { DisplayTimer } from "../../components/GameDetails/DisplayTimer";
import { ButtonTitle } from "../../components/Button/const";
import { copy, getWinners } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useGameData } from "../../hooks/useGameData";

export const Keyboard: FC = observer(() => {
    const {
        data,
        roomUsers,
        leftTimeOfGame,
        isGameStarted,
        isPreTimerFinished,
        isPreTimerStarted,
        leftPreTime,
        socket,
        isGameFinished,
    } = useGameData(appStore);

    const [text, setText] = useState('');
    const [countOfWords, setCountOfWords] = useState(0);
    const [textPart, setTextPart] = useState({
        written: '',
        toWrite: text,
    });

    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setNewWord();
        isGameFinished && textInputRef.current?.focus();
        isGameFinished && buttonRef.current?.focus();
    }, [isGameFinished]);

    useEffect(() => {
        setTextPart({
            written: '',
            toWrite: text,
        });
    }, [text]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        if(!text.indexOf(value) && value.length - textPart.written.length === 1) {
            setTextPart({
                written: value,
                toWrite: text.slice(value.length),
            })
        }
        if(value === text) {
            addWordInScore();
            setNewWord();
        }
    }

    const setNewWord = () => {
        setText(randomWords({ exactly: 1, join: ' ' }));
    }

    const addWordInScore = () => {
        socket.emit('userMsg', countOfWords + 1);
        setCountOfWords(prevState => prevState + 1);
    };

    return (
        <PageWrapper>
            <div className={classes.textScreen}>
                <Button
                    title={ButtonTitle.Copy}
                    onClick={copy}
                    isCircle
                >
                    {COPY_LABEL}
                </Button>
                <Button
                    title={ButtonTitle.GoHome}
                    onClick={() => navigate('/')}
                    isCircle
                >
                    {GO_HOME_LABEL}
                </Button>
            </div>
            <TextInput
                value={textPart.written}
                onChange={handleChange}
                disabled={isGameFinished || !isGameStarted}
                ref={textInputRef}
            />
            {isGameStarted && (
                <div className={classes.textScreen}>
                    <span className={classes.textScreen_written}>{textPart.written}</span>
                    <span>{textPart.toWrite}</span>
                </div>
            )}
            {isPreTimerStarted && !isPreTimerFinished && (
                <Timer time={leftPreTime} label="Game starts in"/>
            )}
            <DisplayTimer
                roomUsers={roomUsers}
                winner={getWinners(data)}
                gameStarted={isGameStarted}
                timeLeft={leftTimeOfGame / 1000}
                data={data}
                gameTime={leftTimeOfGame}
            />
        </PageWrapper>
    );
});