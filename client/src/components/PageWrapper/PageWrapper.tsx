import React, {FC} from 'react';
import classes from './styles/index.module.scss';

type PageWrapperType = {
    children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperType> = (
    {children}
) => {
    return (
        <div className={classes.newGamePageWrapper}>
            {children}
        </div>
    );
}