import { Repository } from "typeorm/repository/Repository";
import { TestAppDataSource } from "../../data-source";
import { Game } from "../../model/Game";
import { GameService } from "../GameService";
import { NotFoundException } from "../../error/NotFoundException";

describe("GameService", () => {
    const repository: Repository<Game> = TestAppDataSource.getRepository(Game);
    const sut = new GameService(repository);

    beforeAll(async () => {
        await TestAppDataSource.initialize();
        const game1 = new Game("NS03424312", "Mario Kart 8: Deluxe", 299.00, "");
        await repository.save(game1);
        const game2 = new Game("NS03424313", "Super Mario Odyssey", 299.00, "");
        await repository.save(game2);
        const game3 = new Game("NS03424314", "The Legend of Zelda: Breath of the Wild", 299.00, "");
        await repository.save(game3);
    });

    afterAll(async () => {
        TestAppDataSource.dropDatabase();
        repository.manager.connection.destroy
    });

    it("should return a list of games", async () => {
        const games = await sut.findAll();
        expect(games.length).toBeGreaterThan(0);
    });

    it("should return a game by nsuid", async () => {
        const game = await sut.findById("NS03424312");
        expect(game).toBeInstanceOf(Game);
        expect((game as Game).nsuid).toEqual("NS03424312");
    });

    it("should return a NotFoundException when trying to find a game by nsuid that does not exist", async () => {
        const game = await sut.findById("NS03424315");
        expect(game).toBeInstanceOf(NotFoundException);
        expect((game as Error).message).toEqual("Game not found");
    });

    it("should return a list of games by title", async () => {
        const games = await sut.findByTitle("Mario");
        expect(games.length).toBeGreaterThan(0);
    });

});