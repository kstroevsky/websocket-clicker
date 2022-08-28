import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import ListOfUsers from "./listOfUsers";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./styles.module.scss";


let socket;

function Rooms() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const location = useLocation();
    useEffect(() => {
        socket = io('http://localhost:4000', {transports: ['websocket']});
        socket.on('allRooms', data => {
            setUsers(data)
            console.log(data, "data form server")
        });
        return () => {
            socket.disconnect();
            socket.off()
        };
    }, []);
    console.log(users)
    const joinToPlayer=({room,id,name})=>{
        // socket = io('http://localhost:4000', {transports: ['websocket']})
        socket.emit('joinToGame', room)
    }
    return (
        <div className={styles.newGamePageWrapper}>
            <h3 className={styles.titleForInput}>
                {location.state.name}, Chose a game or make a new game
            </h3>
            <button onClick={() => navigate('/')}>New game</button>
            {!!users.length && users.map((users, index) =>
                <ListOfUsers
                    joinToPlayer={joinToPlayer}
                    key={index}
                    id={users.id}
                    name={users.userName}
                    room={users.room}
                />)}
        </div>
    );
}

export default Rooms;
