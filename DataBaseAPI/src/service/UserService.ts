import { User } from "../model/User";
import { UserServiceInterface } from "./contract/UserServiceInterface";
import { AppDataSource, TestAppDataSource } from "../data-source";
import { NotFoundException } from "../error/NotFoundException";
import { NotAllowedException } from "../error/NotAllowedException";
import * as bcrypt from "bcrypt";
import jwt, { sign } from 'jsonwebtoken';
import { InvalidAttributeException } from "../error/InvalidAttributeException";
import { Repository } from "typeorm";

export class UserService implements UserServiceInterface {
    private repository: Repository<User>;

    constructor(repository: Repository<User>) {
        this.repository = repository;
    }

    async findByEmail(email: string): Promise<User | Error> {
        try {
            const user = await this.repository.findOne({ where: { email: email } });
            return user ? user : new NotFoundException("User not found");
        } catch (error) {
            return error as Error;
        }
    }

    async findByToken(token: string): Promise<User | Error> {
        try {
            const user = await this.repository.findOne({ where: { acessToken: token } });
            return user ? user : new NotFoundException("User not found");
        } catch (error) {
            return error as Error;
        }
    }

    private async gerarToken(user: User): Promise<{ token: string }> {
        const auth = {
            secret: String(process.env.SECRET),
            expires: '30d',
        };
        const token = sign(
            {
                id: user.id,
                agora: Date.now(),
                name: user.email,
            },
            auth.secret,
            {
                expiresIn: auth.expires,
            }
        );
        return { token };
    }


    async authenticate(email: string, password: string): Promise<User | Error> {
        try {
            const user = await this.findByEmail(email);
            if (user instanceof Error) {
                return new NotFoundException("User not found");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return new NotAllowedException("Password not match");
            } else {
                user.acessToken = (await (this.gerarToken(user))).token;
                return await this.repository.save(user);
            }
        } catch (error) {
            return error as Error;
        }
    }

    async save(user: User): Promise<User | Error> {
        const saltRounds = 10;
        const userValidated = await this.validateUser(user);
        if (userValidated instanceof Error) { return userValidated };
        try {
            user.password = bcrypt.hashSync(user.password, saltRounds);
            const savedUser = await this.repository.save(user);
            savedUser.password = "";        
            return savedUser;
        } catch (error) {
            return error as Error;
        }
    }

    async update(user: User, token: string): Promise<Error | User> {        
        const authUser = await this.findByToken(token);
        if (authUser instanceof Error) { return authUser };
        if (user.email !== authUser.email) {
            authUser.email = user.email;
            authUser.updatedOn = new Date();
        };
        if (user.password) {
            const saltRounds = 10;
            authUser.password = bcrypt.hashSync(user.password, saltRounds);
            authUser.updatedOn = new Date();
        }
        try {
            await this.repository.update(authUser.id, authUser);
            authUser.password = "";
            return authUser;
        } catch (error) {
            return error as Error;
        }
    }

    async delete(user: User, token: string): Promise<boolean> {
        const authUser = await this.findByToken(token);
        if (authUser instanceof Error) { return false };
        try {
            await this.repository.remove(authUser);
            return true;
        } catch (error) {
            return false;
        }
    }

    async findById(id: number): Promise<Error | User> {
        const user = await this.repository.findOneBy({ id: id });
        if (!user) { return new NotFoundException("User not found") };
        return user
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    private async validateUser(user: User): Promise<User | Error> {
        if (user.id > 0) { return new NotAllowedException("User already exists") };
        if (!user.email) { return new InvalidAttributeException("Email is required") };
        if (await this.repository.findOne({ where: { email: user.email } })) { return new NotAllowedException("Email already exists") };
        if (!user.password) { return new InvalidAttributeException("Password is required") };
        return user;
    }


}