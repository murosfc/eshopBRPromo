import { Game } from "../model/Game";
import { GameServiceInterface } from "./contract/GameServiceInterface";
import { Repository } from "typeorm/repository/Repository";
import { NotFoundException } from "../error/NotFoundException";
import { Like } from "typeorm";

export class GameService implements GameServiceInterface{
    private repository: Repository<Game>;

    constructor(repository: Repository<Game>) {
        this.repository = repository;
    }

    async findById(nsuid: string): Promise<Game | Error> {
        const game = await this.repository.findOne({ where: { nsuid: nsuid } });
        return game ? game : new NotFoundException("Game not found");
    }

    async findAll(): Promise<Game[]> {
        return await this.repository.find();
    }

    async findByTitle(title: string): Promise<Game[]> {
        const games = await this.repository.find({
            where: {
                title: Like(`%${title}%`)
            }
        });        
        return games;
    }

}