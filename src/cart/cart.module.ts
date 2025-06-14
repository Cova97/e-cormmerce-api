// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importamos PrismaModule
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}