import { describe } from "node:test";
import { UserService } from "../UserService";
import { User } from "../../model/User";
import { TestAppDataSource } from "../../data-source";
import { Repository, UsingJoinColumnIsNotAllowedError } from "typeorm";
import { InvalidAttributeException } from "../../error/InvalidAttributeException";
import { NotAllowedException } from "../../error/NotAllowedException";

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

    it("should create a user, authenticate and find by token", async () => {         
        user = await sut.save(user) as User;             
        expect(user.id).toBeGreaterThan(0);

        const authUser = await sut.authenticate(user.email, rawUserPassword);        
        expect(authUser).toBeInstanceOf(User);
        expect((authUser as User).acessToken).not.toBeNull();
        const token = (authUser as User).acessToken;

        const userByToken = await sut.findByToken(token);
        expect(userByToken).toBeInstanceOf(User);
        expect((userByToken as User).id).toEqual(user.id);
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

    it("should update a user e-mail", async () => {
        var savedUser = await sut.save(new User("no@spam.com", "12345")) as User;
        savedUser = await sut.authenticate(savedUser.email, savedUser.password) as User;
        savedUser.email = "yes@spam.com";        
        const updatedUser = await sut.update(savedUser, savedUser.acessToken) as User;        
        expect(updatedUser.email).toEqual("yes@spam.com");
    });

    it("should update a user password", async () => {
        var savedUser = await sut.save(new User("notwhilling@spam.com", "12345")) as User;
        savedUser = await sut.authenticate(savedUser.email, savedUser.password) as User;        
        savedUser.password = "SuperSecretPassword";     
        const updatedUser = await sut.update(savedUser, savedUser.acessToken) as User;        
        expect(updatedUser.updatedOn).not.toBeNull(); 
        expect(savedUser.email).toEqual(updatedUser.email);       
    });

    it("Should return Error type NotAllowedException when trying to update a user while untauthenticated", async () => {
        var savedUser = await sut.save(new User("notw@spam.com", "12345")) as User;
        savedUser.password = "SuperSecretPassword"; 
        const authError = await sut.update(savedUser, "");
        expect(authError).toBeInstanceOf(NotAllowedException);
    });

    it("Should delete a user", async () => {
        const id = user.id;
        const authUser = await sut.authenticate(user.email, rawUserPassword) as User;
        const deleted = await sut.delete(id, authUser.acessToken);
        expect(deleted).toBeTruthy();
    });

    it("should return false when trying to delete a user while untauthenticated and a different user", async () => {
        var savedUser = await sut.save(new User("undelete@gmail.com", "12345")) as User;
        savedUser = await sut.authenticate(savedUser.email, savedUser.password) as User;
        var saveUser2 = await sut.save(new User("deletable@gmail.com", "12345")) as User;
        saveUser2 = await sut.authenticate(saveUser2.email, saveUser2.password) as User;
        var deleted = await sut.delete(saveUser2.id, savedUser.acessToken);
        expect(deleted).toBeFalsy();
        deleted = await sut.delete(saveUser2.id, "");
        expect(deleted).toBeFalsy();
    });

    it("Should find a user by id", async () => {
        const newUser = await sut.save(new User("newUser@hotmail.com", "12345")) as User;
        const userById = await sut.findById(newUser.id);
        expect(userById).toBeInstanceOf(User);
    });

    it("should get all users", async () => {
        const users = await sut.findAll();
        expect(users.length).toBeGreaterThan(0);
    });
    
})

