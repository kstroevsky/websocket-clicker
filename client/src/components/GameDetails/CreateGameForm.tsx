import React, {FC} from 'react';
import {CreateGameFormPropsT} from "types/components";
import {Button} from "../Button";
import classes from './styles/index.module.scss';
import {CreateGameFormPlaceholders} from "./const";
import {ButtonTitle} from "../Button/const";

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
    <div className={classes.inputWrapper} style={{flexDirection: 'column'}}>
        <div>
            <label>Number of players:</label>
            <input
                type="number"
                min={2}
                max={5}
                value={valueRoomLimit}
                onChange={onChangeRoomLimit}
                placeholder={CreateGameFormPlaceholders.NumberOfPlayers}
                className={classes.inputNumber}
            />
        </div>
        <div>
            <label>Game Duration:</label>
            <input
                type="number"
                min={10}
                max={60}
                value={valueGameDuration}
                onChange={onChangeGameDuration}
                placeholder={CreateGameFormPlaceholders.GameDuration}
                className={classes.inputNumber}
            />
        </div>
      <Button
        isDisabled={disabledBtn}
        onClick={clickHandler}
        title={ButtonTitle.Create}
      >
        {titleBtn}
      </Button>
    </div>
  );
};
