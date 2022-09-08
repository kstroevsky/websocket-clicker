import React from 'react';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const OpponentCircle = ({ count, userName }) => {
	const [active, setActive] = useState(false);

	const OpponentCircleClasses = classNames(
		styles.oponentCounter,
		active && styles.active
	);

	const addActiveClass = () => {
		setActive(true);
		console.log('hello', count, active);
		setTimeout(() => setActive(false), 50);
		console.log('hello', count, active);
	};

	useEffect(() => {
		addActiveClass();
	}, [count]);

	return (
		<div className={OpponentCircleClasses}>
			<p> {userName} </p> <p>{count}</p>
		</div>
	);
};
