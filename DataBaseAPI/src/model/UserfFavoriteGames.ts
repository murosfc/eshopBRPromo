import { User } from "./User";
import { Game } from "./Game";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserFavoriteGames{
    @PrimaryGeneratedColumn()
    private _id: number;
    @OneToOne(() => User, user => user.id)
    @JoinColumn()  
    private _user: User; 
    @OneToMany(() => Game, game => game.nsuid)
    private _games: Game[];   
    @Column({ type: 'timestamp', nullable: true })    
    private _lastNotifiedPromoDueDate: Date | undefined; 

    constructor(user: User){
        this._id = 0;
        this._user = user;
        this._games = [];
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

    public get games(): Game[] {
        return this._games;
    }
    public set games(value: Game[]) {
        this._games = value;
    }
    
    public get lastNotifiedPromoDueDate(): Date | undefined {
        return this._lastNotifiedPromoDueDate;
    }
    public set lastNotifiedPromoDueDate(value: Date | undefined) {
        this._lastNotifiedPromoDueDate = value;
    }

}
