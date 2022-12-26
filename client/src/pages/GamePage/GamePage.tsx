import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appStore from "stores/appStore";
import styles from '../styles.module.scss'
import { COPY_LABEL, GO_HOME_LABEL } from 'utils/constants';
import { copy } from 'utils/utils';
import { ClickCount } from 'components/GameDetails/ClickCount';
import { DisplayTimer } from 'components/GameDetails/DisplayTimer';
import { Button } from "../../components/Button";
import { PageWrapper } from "../../components/PageWrapper";
import { ButtonTitle } from "../../components/Button/const";
import { useWebsocket } from "../../hooks/useWebsocket";

export const GamePage = observer(() => {
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
    } = useWebsocket(appStore);

    const { roomLimit, userName } = user
    const [timeLeft, setTimeLeft] = useState<number>(5);

    const isTimeUp = timeLeft === 0;

    useEffect(() => {
        if(roomLimit && +roomLimit === roomUsers.length) {
            const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(intervalId);
        }
    }, [roomUsers.length, roomLimit]);

    useEffect(() => {
        if(!gameIsStarted && isTimeUp) setGameState(true);
    }, [isTimeUp, gameIsStarted]);

    const countHandler = (count: number) => {
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