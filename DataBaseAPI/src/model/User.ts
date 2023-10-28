export class User{
    private _id: number;    
    private _email: string;    
    private _password: string;    
    private _recKey: string;    
    private _acessToken: string;    
    private _fcmToken: string;
    private _createdOn: Date;    
    private _updatedOn: Date | undefined;   

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