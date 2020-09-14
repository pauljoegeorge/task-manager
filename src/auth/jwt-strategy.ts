import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-playload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret123',
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}