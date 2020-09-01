import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { username, password, password_confirmation } = createUserDto
        
        // throw exception if not matching
        console.log(password_confirmation);
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
            console.log(error);
            // duplicate username
            if(error.code === "23505"){
                throw new ConflictException(error.detail);
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashedPassword(password: string, password_salt: string): Promise<string> {
        return bcrypt.hash(password, password_salt);
    }
}