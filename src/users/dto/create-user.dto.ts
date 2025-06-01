// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'carlos.perez@example.com',
  })
  @IsEmail({}, { message: 'El formato del correo no es válido.' })
  email: string;

  @ApiProperty({
    description: 'El nombre completo del usuario',
    example: 'Carlos Pérez',
  })
  @IsString({ message: 'El nombre debe ser texto.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'La contraseña del usuario. Mínimo 8 caracteres.',
    example: 'supersecret123',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;
}