import React, { forwardRef } from 'react';
import classes from './styles/index.module.scss';
import classNames from "classnames";

type TextInputType = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
    label?: string;
    isColumn?: boolean;
    type?: 'number' | 'text';
};

export const TextInput = forwardRef<HTMLInputElement, TextInputType>(({
    label,
    isColumn,
    type = 'text',
    ...props
}, ref) => {
    const wrapperClasses = classNames(classes.wrapper, {
        [classes.wrapper_column]: isColumn,
    })
    return (
        <div className={wrapperClasses}>
            {label && (
                <label className={classes.label}>{label}</label>
            )}
            <input
                type={type}
                className={classes.input}
                ref={ref}
                {...props}
            />
        </div>
    );
});