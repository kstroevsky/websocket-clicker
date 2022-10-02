import React from 'react';

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
                <h1 className="font-effect-fire-animation">404</h1>
                <h1 className="font-effect-fire-animation">Page Not Found</h1>
            </div>

        </div>
    );
};
