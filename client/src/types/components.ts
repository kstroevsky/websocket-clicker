import React, {ChangeEvent, ReactNode} from "react";
import {IJoinToRoom, IUser} from "types/params";

export type DisplayTimerPropsT = {
    roomUsers: IUser[]
    data: { userName: string, text: number }[]
    timeLeft: number
    gameStarted: boolean
    winner: string
    gameTime: string | number
}
export type CreateGameFormPropsT = {
    onChangeRoomLimit: (e: ChangeEvent<HTMLInputElement>) => void
    valueRoomLimit: number
    valueGameDuration: number
    onChangeGameDuration: (e: ChangeEvent<HTMLInputElement>) => void
    disabledBtn: boolean
    titleBtn: JSX.Element
    clickHandler: () => void
}
export type AddFormPropsT = {
    onChangeText: (value: string) => void
    placeholder: string
    value: string
    type: string
    disabledBtn: boolean
    clickHandler: () => void
    titleBtn: JSX.Element
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (value: React.KeyboardEvent<HTMLInputElement>) => void
    onEnter?: () => void
}
export type ClickCountPropsT = {
    countHandler: (count: number) => void
    gameStarted: boolean
    userName: string | undefined
}
export type OpponentCounterPropsT = {
    i: IUser
    data: { userName: string, text: number }[]
}
export type OpponentCirclePropsT = {
    count: number
    userName: string
}
export type ListOfRoomsPropsT = {
    index: number
    roomId: string
    joinToRoom: ({roomId, roomLimit, players, gameDuration}: IJoinToRoom) => void
    roomLimit: number
    users: ReactNode
    players: number
    gameDuration: number
}

