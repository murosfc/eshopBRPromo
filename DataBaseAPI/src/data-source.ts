import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"
import { Game } from "./model/Game"
import { PromoGame } from "./model/PromoGame"
import { UserFavoriteGames } from "./model/UserfFavoriteGames"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "abricoh",
    database: process.env.DB_NAME || "eshopbrpromo",
    synchronize: true,
    logging: false,
    entities: [User, Game, PromoGame, UserFavoriteGames],
    migrations: [],
    subscribers: [],
})

export const TestAppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "abricoh",
    database: process.env.DB_NAME || "eshopbrpromo",
    synchronize: true,
    logging: false,
    entities: [User, Game, PromoGame, UserFavoriteGames],
    migrations: [],
    subscribers: [],
})