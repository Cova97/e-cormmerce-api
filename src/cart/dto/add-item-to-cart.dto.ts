// src/cart/dto/add-item-to-cart.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AddItemToCartDto {
  @ApiProperty({
    description: 'El ID del producto que se va a añadir al carrito',
    example: 1,
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'La cantidad del producto a añadir',
    example: 2,
    default: 1,
  })
  @IsInt()
  @IsPositive({ message: 'La cantidad debe ser un número positivo.' })
  quantity: number;
}