import React, {ChangeEvent, FC} from 'react';
import {AddFormPropsT} from "types/components";
import classes from './styles/index.module.scss';
import {Button} from "../Button";

export const AddForm: FC<AddFormPropsT> = props => {
    const {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        disabledBtn,
        titleBtn,
        clickHandler,
        value,
        ...restProps
    } = props
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && e.key === 'Enter' && onEnter();
    };
    return (
        <div className={classes.inputWrapper}>
            <input
                type={type}
                onChange={onChangeCallback}
                value={value}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            <Button
                isDisabled={disabledBtn}
                onClick={() => clickHandler()}
            >
                {titleBtn}
            </Button>
        </div>
    );
};
