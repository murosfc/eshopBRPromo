import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Game{
    @PrimaryColumn({ type: 'text' })
    private _nsuid: string;
    @Column({ type: 'text' })   
    private _title: string; 
    @Column({ type: 'float' })   
    private _mrsp: number; 
    @Column({ type: 'text' })   
    private _coverURL: string;    

    constructor(nsuid: string, title: string, mrsp: number, coverURL: string){
        this._nsuid = nsuid;
        this._title = title;
        this._mrsp = mrsp;
        this._coverURL = coverURL;
    }

    public get nsuid(): string {
        return this._nsuid;
    }
    public set nsuid(value: string) {
        this._nsuid = value;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get mrsp(): number {
        return this._mrsp;
    }
    public set mrsp(value: number) {
        this._mrsp = value;
    }

    public get coverURL(): string {
        return this._coverURL;
    }
    public set coverURL(value: string) {
        this._coverURL = value;
    }
    
}
