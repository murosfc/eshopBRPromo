import { User } from "../../model/User";

export interface UserServiceInterface {
    save(entity: User): Promise<User | Error>;
    update(entity: User, token: string): Promise<User | Error>;
    delete(entity: User, token: string): Promise<boolean>;
    findById(id: number): Promise<User | Error>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | Error>;
    findByToken(token: string): Promise<User | Error>;
    authenticate(email: string, password: string): Promise<User | Error>;
}