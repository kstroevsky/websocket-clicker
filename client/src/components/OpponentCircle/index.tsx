import React, {FC} from 'react';
import {OpponentCirclePropsT} from "types/components";
import styles from './styles.module.scss';
import {useEffect, useState} from 'react';
import classNames from 'classnames';


export const OpponentCircle: FC<OpponentCirclePropsT> = ({count, userName}) => {
    const [active, setActive] = useState(false);

    const OpponentCircleClasses = classNames(
        styles.oponentCounter,
        active && styles.active
    );

    const addActiveClass = () => {
        setActive(true);
        setTimeout(() => setActive(false), 50);
    };

    useEffect(() => {
        addActiveClass();
    }, [count]);

    return (
        <div className={OpponentCircleClasses}>
            <p> {userName} </p> <p>{count}</p>
        </div>
    );
};
