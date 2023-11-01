import { User } from "../model/User";
import { UserServiceInterface } from "./contract/UserServiceInterface";
import { AppDataSource } from "../data-source";
import { NotFoundException } from "../error/NotFoundException";

export class UserService implements UserServiceInterface {
    
    private repository = AppDataSource.getRepository(User);

    async findByEmail(email: string): Promise<User | Error> {
        try {
            const user = await this.repository.findOne({ where: { email: email } });
            return user ? user : new NotFoundException("User not found");
        } catch (error) {
            return error;
        }
    }

    async findByToken(token: string): Promise<User | Error> {
        try {
            const user = this.repository.findOne({ where: { acess_token: token } });
            return user ? user : new NotFoundException("User not found");
        } catch (error) {
            return error;
        }
    }

    authenticate(email: string, password: string): Promise<User | Error> {
        throw new Error("Method not implemented.");
    }

    save<T>(entity: T): Error | Promise<T> {
        throw new Error("Method not implemented.");
    }

    update<T>(entity: T): Error | Promise<T> {
        throw new Error("Method not implemented.");
    }

    delete<T>(entity: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    findById<T>(id: number): Error | Promise<T> {
        throw new Error("Method not implemented.");
    }

    findAll<T>(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
}