import React, { FC } from 'react';
import classes from './styles/index.module.scss';
import { BurningHeadline } from "../BurningHeadline";
import appStore from "../../stores/appStore";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
    const { user, exit } = appStore;
    const navigate = useNavigate();

    const handleExit = () => {
        exit();
        navigate('/');
    }

    return (
        <div className={classes.headerContainer}>
            {!!user.userName && (
                <button className={classes.hidden}>
                    <BurningHeadline
                        title={"Exit"}
                    />
                </button>
            )}
            <BurningHeadline
                title={"C-games"}
                tagName={"h1"}
                style={{ letterSpacing: '30px' }}
                isUpperCase
            />
            {!!user.userName && (
                <button onClick={handleExit} className={classes.exitBtn}>
                    <BurningHeadline
                        title={"Exit"}
                    />
                </button>
            )}
        </div>
    );
}