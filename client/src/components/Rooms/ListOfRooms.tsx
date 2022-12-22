import React, { FC } from 'react';
import { ListOfRoomsPropsT } from "types/components";
import styles from '../../pages/styles.module.scss';

export const ListOfRooms: FC<ListOfRoomsPropsT> = props => {
    const { index, roomId, joinToRoom, roomLimit, users, players, gameDuration, game } = props
    const isFullStyle =
        roomLimit > players ? styles.roomWrapper : styles.fullRoom;
    const title = roomLimit > players ? `Let's go to play with:` : 'Game started';
    return (
        <div
            className={isFullStyle}
            key={index}
            onClick={() => joinToRoom({ roomId, roomLimit, players, gameDuration, game })}
        >
            <h3 className={styles.roomTitle}>
                <span>{title} </span>
            </h3>
            <dl>
                <dt>{users}</dt>
                <h3>Limit of Players: {roomLimit}</h3>
            </dl>
        </div>
    );
}
