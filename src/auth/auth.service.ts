import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      return {
        message: 'Credenciales incorrectas',
        access_token: null,
      };
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      return {
        message: 'Credenciales incorrectas',
        access_token: null,
      };
    }
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      message: 'Inicio de sesión exitoso',
      access_token: this.jwtService.sign(payload),
    };

  }
}
