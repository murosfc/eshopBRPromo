import { UserFavoriteGames } from "../../model/UserfFavoriteGames";
import { DomainServiceInterface } from "./DomainServiceInterface";

export interface UserFavoriteGamesServiceInterface extends DomainServiceInterface<UserFavoriteGames> {
    findByUserId(userId: number): Promise<UserFavoriteGames[]> | Error;
    findByGameId(gameId: number): Promise<UserFavoriteGames[]> | Error;
}