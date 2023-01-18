import { observer } from "mobx-react-lite";
import randomWords from "random-words";
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ButtonTitle } from "../components/Button/const";
import { DisplayTimer } from "../components/GameDetails/DisplayTimer";
import { PageWrapper } from "../components/PageWrapper";
import { TextInput } from "../components/TextInput";
import { Timer } from "../components/Timer";
import { useTimer } from "../components/Timer/hooks/useTimer";
import appStore from "../stores/appStore";
import { COPY_LABEL, GO_HOME_LABEL } from "../utils/constants";
import { copy } from "../utils/utils";
import { useWebsocket } from "./hooks/useWebsocket";
import classes from './keyboard.module.scss';

const Keyboard: FC = observer(() => {
    const {
        data,
        roomUsers,
        gameTime,
        socket,
    } = useWebsocket(appStore);
    const { roomLimit } = appStore.user;
    const { startTimer, leftTime, isTimerFinished, isTimerStarted } = useTimer({ ms: gameTime * 1000 });
    const {
        startTimer: startPreTimer,
        leftTime: leftPreTime,
        isTimerFinished: isPreTimerFinished,
        isTimerStarted: isPreTimerStarted,
    } = useTimer({ ms: 5000 });

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
        roomLimit && +roomLimit === roomUsers.length && startPreTimer();
    }, [roomUsers.length, roomLimit]);

    useEffect(() => {
        leftPreTime === 0 && startTimer();
    }, [leftPreTime]);

    useEffect(() => {
        setNewWord();
        isTimerFinished && textInputRef.current?.focus();
        isTimerFinished && buttonRef.current?.focus();
    }, [isTimerStarted]);

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

    const getWinners = () => {
        const sortedUsers = data.sort((a, b) => b.text - a.text);
        return sortedUsers.filter((item) => item.text === sortedUsers[0].text)
            .map(item => item.userName);
    };

    return (
        <PageWrapper>
            <div className={classes.textScreen}>
                <Button
                    title={ButtonTitle.Copy}
                    onClick={copy}
                >
                    {COPY_LABEL}
                </Button>
                <Button
                    title={ButtonTitle.GoHome}
                    onClick={() => navigate('/')}
                >
                    {GO_HOME_LABEL}
                </Button>
            </div>
            <TextInput
                value={textPart.written}
                onChange={handleChange}
                disabled={isTimerFinished || !isTimerStarted}
                ref={textInputRef}
            />
            {isTimerStarted && (
                <div className={classes.textScreen}>
                    <span className={classes.textScreen_written}>{textPart.written}</span>
                    <span>{textPart.toWrite}</span>
                </div>
            )}
            {isPreTimerStarted && !isPreTimerFinished && (
                <Timer time={`${leftPreTime / 1000}s`} label="Game starts in" isFinishing={leftPreTime <= 3000000}/>
            )}
            <DisplayTimer
                roomUsers={roomUsers}
                winner={getWinners()}
                gameStarted={isTimerStarted}
                timeLeft={leftTime / 1000}
                data={data}
                gameTime={leftTime}
            />
        </PageWrapper>
    );
});

export default Keyboard;