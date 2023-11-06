import { describe } from "node:test";
import { UserService } from "../UserService";
import { User } from "../../model/User";
import { TestAppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { InvalidAttributeException } from "../../error/InvalidAttributeException";

describe("UserService", () => {
    var sut: UserService;
    const rawUserPassword = "123456";
    var user = new User("testnovo@gmail.com", rawUserPassword);    
    var repository: Repository<User>;    

    beforeAll(async () => {
        await TestAppDataSource.initialize();
        repository = TestAppDataSource.getRepository(User);
        sut = new UserService(repository);                    
    })

    afterAll(async () => {     
        TestAppDataSource.dropDatabase();   
        repository.manager.connection.destroy
    })

    it("should create a user and authenticate", async () => {         
        user = await sut.save(user) as User;             
        expect(user.id).toBeGreaterThan(0);

        const authUser = await sut.authenticate(user.email, rawUserPassword);        
        expect(authUser).toBeInstanceOf(User);
        expect((authUser as User).acessToken).not.toBeNull();
    })

    it("should return Erro type InvalidAttributeException when trying to save a user with invalid email", async () => {
        const invalidUser = new User("", rawUserPassword);
        const result = await sut.save(invalidUser);        
        expect(result).toBeInstanceOf(InvalidAttributeException);
    })

    it("should return Erro type InvalidAttributeException when trying to save a user without password", async () => {
        const invalidUser = new User("no@gmail.com", "");
        const result = await sut.save(invalidUser);        
        expect(result).toBeInstanceOf(InvalidAttributeException);
    })

    
})

