import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    findAll(): Promise<User[]>{
        return this.userRepository.find({select: ["username"]});
    }

    registerUser(createUserDto: CreateUserDto): Promise<void>{
        return this.userRepository.createUser(createUserDto);
    }
}
