import { makeAutoObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { IUser } from "types/params";
import { Game } from "../types/gameTypes";
class AppStore {
    user: IUser = { gameDuration: 10, id: '', roomId: '', roomLimit: 2, userName: '', game: Game.Clicker }
    gameUrl: string = ''
    users: IUser[] = []
    gameIsStarted: boolean = false
    @persist @observable persistedUserName = ''

    constructor() {
        makeAutoObservable(this);
    }

    setName = (name: string) => {
        this.user.userName = name
        this.persistedUserName = name
        sessionStorage.setItem('user', name)
    }
    setUsers = (users: IUser[]) => {
        this.users = users
        users.map(u => u.userName === this.user.userName ? this.user.id = u.id : null)
    }
    changeSettingsGame = (roomId: string, roomLimit: number, gameDuration: number, game?: string) => {
        this.user = { ...this.user, roomId, roomLimit, gameDuration, game: game ?? Game.Clicker };
        this.setUsers([]);
        this.setUrlGame(`http://localhost:3000/${game ?? Game.Clicker}/${roomId}/${this.user.userName}/${roomLimit}/${gameDuration}`)
    }
    setUrlGame = (joinUrl: string) => {
        this.gameUrl = joinUrl
        sessionStorage.setItem('gameUrl', joinUrl)
        const params = joinUrl.split('/')
        this.user = {
            ...this.user,
            game: params[3],
            roomId: params[4],
            roomLimit: Number.isNaN(+params[6]) ? 2 : +params[6],
            gameDuration: Number.isNaN(+params[7]) ? 10 : +params[7],
        }
    }
    setGameState = (value: boolean) => this.gameIsStarted = value
    getInfoGame = () => {
        const gameUrl = sessionStorage.getItem('gameUrl')
        const nameInStorage = sessionStorage.getItem('user')
        nameInStorage && this.setName(nameInStorage)
        gameUrl && this.setUrlGame(gameUrl)
    }
    exit = () => {
        this.setName('')
        sessionStorage.removeItem('gameUrl')
        sessionStorage.removeItem('user')
    }
}

export default new AppStore()