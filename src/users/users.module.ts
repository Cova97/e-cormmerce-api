// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // <--- 1. IMPORTA EL MÓDULO DE PRISMA

@Module({
  imports: [PrismaModule], // <--- 2. AÑADE PRISMA A LOS IMPORTS DEL MÓDULO
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService] // <--- 3. (OPCIONAL PERO RECOMENDADO) EXPORTA USERSERVICE
})
export class UsersModule {}