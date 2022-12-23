import React, {FC} from 'react';
import classes from './styles/index.module.scss';
import {Header} from "../Header";
import classNames from "classnames";

type PageWrapperType = {
    children: React.ReactNode;
    center?: boolean;
}

export const PageWrapper: FC<PageWrapperType> = (
    {children, center}
) => {
    const contentWrapperClasses = classNames(classes.contentWrapper, {
        [classes.contentWrapper_center]: center,
    })
    return (
        <div className={classes.newGamePageWrapper}>
            <Header/>
            <div className={contentWrapperClasses}>
                {children}
            </div>
        </div>
    );
}