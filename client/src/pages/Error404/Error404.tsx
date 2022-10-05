import React from 'react';
import {FIRE_STYLE_CLASSNAME} from "utils/constants";

const style = {
    backgroundColor: 'rgb(22, 22, 30)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const Error404 = () => {
    return (
        <div style={style}>
            <div>
                <h1 className={FIRE_STYLE_CLASSNAME}>404</h1>
                <h1 className={FIRE_STYLE_CLASSNAME}>Page Not Found</h1>
            </div>

        </div>
    );
};
