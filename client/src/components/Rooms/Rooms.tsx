import React, {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {IJoinToRoom, IRooms} from "types/params";
import {ListOfRooms} from './ListOfRooms';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from '../../pages/styles.module.scss';
import {SOCKET_URL, START_GAME_LABEL} from 'utils/constants';
import {useGameDetails} from 'hooks/useGameDetails';
import {PageWrapper} from "../PageWrapper";
import {Button} from "../Button";

let socket: Socket;

export const Rooms = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<IRooms>({});
    const location = useLocation();
    const {createGame} = useGameDetails();
    useEffect(() => {
        socket = io(SOCKET_URL, {transports: ['websocket']});
        socket.on('allRooms', data => {
            setRooms(data);
        });
        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    const joinToRoom = ({
                            roomId,
                            roomLimit,
                            players,
                            gameDuration
                        }: IJoinToRoom) => (roomLimit >
        players) && createGame(roomId, location.state.name, roomLimit, gameDuration);
    return (
        <PageWrapper>
            <h3 className={styles.titleForInput}>
                {`${location.state.name}, Chose a game or press button to create new game`}
            </h3>
            <Button onClick={() => navigate('/')}>
                {START_GAME_LABEL}
            </Button>
            <div style={{display: 'flex'}}>
                {!!rooms &&
                    Object.keys(rooms).map((key, index) => (
                        <div key={index}>
                            <ListOfRooms
                                index={index}
                                players={rooms[key].length}
                                key={index}
                                joinToRoom={joinToRoom}
                                roomId={key}
                                gameDuration={rooms[key][0].gameDuration}
                                roomLimit={rooms[key][0].roomLimit}
                                users={rooms[key].map((room) => (
                                    <ul key={room.id}>
                                        <li>{room.userName}</li>
                                    </ul>
                                ))}
                            />
                        </div>
                    ))}
            </div>
        </PageWrapper>
    );
};
