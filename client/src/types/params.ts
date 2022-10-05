export interface IUser {
    gameDuration: number
    id: string
    roomId: string
    roomLimit: number
    userName: string
}

export interface IJoinToRoom {
    roomId: string,
    roomLimit: number
    players: number
    gameDuration: number
}

export interface IRoom {
    gameDuration: number
    id: string
    room: string
    roomLimit: number
    userName: string
}

export interface IRooms {
    [key: string]: IRoom[]
}