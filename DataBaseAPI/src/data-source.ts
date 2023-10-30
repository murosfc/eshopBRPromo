import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"
import { Game } from "./model/Game"
import { PromoGame } from "./model/PromoGame"
import { UserFavoriteGames } from "./model/UserfFavoriteGames"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "abricoh",
    database: "eshopbrpromo",
    synchronize: true,
    logging: false,
    entities: [User, Game, PromoGame, UserFavoriteGames],
    migrations: [],
    subscribers: [],
})
