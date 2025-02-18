import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // La clave secreta usada para firmar el token
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'tienda_virtual',
      entities: [User, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Product]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController, ProductsController, AuthController],
  providers: [UsersService, ProductsService, AuthService, JwtStrategy],
})
export class AppModule {}
