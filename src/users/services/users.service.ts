// src/users/services/users.service.ts

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email, name } = createUserDto;

    // 1. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // 2. Crear el usuario en la base de datos
      const user = await this.prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          password: hashedPassword,
          // Por defecto, todos los usuarios registrados son Clientes.
          // La creación de Admins podría ser un endpoint protegido especial.
        },
      });

      // 3. Eliminar la contraseña del objeto de usuario que se devuelve
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
      
    } catch (error) {
      // 4. Manejo de Errores
      if (error.code === 'P2002') { // Código de Prisma para violación de restricción única
        throw new ConflictException('El correo electrónico ya está en uso.');
      }
      // Para cualquier otro error, lanzamos una excepción genérica del servidor.
      throw new InternalServerErrorException('Algo salió mal al crear el usuario.');
    }
  }
}