export type User = {
    gameDuration: string
    id: string
    room: string
    roomLimit: string
    userName: string
}

export type JoinToRoom = {
    roomId: string,
    roomLimit: number
    players: number
    gameDuration: number | string
}

export type RoomT = {
    gameDuration: string
    id: string
    room: string
    roomLimit: number
    userName: string
}
export type RoomsT = {
    [key:string]: RoomT[]
}