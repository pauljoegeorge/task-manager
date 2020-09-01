import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    password: string;

    @MinLength(8)
    @MaxLength(20)
    password_confirmation: string;
}