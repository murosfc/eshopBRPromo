import { User } from "../model/User";
import { UserServiceInterface } from "./contract/UserServiceInterface";
import { AppDataSource } from "../data-source";
import { NotFoundException } from "../error/NotFoundException";
import { NotAllowedException } from "../error/NotAllowedException";
import * as bcrypt from "bcrypt";
import jwt, { sign } from 'jsonwebtoken';
import { InvalidAttributeException } from "../error/InvalidAttributeException";

export class UserService implements UserServiceInterface {
    private repository: any;
    private static _instance: UserService;

    public static get instance(): Promise<UserService> {
        return new Promise(async (resolve, reject) => {
            if (!this._instance) {
                this._instance = new UserService();
                await this._instance.initialize(); // Wait for DB initialization
            }
            resolve(this._instance);
        });
    }

    private async initialize(): Promise<void> {
        try {
            await AppDataSource.initialize();
            this.repository = AppDataSource.getRepository(User);
            console.log("Conexão bem-sucedida");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
            throw error;
        }
    }

    closeConnection(test: boolean): void {        
        if (test) {
            this.repository.manager.connection.dropDatabase();
        }
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
            const user = await this.repository.findOne({ where: { email: email, password: password } });
            if (!user) {
                return new NotFoundException("User not found");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return new NotAllowedException("Password not match");
            } else {
                user.acessToken = (await (this.gerarToken(user))).token;
                return await Object.assign(user, this.repository.save(user));
            }
        } catch (error) {
            return error as Error;
        }
    }

    async save(user: User): Promise<User | Error> {
        const saltRounds = 10;
        const userValidated = await this.validateUser(user, true);
        if (userValidated instanceof Error) {return userValidated};
        try {
            user.password = bcrypt.hashSync(user.password, saltRounds);
            await AppDataSource.initialize();
            this.repository.create(user);
            const savedUser = await this.repository.findOne({ where: { email: user.email } });
            return savedUser ? savedUser : new Error("Error saving user");
        } catch (error) {
            return error as Error;
        }
    }
    
    update(entity: User): Promise<Error | User> {
        throw new Error("Method not implemented.");
    }
    delete(entity: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Error | User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    private async validateUser(user: User, save: boolean): Promise<User | Error>{
        if (save){
            if (user.id > 0) {return new NotAllowedException("User already exists")};
            if (!user.email) {return new InvalidAttributeException("Email is required")};
            if(await this.repository.findOne({ where: { email: user.email } })) {return new NotAllowedException("Email already exists")};
        }
        if (!user.password) {return new InvalidAttributeException("Password is required")};
        return user;        
    }


}