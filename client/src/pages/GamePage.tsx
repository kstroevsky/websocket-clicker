import { ClickCount } from 'components/GameDetails/ClickCount';
import { DisplayTimer } from 'components/GameDetails/DisplayTimer';
import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appStore from "stores/appStore";
import { COPY_LABEL, GAME_PENDING_TIME, GO_HOME_LABEL } from 'utils/constants';
import { copy, isNil } from 'utils/utils';
import { Button } from "../components/Button";
import { ButtonTitle } from "../components/Button/const";
import { PageWrapper } from "../components/PageWrapper";
import { useWebsocket } from "./hooks/useWebsocket";
import styles from './styles.module.scss';

const GamePage = observer(() => {
    const navigate = useNavigate();
    const {
        setGameState,
        gameIsStarted,
        user,
    } = appStore;

    const {
        data,
        roomUsers,
        superPlayer,
        superMoment,
        gameTime,
        socket,
        gameStartedTime,
        setGameStartedTime
    } = useWebsocket(appStore);

    const { roomLimit, userName } = user
    const [timeLeft, setTimeLeft] = useState<number>(5);
    const [isCountDownStarts, setIsCountdownStarts] = useState(false);

    const isTimeUp = timeLeft === 0;

    useEffect(() => {
        if(roomLimit && +roomLimit === roomUsers.length) {
            setIsCountdownStarts(true);
            const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => {clearInterval(intervalId)};
        }
    }, [roomUsers.length, roomLimit]);

    useEffect(() => {
        if(!gameIsStarted && isTimeUp) {
            setIsCountdownStarts(false)
            setGameState(true)
        };
    }, [isTimeUp, gameIsStarted]);

    useEffect(() => {
        let gamePendingIntervalId: NodeJS.Timer | undefined;


        if (!isNil(gameStartedTime)) {
            gamePendingIntervalId = setInterval(() => {
                const shouldCloseLobby = Math.floor((+new Date() - +new Date(gameStartedTime)) / 1000) * 1000 >= GAME_PENDING_TIME; 

                if (shouldCloseLobby) {
                    setGameStartedTime(undefined);
                    navigate('/')
                }
            }, 1000);

            if (isCountDownStarts || gameIsStarted) {
                clearInterval(gamePendingIntervalId);
                setGameStartedTime(undefined);
            }
        }

        return () => {
            clearInterval(gamePendingIntervalId);
            gamePendingIntervalId = undefined;
        }
    }, [gameIsStarted, gameStartedTime, isCountDownStarts, navigate, setGameStartedTime])

    const countHandler = (count: number) => {
        console.log('count', count)
        socket.emit('userMsg', count);
    };

    const getWinners = () => {
        const sortedUsers = data.sort((a, b) => b.text - a.text);
        return sortedUsers.filter((item) => item.text === sortedUsers[0].text)
            .map(item => item.userName);
    };

    return (
        <PageWrapper center>
            <div style={{ display: 'flex', gap: '20px' }}>
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
            {gameIsStarted && (
                <div className={styles.startGame}>GO</div>
            )}
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
                <ClickCount
                    userName={userName}
                    gameStarted={gameIsStarted}
                    countHandler={countHandler}
                    superPlayer={superPlayer}
                    superMoment={superMoment}
                />
                <DisplayTimer
                    roomUsers={roomUsers}
                    winner={getWinners()}
                    gameStarted={gameIsStarted}
                    timeLeft={timeLeft}
                    data={data}
                    gameTime={gameTime}
                />
            </div>
        </PageWrapper>
    );
})

export default GamePage;