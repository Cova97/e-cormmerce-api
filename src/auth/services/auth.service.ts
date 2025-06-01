// src/auth/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService, // Inyectamos PrismaService directamente
    private readonly jwtService: JwtService, // Inyectamos JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // --- NUEVO MÉTODO DE LOGIN ---
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Encontrar al usuario por su email
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas (email).');
    }

    // 2. Comparar la contraseña enviada con la hasheada en la BD
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas (contraseña).');
    }

    // 3. Generar el JWT si las credenciales son correctas
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };
    
    const accessToken = this.jwtService.sign(payload);

    // 4. Devolver el token
    return {
      message: 'Inicio de sesión exitoso',
      accessToken,
    };
  }
}