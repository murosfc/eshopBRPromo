import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    private _id: number;
    @Column({ type: 'text', unique: true })    
    private _email: string;  
    @Column({ type: 'text' })  
    private _password: string;
    @Column({ type: 'text' })    
    private _recKey: string;  
    @Column({ type: 'text', unique: true })  
    private _acessToken: string;
    @Column({ type: 'text', unique: true })      
    private _fcmToken: string;
    @Column({ type: 'timestamp' })
    private _createdOn: Date; 
    @Column({ type: 'timestamp', nullable: true })   
    private _updatedOn?: Date;   

    constructor(email: string, password: string){
        this._id = 0;
        this._email = email;
        this._password = password;
        this._recKey = "";
        this._acessToken = "";
        this._fcmToken = "";
        this._createdOn = new Date();
        this._updatedOn = undefined;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get rec_key(): string {
        return this._recKey;
    }
    public set rec_key(value: string) {
        this._recKey = value;
    }

    public get acess_token(): string {
        return this._acessToken;
    }
    public set acess_token(value: string) {
        this._acessToken = value;
    }

    public get fcm_token(): string {
        return this._fcmToken;
    }
    public set fcm_token(value: string) {
        this._fcmToken = value;
    }

    public get created_on(): Date {
        return this._createdOn;
    }
    public set created_on(value: Date) {
        this._createdOn = value;
    }

    public get updated_on(): Date | undefined {
        return this._updatedOn;
    }
    public set updated_on(value: Date | undefined) {
        this._updatedOn = value;
    }
}