import { CommonRepositoryInterface } from "./CommonRepositoryInterface";
import { Game } from "../../model/Game";

export interface GameRepositoryInterface extends CommonRepositoryInterface<Game> {
    getUserFavoriteGames(userId: string): Promise<Game[]>;
    getPromoGames(): Promise<Game[]>;
}