import React, {ChangeEvent, FC} from 'react';
import {AddFormPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';

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
        <>
            <input
                type={type}
                onChange={onChangeCallback}
                value={value}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            <button
                className={styles.buttonEnterName}
                disabled={disabledBtn}
                onClick={() => clickHandler()}
            >
                {titleBtn}
            </button>
        </>
    );
};
