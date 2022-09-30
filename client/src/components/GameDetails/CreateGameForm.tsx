import React, {ChangeEvent, FC} from 'react';
import {CreateGameFormPropsT} from "types/components";
import styles from './../../pages/styles.module.scss';

export const CreateGameForm:FC<CreateGameFormPropsT> = ({
  onChangeRoomLimit,
  valueRoomLimit,
  valueGameDuration,
  onChangeGameDuration,
  disabledBtn,
  titleBtn,
  clickHandler,
}) => {
  return (
    <>
      <input
        type="number"
        min={2}
        max={5}
        value={valueRoomLimit}
        onChange={onChangeRoomLimit}
        placeholder="Number of players"
      />
      <input
        type="number"
        min={10}
        max={60}
        value={valueGameDuration}
        onChange={onChangeGameDuration}
        placeholder="Game Duration"
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
