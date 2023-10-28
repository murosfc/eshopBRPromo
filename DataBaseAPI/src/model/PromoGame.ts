import { Game } from "./Game";

export class PromoGame{
    private _id: number;    
    private _game: Game;       
    private _salePrice: number;    
    private _dueDate: Date;    

    constructor(game: Game, sale_price: number, due_date: Date){
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