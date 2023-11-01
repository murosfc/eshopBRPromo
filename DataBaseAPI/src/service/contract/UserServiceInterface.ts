import { User } from "../../model/User";
import { DomainServiceInterface } from "./DomainServiceInterface";

export interface UserServiceInterface extends DomainServiceInterface<User> {
    findByEmail(email: string): Promise<User>;
    findByToken(token: string): Promise<User>;
    authenticate(email: string, password: string): Promise<User>;
}