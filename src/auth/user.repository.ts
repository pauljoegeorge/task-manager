import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BadRequestException, ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtPayloadInterface } from "./jwt-playload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { username, password, password_confirmation } = createUserDto
        
        // throw exception if not matching
        if(password !== password_confirmation){
            throw new BadRequestException("password and password confirmation doesn't match");
        }
        
        // register new user
        const user = new User();
        user.username = username;
        user.password_salt = await bcrypt.genSalt(); // generate password salt
        user.password = await this.hashedPassword(password, user.password_salt);  // encrypt password using salt

        try {
            await user.save();
        }catch(error){
            // duplicate username
            if(error.code === "23505"){
                throw new ConflictException(error.detail);
            }else{
                throw new InternalServerErrorException();
            }
        }
    }


    async validateUserPassword(loginDto: LoginUserDto): Promise<string>{
        const { username, password } = loginDto;
        const user = await this.findOne({ username });

        if(user && await user.validPassword(password)){
            return user.username
        }else{
            throw new UnauthorizedException(`Invalid Credentials`);
        }

    }

    private async hashedPassword(password: string, password_salt: string): Promise<string> {
        return bcrypt.hash(password, password_salt);
    }
}