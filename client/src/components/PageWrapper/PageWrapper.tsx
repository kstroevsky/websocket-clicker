import React, {FC} from 'react';
import classes from './styles/index.module.scss';
import {Header} from "../Header";

type PageWrapperType = {
    children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperType> = (
    {children}
) => {
    return (
        <div className={classes.newGamePageWrapper}>
            <Header/>
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </div>
    );
}