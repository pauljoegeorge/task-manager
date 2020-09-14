import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, Unique, OneToMany } from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, Matches, IsString } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @Column()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {message: "password is too weak"})
    password: string;

    @Column()
    @IsString()
    password_salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    async validPassword(password: string): Promise<boolean>{
        const hashed_password = await bcrypt.hash(password, this.password_salt);
        return hashed_password === this.password
    }
}