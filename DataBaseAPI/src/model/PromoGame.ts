import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity()
export class PromoGame{
    @PrimaryGeneratedColumn()
    private _id: number;
    @OneToOne(() => Game)
    @JoinColumn()    
    private _game: Game; 
    @Column({ type: 'float' })      
    private _salePrice: number;   
    @Column({ type: 'timestamp' }) 
    private _dueDate: Date;    

    constructor(game: Game, sale_price: number, due_date: Date){
        this._id = 0;
        this._game = game;
        this._salePrice = sale_price;
        this._dueDate = due_date;
    }  

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get game_1(): Game {
        return this._game;
    }
    public set game_1(value: Game) {
        this._game = value;
    }
    
    public get _sale_price(): number {
        return this._salePrice;
    }
    public set _sale_price(value: number) {
        this._salePrice = value;
    }

    public get due_date(): Date {
        return this._dueDate;
    }
    public set due_date(value: Date) {
        this._dueDate = value;
    }
}