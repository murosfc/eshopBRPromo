import { CommonRepositoryInterface } from "./CommonRepositoryInterface";
import { User } from "../../model/User";

export interface UserRepositoryInterface extends CommonRepositoryInterface<User> {
    findByEmail(email: string): Promise<User>;   
    findUserByToken(token: string): Promise<User>;        
}

