// src/cart/services/cart.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemToCartDto } from '../dto/add-item-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addItem(userId: string, addItemDto: AddItemToCartDto) {
    const { productId, quantity } = addItemDto;

    // 1. Verificar que el producto existe y hay suficiente stock
    const product = await this.prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new NotFoundException(`El producto con ID #${productId} no fue encontrado.`);
    }

    if (product.stock < quantity) {
      throw new BadRequestException(`No hay suficiente stock para el producto "${product.name}". Stock disponible: ${product.stock}.`);
    }

    // 2. Encontrar o crear el carrito para el usuario
    // 'upsert' es perfecto: crea el carrito si no existe, o simplemente lo encuentra si ya existe.
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // 3. Verificar si el producto ya está en el carrito
    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      // 4a. Si ya existe, actualizamos la cantidad
      return this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      // 4b. Si no existe, creamos un nuevo item en el carrito
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });
    }
  }
}