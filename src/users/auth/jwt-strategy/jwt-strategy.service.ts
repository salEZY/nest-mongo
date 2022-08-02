import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { constants } from '../../constants'
import { UsersService } from '../../users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants.jwt,
        });
    }
    async validate(payload: any) {
        // find the user based on id from the payload.id
        const isValidated = await this.userService.validateUserById(payload.id);
        if (isValidated) {
            return { userId: payload.id, email: payload.email };
        } else {
            throw new UnauthorizedException('UnAuthorized');
        }
    }
}