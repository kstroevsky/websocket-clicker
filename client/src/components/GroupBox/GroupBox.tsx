import React, {FC} from 'react';
import classes from './styles/index.module.scss';

type GroupBoxType = {
    children: React.ReactNode;
}

export const GroupBox: FC<GroupBoxType> = (
    {children}
) => {
    return (
        <div className={classes.box}>
            {children}
        </div>
    );
}