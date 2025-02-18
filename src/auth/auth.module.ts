import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'secretKey', // Cambia esta clave por una más segura
    signOptions: { expiresIn: '60m' },
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
