import { User } from "./User";
import { Game } from "./Game";

export class UserFavoriteGames{
    private _id: number;    
    private _user: User;    
    private _game: Game;    
    private _lastNotifiedPromoDueDate: Date | undefined; 

    constructor(user: User, game: Game){
        this._id = 0;
        this._user = user;
        this._game = game;
        this._lastNotifiedPromoDueDate = undefined;
    }
    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }

    public get game(): Game {
        return this._game;
    }
    public set game(value: Game) {
        this._game = value;
    }

    public get lastNotifiedPromoDueDate(): Date | undefined {
        return this._lastNotifiedPromoDueDate;
    }
    public set lastNotifiedPromoDueDate(value: Date | undefined) {
        this._lastNotifiedPromoDueDate = value;
    }

}
