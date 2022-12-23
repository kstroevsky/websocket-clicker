export interface IUser {
    gameDuration: number
    id: string
    roomId: string
    roomLimit: number
    userName: string
    game?: string
}

export interface IJoinToRoom {
    roomId: string,
    roomLimit: number
    players: number
    gameDuration: number
    game: string
}

export interface IRoom {
    gameDuration: number
    id: string
    room: string
    roomLimit: number
    userName: string
    game: string
}

export interface IRooms {
    [key: string]: IRoom[]
}