import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-playload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    findAll(): Promise<User[]>{
        return this.userRepository.find({select: ["username"]});
    }

    registerUser(createUserDto: CreateUserDto): Promise<void>{
        return this.userRepository.createUser(createUserDto);
    }

    async signIn(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(loginDto);
        const payload: JwtPayloadInterface = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

}
