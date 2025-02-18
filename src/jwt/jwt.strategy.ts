import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // Asegúrate de que sea lo mismo que en JwtModule.register()
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub); // Busca al usuario según el payload
    console.log(user);
    
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role
    };
  }
}
