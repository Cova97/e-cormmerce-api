// src/cart/controllers/cart.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddItemToCartDto } from '../dto/add-item-to-cart.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Carrito de Compras')
@ApiBearerAuth() // Indica a Swagger que estos endpoints requieren un token
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints de este controlador
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Añadir un item al carrito del usuario' })
  addItemToCart(
    @Req() req, // Usamos @Req para obtener el objeto 'request' completo
    @Body() addItemDto: AddItemToCartDto,
  ) {
    // La JwtStrategy adjuntó el objeto 'user' a la request.
    const userId = req.user.id;
    return this.cartService.addItem(userId, addItemDto);
  }
}