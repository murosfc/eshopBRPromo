import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Game{
    @PrimaryColumn({ type: 'text' })
    nsuid: string;
    @Column({ type: 'text' })   
    title: string; 
    @Column({ type: 'float' })   
    mrsp: number; 
    @Column({ type: 'text' })   
    coverURL: string;    

    constructor(nsuid: string, title: string, mrsp: number, coverURL: string){
        this.nsuid = nsuid;
        this.title = title;
        this.mrsp = mrsp;
        this.coverURL = coverURL;
    }   
    
}
