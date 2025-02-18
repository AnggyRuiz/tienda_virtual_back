import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener el token JWT' })
  @ApiResponse({ status: 200, description: 'Token JWT generado' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get('role')
  @UseGuards(JwtAuthGuard)  // Protege este endpoint con el JWT Guard
  getRole(@Request() req): any {
    console.log(req.user);
    
    const user = req.user.role;
    console.log(user);
    
    // El usuario decodificado a partir del JWT
    return { user }  // Devuelve el rol del usuario
  }
}
