import React from 'react';
import styles from './../../pages/styles.module.scss';

export const AddForm = ({
	type,
	onChange,
	onChangeText,
	onKeyPress,
	onEnter,
	disabledBtn,
	titleBtn,
	clickHandler,
	...restProps
}) => {
	const onChangeCallback = e => {
		onChange && onChange(e);
		onChangeText && onChangeText(e.currentTarget.value);
	};
	const onKeyPressCallback = e => {
		onKeyPress && onKeyPress(e);

		onEnter && e.key === 'Enter' && onEnter();
	};
	return (
		<>
			<input
				type={type}
				onChange={onChangeCallback}
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
