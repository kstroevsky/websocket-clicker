import React, { FC, useEffect, useRef, useState } from 'react'
import { PageWrapper } from "../components/PageWrapper";
import { TextInput } from "../components/TextInput";
import randomWords from "random-words";
import classes from './keyboard.module.scss';
import { Button } from "../components/Button";
import { START_GAME_LABEL } from "../utils/constants";
import { useTimer } from "../components/Timer/hooks/useTimer";
import { Timer } from "../components/Timer";
import { observer } from "mobx-react-lite";

export const Keyboard: FC = observer(() => {
    const {startTimer, leftTime, isTimerFinished, isTimerStarted, finishTimer} = useTimer({ ms: 5000});
    const [text, setText] = useState('');
    const [textPart, setTextPart] = useState({
        written: '',
        toWrite: text,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setText(randomWords({ exactly: 1, join: ' ' }));
        if(isTimerStarted) {
            textInputRef.current?.focus();
        }
        if(isTimerFinished){
            buttonRef.current?.focus();
        }
    }, [isTimerStarted]);

    useEffect(() => {
        setTextPart({
            written: '',
            toWrite: text,
        });
    }, [text]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        if(!text.indexOf(value) && value.length - textPart.written.length === 1){
            setTextPart({
                written: value,
                toWrite: text.slice(value.length),
            })
        }
        if(value === text){
            finishTimer();
        }
    }
    const newGameHandler = () => {
        startTimer();
    }

    return (
        <PageWrapper>
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
            {!isTimerFinished && (
                <Timer time={leftTime}/>
            )}
            {!isTimerStarted && !isTimerFinished && (
                <div className={classes.finishScreen}>
                    <Button onClick={newGameHandler} title={'New game'} ref={buttonRef}>
                        {START_GAME_LABEL}
                    </Button>
                </div>
            )}
            {isTimerFinished && (
                <div className={classes.finishScreen}>
                    <h1>Game over</h1>
                    <Button onClick={newGameHandler} title={'New game'} ref={buttonRef}>
                        {START_GAME_LABEL}
                    </Button>
                </div>
            )}
        </PageWrapper>
    );
});