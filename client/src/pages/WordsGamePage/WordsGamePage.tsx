import React, { FC, useEffect, useState } from 'react';
import classes from '../keyboard.module.scss';
import { PageWrapper } from "../../components/PageWrapper";
import appStore from "../../stores/appStore";
import { DisplayTimer } from "../../components/GameDetails/DisplayTimer";
import { useTimer } from "../../hooks/useTimer";
import { useGameData } from "../../hooks/useGameData";
import { copy, getWinners, shuffle } from "../../utils/utils";
import randomWords from "random-words";
import { Button } from "../../components/Button";
import { Timer } from "../../components/Timer";
import { GroupBox } from "../../components/GroupBox";
import { ButtonTitle } from "../../components/Button/const";
import { COPY_LABEL, GO_HOME_LABEL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export const WordsGamePage: FC = () => {
    const {
        data,
        roomUsers,
        leftTimeOfGame,
        isGameStarted,
        pauseGame,
        startGame,
        isPreTimerFinished,
        isPreTimerStarted,
        leftPreTime,
        socket,
        isGameFinished,
    } = useGameData(appStore);
    const { startTimer, leftTime, isTimerFinished, isTimerStarted } = useTimer({ ms: 5000 });
    const [words, setWords] = useState<string[]>([]);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [boxesOfWords, setBoxesOfWords] = useState<{title: string, isDisabled: boolean}[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [points, setPoints] = useState(0);
    const navigate = useNavigate();

    const isWordsMemorising = isTimerStarted && !isTimerFinished;
    const isWordsVisible = (isWordsMemorising || isGameStarted) && !isGameFinished;
    const exactly = 6;

    useEffect(() => {
        setShuffledWords(shuffle(words))
    }, [words]);

    useEffect(() => {
        if(selectedWords.length === words.length && selectedWords.length === 6){
            let isCorrect = true;
            for(let i = 0; i < words.length; i++) {
                if(selectedWords[i] !== words[i]){
                    isCorrect = false;
                    break;
                }
            }
            isCorrect && addPointInScore();
            setWords(randomWords({ exactly }));
            setSelectedWords([]);
        }
    }, [selectedWords.length]);

    useEffect(() => {
        setBoxesOfWords(isWordsMemorising
            ? words.map(item => ({
                title: item,
                isDisabled: true,
            }))
            : shuffledWords.map(item => ({
                title: item,
                isDisabled: false,
            }))
        )
    }, [isWordsMemorising]);

    useEffect(() => {
        if(isGameStarted && !isTimerFinished) {
            setWords(randomWords({ exactly }));
        }
        if(!isGameStarted && isTimerFinished && !isGameFinished) {
            startGame();
        }
    }, [isGameStarted, isTimerFinished, isGameFinished]);

    useEffect(() => {
        if(isGameStarted){
            pauseGame();
            startTimer();
        }
    }, [words]);


    const addPointInScore = () => {
        socket?.emit('userMsg', points + 1);
        setPoints(prevState => prevState + 1);
    };

    return (
        <PageWrapper center>
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
            {isWordsVisible && (
                <GroupBox>
                    {boxesOfWords.map(({title, isDisabled})  => {
                        const handleClick = () => {
                            const newArray = boxesOfWords.slice(0);
                            const index = newArray.findIndex(item => item.title === title);
                            newArray[index] = {
                                title,
                                isDisabled: true,
                            };
                            setBoxesOfWords(newArray);
                            setSelectedWords(prevState => [...prevState, title])
                        }
                        return (
                            <Button key={title} isDisabled={isDisabled} onClick={handleClick}>{title}</Button>
                        );
                    })}
                </GroupBox>
            )}
            {isPreTimerStarted && !isPreTimerFinished && (
                <Timer time={leftPreTime} label="Game starts in"/>
            )}
            {isTimerStarted && !isTimerFinished && (
                <Timer time={leftTime} label="Left time to remember the order of words:"/>
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
}