import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Pro X',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Una laptop potente para profesionales.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1499.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Cantidad de stock disponible',
    example: 50,
  })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    required: false,
    example: 'https://example.com/images/laptop.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}