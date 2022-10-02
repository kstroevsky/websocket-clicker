import {makeAutoObservable, runInAction} from "mobx";
import {User} from "types/params";

class AppStore {

    user: User = {gameDuration: 0, id: '', room: '', roomLimit: 0, userName: ''}

    gameUrl: string = ''

    users: User[] = []

    gameIsStarted: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setName = (name: string) => {
        this.user.userName = name
        runInAction(() => {
            sessionStorage.setItem('user', name)
        })
    }
    setUsers = (users: User[]) => {
        this.users = users
        users.map(u => u.userName === this.user.userName ? this.user.id = u.id : null)
    }

    changeSettingsGame = (room: string, roomLimit: number, gameDuration: number) => {
        this.user = {...this.user, room, roomLimit, gameDuration}
        this.setUrlGame(`http://localhost:3000/game/${room}/${this.user.userName}/${roomLimit}/${gameDuration}`)
    }

    setUrlGame = (joinUrl: string) => {
        this.gameUrl = joinUrl
        runInAction(() => {
            sessionStorage.setItem('gameUrl', joinUrl)

        })
        const params = joinUrl.split('/')
        this.user = {
            ...this.user,
            room: params[4],
            roomLimit: +params[6],
            gameDuration: +params[7]
        }
    }

    setGameState = (value: boolean) => {
        this.gameIsStarted = value
    }

    exit = () => {
        this.setName('')
        sessionStorage.removeItem('gameUrl')
        sessionStorage.removeItem('user')
    }
}

export default new AppStore()