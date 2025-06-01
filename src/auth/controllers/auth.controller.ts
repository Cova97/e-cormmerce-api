// src/auth/controllers/auth.controller.ts

import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto'; // <-- Importa el LoginDto
import { AuthGuard } from '@nestjs/passport'; // <-- Importa AuthGuard

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // <-- ¡Esta es la magia! Protege la ruta.
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario.'})
  @ApiResponse({ status: 401, description: 'No autorizado (sin token o token inválido).'})
  getProfile(@Req() req) {
    // Gracias a JwtStrategy, el objeto 'user' ya está en la request
    return req.user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario (cliente)' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 409, description: 'El correo electrónico ya está en uso.' })
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // --- NUEVO ENDPOINT DE LOGIN ---
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de un usuario' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, devuelve un token JWT.'})
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.'})
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}