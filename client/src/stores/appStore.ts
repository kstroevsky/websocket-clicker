import {makeAutoObservable} from "mobx";
import {User} from "types/params";

class AppStore {

    user: User = {gameDuration: 0, id: '', room: '', roomLimit: 0, userName: ''}

    gameUrl: string = ''

    users: User[] = []

    gameIsStarted: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setGameState = (value: boolean) => {
        this.gameIsStarted = value
    }

    setName = (name: string) => {
        this.user.userName = name
    }

    changeSettingsGame = (roomId: string, roomLimit: number, gameDuration: number) => {
        this.user.roomLimit = roomLimit
        this.user.room = roomId
        this.user.gameDuration = gameDuration
    }

    setUsers = (users: User[]) => {
        this.users = users
    }

    setUrlGame = (joinUrl: string) => {
        const params = joinUrl.split('/')
        this.gameUrl = joinUrl
        this.user.room = params[4]
        this.user.gameDuration = +params[7]
        this.user.roomLimit = +params[6]
    }
}

export default new AppStore()