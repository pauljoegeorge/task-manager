import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, Unique } from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, Matches, IsString } from "class-validator";

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
}