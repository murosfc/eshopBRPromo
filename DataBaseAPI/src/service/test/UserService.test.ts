import { describe } from "node:test";
import { UserService } from "../UserService";
import { User } from "../../model/User";

describe("UserService", () => {
    var sut: UserService;
    var user = new User("testnovo@gmail.com", "123456");

    beforeAll(async () => {
        sut = await UserService.instance
    })

    afterAll(async () => {
        sut.closeConnection(true);
    })

    it("should create a user", async () => {      
        await sut.save(user) as User;
        user = await sut.findByEmail(user.email) as User;        
        expect(user.id).toBeGreaterThan(0);
    })

    it("should get a token", async () => {        
        const authUser = await sut.authenticate(user.email, user.password);        
        expect(authUser).toBeInstanceOf(User);
        expect((authUser as User).acessToken).not.toBeNull();
    })
})

