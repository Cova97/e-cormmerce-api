// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario para iniciar sesión',
    example: 'nuevo.usuario@example.com',
  })
  @IsEmail({}, { message: 'El formato del correo no es válido.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'passwordSeguro123',
  })
  @IsString({ message: 'La contraseña debe ser texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  password: string;
}