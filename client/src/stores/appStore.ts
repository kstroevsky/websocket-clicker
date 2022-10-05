import {makeAutoObservable} from "mobx";
import {IUser} from "types/params";

class AppStore {

    user: IUser = {gameDuration: 0, id: '', roomId: '', roomLimit: 0, userName: ''}
    gameUrl: string = ''
    users: IUser[] = []
    gameIsStarted: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setName = (name: string) => {
        this.user.userName = name
        sessionStorage.setItem('user', name)
    }
    setUsers = (users: IUser[]) => {
        this.users = users
        users.map(u => u.userName === this.user.userName ? this.user.id = u.id : null)
    }
    changeSettingsGame = (roomId: string, roomLimit: number, gameDuration: number) => {
        this.user = {...this.user, roomId, roomLimit, gameDuration}
        this.setUrlGame(`http://localhost:3000/game/${roomId}/${this.user.userName}/${roomLimit}/${gameDuration}`)
    }
    setUrlGame = (joinUrl: string) => {
        this.gameUrl = joinUrl
        sessionStorage.setItem('gameUrl', joinUrl)
        const params = joinUrl.split('/')
        this.user = {
            ...this.user,
            roomId: params[4],
            roomLimit: +params[6],
            gameDuration: +params[7]
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