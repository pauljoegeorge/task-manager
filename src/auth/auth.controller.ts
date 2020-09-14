import { Controller, Post, Body, ValidationPipe, UsePipes, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('users')
    allUsers(): Promise<User[]>{
        return this.authService.findAll();
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{accessToken: string}>{
        return this.authService.signIn(loginUserDto);
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.authService.registerUser(createUserDto); 
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
