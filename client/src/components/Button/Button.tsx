import React, { forwardRef } from 'react';
import classes from './styles/index.module.scss';
import classNames from "classnames";

type ButtonType = {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
    isDisabled?: boolean;
    title?: string;
    onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>;
    isCircle?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonType>(({
    children,
    className,
    onClick,
    isDisabled,
    title,
    onKeyPress,
    style,
    isCircle
}, ref) => {
    const buttonClasses = classNames(className, {
        [classes.button]: !isCircle,
        [classes.buttonEnterName]: isCircle
    });

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={isDisabled}
            title={title}
            ref={ref}
            onKeyPress={onKeyPress}
            style={style}
        >
            {children}
        </button>
    );
});