import { Game } from "../../model/Game";

export interface GameServiceInterface{   
    findAll(): Promise<Game[]>;
    findById(nsuid: string): Promise<Game | Error>;
    findByTitle(title: string): Promise<Game[]>;
}