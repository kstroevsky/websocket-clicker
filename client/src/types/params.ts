export type User = {
    gameDuration: number
    id: string
    room: string
    roomLimit: number
    userName: string
}

export type JoinToRoom = {
    roomId: string,
    roomLimit: number
    players: number
    gameDuration: number
}

export type RoomT = {
    gameDuration: number
    id: string
    room: string
    roomLimit: number
    userName: string
}
export type RoomsT = {
    [key:string]: RoomT[]
}