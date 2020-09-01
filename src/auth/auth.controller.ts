import { Controller, Post, Body, ValidationPipe, UsePipes, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('users')
    allUsers(): Promise<User[]>{
        return this.authService.findAll();
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.authService.registerUser(createUserDto); 
    }
}
