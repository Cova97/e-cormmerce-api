// src/products/products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // 1. Importa el PrismaModule

@Module({
  imports: [PrismaModule], // 2. Añádelo a la lista de imports
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}