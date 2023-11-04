import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text', unique: true })    
    email: string;  
    @Column({ type: 'text' })  
    password: string;
    @Column({ type: 'text' })    
    recKey: string;  
    @Column({ type: 'text', unique: true })  
    acessToken: string;
    @Column({ type: 'text', unique: true })      
    fcmToken: string;
    @Column({ type: 'timestamp' })
    createdOn: Date; 
    @Column({ type: 'timestamp', nullable: true })   
    updatedOn?: Date;   

    constructor(email: string, password: string){
        this.id = 0;
        this.email = email;
        this.password = password;
        this.recKey = "";
        this.acessToken = "";
        this.fcmToken = "";
        this.createdOn = new Date();
        this.updatedOn = undefined;
    }
}