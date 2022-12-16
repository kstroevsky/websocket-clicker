import React, {FC} from 'react';
import classes from './styles/index.module.scss';
import classNames from "classnames";

type ButtonType = {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    title?: string
}

export const Button: FC<ButtonType> = ({
    children,
    className,
    onClick,
    isDisabled,
    title,
}) => {
    const buttonClasses = classNames(classes.buttonEnterName, className);

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={isDisabled}
            title={title}
        >
            {children}
        </button>
    );
}