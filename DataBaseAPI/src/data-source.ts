import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"
import { Game } from "./model/Game"
import { PromoGame } from "./model/PromoGame"
import { UserFavoriteGames } from "./model/UserfFavoriteGames"
import { env } from "process"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Game, PromoGame, UserFavoriteGames],
    migrations: [],
    subscribers: [],
})
