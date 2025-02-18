import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsEnum(Role)
  role: Role;
}
