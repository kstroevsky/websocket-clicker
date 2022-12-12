import React, {FC} from 'react';
import {CreateGameFormPropsT} from "types/components";
import {Button} from "../Button";
import classes from './styles/index.module.scss';

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
    <div className={classes.inputWrapper}>
      <input
        type="number"
        min={2}
        max={5}
        value={valueRoomLimit}
        onChange={onChangeRoomLimit}
        placeholder="Number of players"
        className={classes.inputNumber}
      />
      <input
        type="number"
        min={10}
        max={60}
        value={valueGameDuration}
        onChange={onChangeGameDuration}
        placeholder="Game Duration"
        className={classes.inputNumber}
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
