import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, name, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    });
    await this.userRepository.save(user);
    return 'Usuario creado con éxito';

  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    console.log(user);
    
    return user;
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }    
    return user.id;
  }

  async deleteUser(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Usuario eliminado con éxito';
  }
  async updateUser(id: number, name: string, email: string, role: Role): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    user.name = name;
    user.email = email;
    user.role = role;

    await this.userRepository.save(user);
    return 'Usuario modificado con éxito';
  }
}
